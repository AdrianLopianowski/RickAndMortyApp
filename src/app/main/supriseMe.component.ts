import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RickAndMortyService } from "../services/rick-and-morty.service";
import { Character, Episode, Location } from "../models/rick-and-morty.interface";

import { CardComponent } from "../shared/components/cardComponent";

@Component({
  selector: "app-suprise-me",
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <main class="container">
      <div class="surprise-box">
        <h2 class="subtitle">Zaskocz Mnie!</h2>
        <p>Kliknij, aby wylosować losowy element z uniwersum.</p>

        <button class="button" (click)="onClick()">Losuj</button>

        <div class="result-container">
          @if (wylosowanyObiekt) {
          <app-card [data]="wylosowanyObiekt"></app-card>
          }
        </div>
      </div>
    </main>
  `,
  styles: [
    `
      .surprise-box {
        background-color: #1f2937;
        border: 1px solid #374151;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 32px;
        text-align: center;
      }
      .result-container {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
      app-card {
        max-width: 320px;
        width: 100%;
        display: block;
      }
      .button {
        font-family: "Creepster", cursive;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        letter-spacing: 2px;
        font-size: 1.5rem;
        color: #97ce4c;
        text-shadow: 2px 2px 0px #06b6d4;
        background: none;
        border: 2px solid #97ce4c;
        border-radius: 8px;
        padding: 10px 20px;
      }
      .button:hover {
        background-color: #97ce4c;
        color: #1f2937;
        text-shadow: none;
        transform: scale(1.05);
      }
      .subtitle {
        font-family: "Creepster", cursive;
        font-size: 2rem;
        color: #97ce4c;
        text-shadow: 2px 2px 0px #06b6d4;
        letter-spacing: 2px;
        margin-bottom: 10px;
      }
      p {
        color: #d1d5db;
        margin-bottom: 20px;
      }
    `,
  ],
})
export class SupriseMeComponent {
  wylosowanyObiekt: any = null;

  constructor(private rickAndMortyService: RickAndMortyService) {}

  GetRandomCategory() {
    return Math.floor(Math.random() * 3);
  }

  onClick() {
    const category = this.GetRandomCategory();

    if (category === 0) {
      this.rickAndMortyService.GetRandomCharacter().subscribe((data) => {
        this.wylosowanyObiekt = data;
      });
    } else if (category === 1) {
      this.rickAndMortyService.GetRandomLocation().subscribe((data) => {
        this.wylosowanyObiekt = data;
      });
    } else if (category === 2) {
      this.rickAndMortyService.GetRandomEpisode().subscribe((data) => {
        this.wylosowanyObiekt = data;
      });
    }
  }
}
