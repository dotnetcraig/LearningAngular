import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(            
            'Rib Salad', 
            'A tasty rib salad', 
            'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
            [
                new Ingredient('Pork Ribs', 1),
                new Ingredient('Lettuce', 1),
                new Ingredient('Pepper', 2)
            ]),
        new Recipe(
            'Quinoa and Bulgawheat mix', 
            'This refreshing and healthy whole grain mix', 
            'https://p1.pxfuel.com/preview/548/595/580/gastronomy-food-dishes-eat.jpg',
            [
                new Ingredient('Quinoa', 200),
                new Ingredient('Bulgawheat', 180),
                new Ingredient('Polmegranete seeds', 50),
                new Ingredient('Peas', 80)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {

    }

    getRecipes() {
        // returns a new array, rather than a reference to our private array
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }
}