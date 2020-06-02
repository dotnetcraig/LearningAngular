import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {  
  loadedFeature: string = 'shopping-list';

  onFeatureSelect(feature: string) {    
    this.loadedFeature = feature;
  }
}
