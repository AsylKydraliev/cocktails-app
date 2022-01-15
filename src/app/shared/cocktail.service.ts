import { HttpClient } from '@angular/common/http';
import { Cocktail } from './cocktail.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CocktailService{
  constructor(private http: HttpClient) {}

  postCocktail(cocktail: Cocktail){
    this.http.post('https://app-blog-f76a2-default-rtdb.firebaseio.com/coctails.json', cocktail).subscribe();
  }


}
