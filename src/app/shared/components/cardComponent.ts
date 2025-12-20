import { Component, Input, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { FavoritesComponent } from "../../pages/favorites/favorites.component";
import { FavoritesService } from "../../services/favorites.service";

@Component({
  selector: "app-card",
  imports: [CommonModule],

  template: `
    <article class="card-main">
      <button
        class="favorite-btn"
        [class.active]="isFavorite"
        (click)="toggleFavorite($event)"
        title="Dodaj do ulubionych"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="heart-icon"
        >
          <path
            d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
          />
        </svg>
      </button>

      @if (data.image) {
      <div class="image-wrapper">
        <img [src]="data.image" [alt]="data.name" />
      </div>
      }

      <div class="card-content">
        <h2 class="card-title">{{ data.name }}</h2>

        @if (data.status) {
        <p class="info-row">
          <span class="label">Status:</span>
          <span
            class="value"
            [class.dead]="data.status === 'Dead'"
            [class.alive]="data.status === 'Alive'"
          >
            {{ data.status }}
          </span>
        </p>
        } @if (data.species) {
        <p class="info-row"><span class="label">Gatunek:</span> {{ data.species }}</p>
        } @if (data.type) {
        <p class="info-row"><span class="label">Typ:</span> {{ data.type }}</p>
        } @if (data.air_date) {
        <p class="info-row">
          <span class="label">Data emisji:</span> {{ data.air_date }}
        </p>
        } @if (data.dimension) {
        <p class="info-row"><span class="label">Wymiar:</span> {{ data.dimension }}</p>
        }
      </div>
    </article>
  `,
  styles: [
    `
      .card-main {
        background-color: #1f2937;
        border: 2px solid #374151;
        border-radius: 12px;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
      }

      .favorite-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.6);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        transition: transform 0.2s, background-color 0.2s;
      }

      .heart-icon {
        width: 24px;
        height: 24px;
        color: #9ca3af;
        transition: color 0.3s;
      }

      .favorite-btn:hover {
        transform: scale(1.1);
        background: rgba(0, 0, 0, 0.8);
      }

      .favorite-btn.active .heart-icon {
        color: #ef4444;
      }

      .card-main:hover {
        transform: translateY(-5px);
        border-color: #97ce4c;
        box-shadow: 0 0 15px rgba(151, 206, 76, 0.3);
      }
      .image-wrapper {
        width: 100%;
        height: 250px;
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }
      .card-main:hover img {
        transform: scale(1.05);
      }
      .card-content {
        padding: 16px;
        text-align: left;
      }
      .card-title {
        font-family: "Creepster", cursive;
        font-size: 1.8rem;
        color: #06b6d4;
        margin: 0 0 12px 0;
        line-height: 1.1;
      }
      .info-row {
        margin: 6px 0;
        color: #d1d5db;
        font-size: 0.95rem;
      }
      .label {
        color: #9ca3af;
        font-weight: bold;
      }
      .alive {
        color: #97ce4c;
        font-weight: bold;
      }
      .dead {
        color: #ef4444;
        font-weight: bold;
      }
    `,
  ],
})
export class CardComponent implements OnInit {
  @Input() data: any;
  isFavorite: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.isFavorite = this.favoritesService.isFavorite(this.data);
    }
  }

  toggleFavorite(event: Event) {
    event.stopPropagation();

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/login"]);
      return;
    }

    this.favoritesService.toggleFavorite(this.data);
    this.isFavorite = !this.isFavorite;
  }
}
