import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    // ingredients list
    private ingredients: Ingredient[] = [
        new Ingredient('Cheese', 500),
        new Ingredient('Bread', 2)
      ];


    // get shopping list
    getIngredients() {
        return this.ingredients.slice();
    }
    
    // add ingredients method
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {        
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }
}