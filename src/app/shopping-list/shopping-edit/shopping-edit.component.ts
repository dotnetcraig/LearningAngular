import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {  
  @Output() addedIngredient = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', {static: true}) newName: ElementRef;
  @ViewChild('amountInput', {static: true}) newAmount: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {    
  }

  onAddClicked() {
    const ingName = this.newName.nativeElement.value;
    const ingAmount = this.newAmount.nativeElement.valueAsNumber;
    const newIngredient = new Ingredient(ingName, ingAmount);

    this.shoppingListService.addIngredient(newIngredient);
  }
}
