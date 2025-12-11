import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SiteHeaderComponent } from "./main/header.component";

@Component({
  selector: "app-root",
  standalone: true,

  imports: [SiteHeaderComponent, RouterOutlet],
  template: `
    <app-site-header></app-site-header>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = "rickAndMortyApp";
}
