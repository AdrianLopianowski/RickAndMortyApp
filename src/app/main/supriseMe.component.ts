import { Component } from "@angular/core";
import { RickAndMortyService } from "../services/rick-and-morty.service";
import { Character, Episode, Location } from "../models/rick-and-morty.interface";

@Component({
  selector: "app-suprise-me",
  template: ` <main class="container">
    <div class="surprise-box">
      <h2 class="subtitle">Zaskocz Mnie!</h2>
      <p>Kliknij, aby wylosować postać.</p>
      <button class="button" (click)="onClick()">Losuj</button>
      <p>{{ wynik }}</p>
    </div>
  </main>`,
  styles: [
    `
      .surprise-box {
        background-color: #1f2937;
        border: 1px solid #374151;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 32px;
      }
      .button {
        font-family: "Creepster", cursive;
        text-decoration: none;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        letter-spacing: 2px;
        font-size: 1.5rem;
        color: #97ce4c;
        text-shadow: 2px 2px 0px #06b6d4;
        background: none;
        border: none;
      }
      .button:hover {
        color: #ffffff;
        text-shadow: 0 0 15px #97ce4c;
        transform: scale(1.1);
      }
      .subtitle {
        font-family: "Creepster", cursive;
        font-size: 2rem;
        color: #97ce4c;
        text-shadow: 2px 2px 0px #06b6d4;
        letter-spacing: 2px;
        background: none;
        border: none;
      }
    `,
  ],
})
export class SupriseMeComponent {
  constructor(private rickAndMortyService: RickAndMortyService) {}
  wynik: string = "";
  GetRandomCategory() {
    return Math.floor(Math.random() * 3);
  }

  onClick() {
    const category = this.GetRandomCategory();

    if (category === 0) {
      this.rickAndMortyService.GetRandomCharacter().subscribe((data: Character) => {
        this.wynik = `Postać: ${data.name}`;
      });
    } else if (category === 1) {
      this.rickAndMortyService.GetRandomLocation().subscribe((data: Location) => {
        this.wynik = `Lokalizacja: ${data.name}`;
      });
    } else if (category === 2) {
      this.rickAndMortyService.GetRandomEpisode().subscribe((data: Episode) => {
        this.wynik = `Odcinek: ${data.name}`;
      });
    }
  }
}
