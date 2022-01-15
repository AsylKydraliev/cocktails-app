import { Component, OnDestroy, OnInit } from '@angular/core';
import { CocktailService } from '../shared/cocktail.service';
import { Cocktail } from '../shared/cocktail.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{
  cocktails!: Cocktail[];
  cocktail: Cocktail | null = null;
  cocktailsSubscription!: Subscription;
  openModal = false;

  constructor(private cocktailService: CocktailService) { }

  ngOnInit() {
    this.cocktailsSubscription = this.cocktailService.cocktailsChange.subscribe((cocktails: Cocktail[]) => {
      this.cocktails = cocktails;
    })
    this.cocktailService.getCocktails();
  }

  isOpen(id: string){
    this.openModal = true;
    this.cocktails.forEach(cocktail => {
      if(id === cocktail.id){
        this.cocktail = cocktail;
      }
    })
  }

  isClose() {
    this.openModal = false;
  }

  ngOnDestroy() {
    this.cocktailsSubscription.unsubscribe();
  }
}
