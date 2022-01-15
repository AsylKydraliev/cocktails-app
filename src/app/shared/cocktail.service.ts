import { HttpClient } from '@angular/common/http';
import { Cocktail } from './cocktail.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CocktailService{
  cocktails: Cocktail[] | null = null;
  cocktailsChange = new Subject<Cocktail[]>();
  loadingChange = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  postCocktail(cocktail: Cocktail){
    this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/coctails.json', cocktail).subscribe(
      () => {
       void this.router.navigate(['/']);
      }
    );
  }

  getCocktails(){
    this.loadingChange.next(true);
    this.http.get<{[id: string]: Cocktail}>('https://app-blog-f76a2-default-rtdb.firebaseio.com/coctails.json')
      .pipe(map(result =>{
      if(result === null) {
        return [];
      }
      return Object.keys(result).map(id => {
        const cocktails = result[id];
        return new Cocktail(
          id,
          cocktails.name,
          cocktails.imageUrl,
          cocktails.type,
          cocktails.description,
          cocktails.ingredients,
          cocktails.cookingDescription,
        )
      })
    }))
      .subscribe(result => {
        this.cocktails = [];
        this.cocktails = result;
        this.cocktailsChange.next(this.cocktails.slice());
        this.loadingChange.next(false);
      }, () => {
        this.loadingChange.next(false);
      })
  }
}
