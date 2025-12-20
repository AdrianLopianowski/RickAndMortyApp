import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardComponent } from "../../shared/components/cardComponent";
import { FavoritesService } from "../../services/favorites.service";
import { RouterLink } from "@angular/router";
import { RickAndMortyData } from "../../models/rick-and-morty.interface";
@Component({
  selector: "app-favorites",
  imports: [CommonModule, CardComponent, RouterLink],
  template: `
    <div class="container page-container">
      <h2 class="page-title">Moje Ulubione</h2>

      @if (favorites.length > 0) {
      <div class="cards-grid">
        @for (item of favorites; track item.id) {
        <app-card [data]="item"></app-card>
        }
      </div>
      } @else {
      <div class="empty-state">
        <p>Nie masz jeszcze żadnych ulubionych elementów.</p>
        <a routerLink="/characters" class="action-btn">Przeglądaj Postacie</a>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        color: white;
        min-height: 80vh;
      }

      .page-title {
        font-family: "Creepster", cursive;
        color: #ef4444;
        font-size: 3rem;
        text-align: center;
        margin-bottom: 30px;
        text-shadow: 3px 3px 0 #fff;
      }

      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
      }

      .empty-state {
        text-align: center;
        margin-top: 50px;
        font-size: 1.2rem;
        color: #9ca3af;
      }

      .action-btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
        background-color: #06b6d4;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
        transition: background 0.2s;
      }
      .action-btn:hover {
        background-color: #97ce4c;
        color: black;
      }
    `,
  ],
})
export class FavoritesComponent implements OnInit {
  favorites: RickAndMortyData[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favorites = this.favoritesService.getFavorites();
  }
}
