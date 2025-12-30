import { Component, OnInit } from "@angular/core";
import { RickAndMortyService } from "../../services/rick-and-morty.service";
import { CommonModule } from "@angular/common";
import { Location, Info } from "../../models/rick-and-morty.interface";
import { CardComponent } from "../../shared/components/cardComponent";
import { FormsModule } from "@angular/forms";
import { FavoritesService } from "../../services/favorites.service";

@Component({
  selector: "app-locations",
  imports: [CommonModule, CardComponent, FormsModule],
  template: `
    <div class="container page-container">
      <h2 class="page-title">Lokacje</h2>

      <main class="container">
        <div class="search-panel">
          <input
            type="text"
            [(ngModel)]="searchName"
            (input)="applyFilters()"
            placeholder="Szukaj po nazwie..."
            class="search-input"
          />
          <div class="filters">
            <select
              [(ngModel)]="typeFilter"
              (change)="applyFilters()"
              class="filter-input"
            >
              <option value="">Typ</option>
              <option value="Planet">Planet</option>
              <option value="Cluster">Cluster</option>
              <option value="Space station">Space station</option>
              <option value="Microverse">Microverse</option>
              <option value="TV">TV</option>
              <option value="Resort">Resort</option>
              <option value="Fantasy town">Fantasy town</option>
              <option value="Dream">Dream</option>
              <option value="Dimension">Dimension</option>
            </select>

            <select
              [(ngModel)]="dimensionFilter"
              (change)="applyFilters()"
              class="filter-input"
            >
              <option value="">Wymiar</option>
              <option value="Dimension C-137">Dimension C-137</option>
              <option value="Post-Apocalyptic Dimension">
                Post-Apocalyptic Dimension
              </option>
              <option value="Replacement Dimension">Replacement Dimension</option>
              <option value="Cronenberg Dimension">Cronenberg Dimension</option>
              <option value="Fantasy Dimension">Fantasy Dimension</option>
              <option value="Unknown dimension">Unknown dimension</option>
            </select>
          </div>
          <br />
          <label style="cursor: pointer; display: flex; align-items: center; gap: 8px;">
            <input
              type="checkbox"
              [(ngModel)]="favoritesOnly"
              (change)="applyFilters()"
            />
            <span>Tylko ulubione</span>
          </label>
        </div>
      </main>

      <div class="cards-grid">
        @for (location of locations; track location.id) {
        <app-card [data]="location"></app-card>
        }
      </div>

      <div class="pagination-controls">
        <button (click)="PreviousPage()" [disabled]="!paginationInfo?.prev">
          Poprzednia
        </button>
        <span>Strona {{ currentPage }}</span>
        <button (click)="NextPage()" [disabled]="!paginationInfo?.next">Następna</button>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        color: white;
      }
      .page-title {
        font-family: "Creepster", cursive;
        color: #97ce4c;
        font-size: 3rem;
        text-align: center;
        margin-bottom: 30px;
        text-shadow: 3px 3px 0 #06b6d4;
      }
      .search-panel {
        background-color: #1f2937;
        border: 1px solid #374151;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 32px;
      }
      .search-input,
      .filter-input {
        width: 100%;
        padding: 12px;
        border-radius: 6px;
        border: 1px solid #374151;
        background-color: #111827;
        color: #f9fafb;
        margin-bottom: 16px;
      }
      .filters {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }
      .filter-input {
        flex: 1;
        min-width: 180px;
        margin-bottom: 0;
      }
      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
      }
      .pagination-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        margin-top: 20px;
      }
      button {
        background-color: #06b6d4;
        color: white;
        font-weight: 700;
        padding: 8px 24px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.5;
      }
    `,
  ],
})
export class LocationsComponent implements OnInit {
  locations: Location[] = [];

  paginationInfo: Info | null = null;
  currentPage: number = 1;

  searchName: string = "";
  typeFilter: string = "";
  dimensionFilter: string = "";

  favoritesOnly: boolean = false;

  constructor(
    private rickAndMortyService: RickAndMortyService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    if (this.favoritesOnly) {
      const allFavorites = this.favoritesService.getFavorites();

      let filteredLocations = allFavorites.filter(
        (item) => "dimension" in item
      ) as Location[];

      if (this.searchName) {
        filteredLocations = filteredLocations.filter((loc) =>
          loc.name.toLowerCase().includes(this.searchName.toLowerCase())
        );
      }
      if (this.typeFilter) {
        filteredLocations = filteredLocations.filter(
          (loc) => loc.type === this.typeFilter
        );
      }
      if (this.dimensionFilter) {
        filteredLocations = filteredLocations.filter(
          (loc) => loc.dimension === this.dimensionFilter
        );
      }

      this.locations = filteredLocations;
      this.paginationInfo = null;
    } else {
      this.rickAndMortyService
        .GetAllLocations(
          this.currentPage,
          this.searchName,
          this.typeFilter,
          this.dimensionFilter
        )
        .subscribe({
          next: (data) => {
            this.locations = data.results;
            this.paginationInfo = data.info;
          },
          error: () => {
            this.locations = [];
            this.paginationInfo = null;
          },
        });
    }
  }

  applyFilters() {
    this.currentPage = 1;
    this.LoadData();
  }

  NextPage() {
    if (this.paginationInfo?.next) {
      this.currentPage++;
      this.LoadData();
    }
  }
  PreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.LoadData();
    }
  }
}
