import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SupriseMeComponent } from "../../main/supriseMe.component";
import { SearchPanelComponent } from "../../main/searchPanel.component";

@Component({
  selector: "app-home",
  imports: [CommonModule, SupriseMeComponent, SearchPanelComponent],
  template: `
    <main class="container">
      <app-suprise-me></app-suprise-me>
      <app-search-panel></app-search-panel>
    </main>
  `,
  styles: [
    `
      .intro-section {
        text-align: center;
        padding: 32px 0;
      }
      .main-title {
        font-family: "Creepster", cursive;
        font-size: 64px;
        color: #06b6d4;
        margin: 0;
      }
      .subtitle {
        color: #9ca3af;
        margin-top: 8px;
        font-size: 1.2rem;
      }
    `,
  ],
})
export class HomeComponent {}
