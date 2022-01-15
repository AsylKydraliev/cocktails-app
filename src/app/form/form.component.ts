import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cocktail } from '../shared/cocktail.model';
import { CocktailService } from '../shared/cocktail.service';
import { urlValidator } from '../shared/url.validator.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  createForm!: FormGroup;
  addButtonDisabled = false;

  constructor(private cocktailService: CocktailService, private router: Router) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required, urlValidator]),
      imageUrl: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      description: new FormControl(''),
      ingredients: new FormArray([]),
      cookingDescription: new FormControl('', Validators.required),
    })
  }

  onSubmit() {
    const id = Math.random().toString();
    const cocktail = new Cocktail(
      id,
      this.createForm.value.name,
      this.createForm.value.imageUrl,
      this.createForm.value.type,
      this.createForm.value.description,
      this.createForm.value.ingredients,
      this.createForm.value.cookingDescription,
    )
    this.cocktailService.postCocktail(cocktail);
    void this.router.navigate(['/']);
  }

  addIngredient() {
    this.addButtonDisabled = true;
    const ingredients = <FormArray>this.createForm.get('ingredients');
    const ingredientGroup = new FormGroup({
      nameIngredient: new FormControl('', Validators.required),
      amountIngredient: new FormControl(0, Validators.required),
      unitIngredient: new FormControl('', Validators.required),
    })
    ingredients.push(ingredientGroup);
  }

  getIngredientControls() {
    const ingredients = <FormArray>this.createForm.get('ingredients');
    return ingredients.controls;
  }

  fieldHasError(fieldName: string, errorType: string) {
    const field = this.createForm.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  ingredientsHasError(fieldName: string, errorType: string, index: number) {
    const ingredients = <FormArray>this.createForm.get('ingredients');
    const field = ingredients.controls[index].get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  arrayElementRemove(index: number){
    const ingredients = <FormArray>this.createForm.get('ingredients');
    ingredients.removeAt(index);
  }
}
