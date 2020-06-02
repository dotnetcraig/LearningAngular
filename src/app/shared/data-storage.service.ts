import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    baseApiUrl: string = 'https://myrecipeangularsolution.firebaseio.com/';

    constructor(
        private http: HttpClient,
        private recipesService: RecipeService,
        private authService: AuthService
    ) {}

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http.put(this.baseApiUrl + 'recipes.json', recipes)
            .subscribe(data => {
                console.log(data);
            });
    }

    loadRecipes() {
        return this.http
            .get<Recipe[]>(this.baseApiUrl + 'recipes.json')            
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        // If ingredients are not set, then set them to an empty array
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    });
                }),
                tap(recipes => {
                    this.recipesService.setRecipes(recipes);
                })
            );
    }
}