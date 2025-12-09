import { Component } from '@angular/core';

import { SiteHeaderComponent } from './main/header.component';
import { SupriseMeComponent } from './main/supriseMe.component';
import { SearchPanelComponent } from './main/searchPanel.component';




@Component({
  selector: 'app-root',
  imports: [SiteHeaderComponent, SupriseMeComponent, SearchPanelComponent ],
  template: `

    <app-site-header></app-site-header>
    <app-suprise-me></app-suprise-me>
    <app-search-panel></app-search-panel>
  `,

})
export class AppComponent {
  title = 'rickAndMortyApp';
}
