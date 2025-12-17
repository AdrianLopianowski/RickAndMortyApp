import { Component, OnInit } from "@angular/core";
import { RickAndMortyService } from "../../services/rick-and-morty.service";
import { CommonModule } from "@angular/common";
import { Location, Info } from "../../models/rick-and-morty.interface";
import { CardComponent } from "../../shared/components/cardComponent";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-locations",
  standalone: true,
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
            <input
              type="text"
              [(ngModel)]="typeFilter"
              (input)="applyFilters()"
              placeholder="Typ (np. Planet)..."
              class="filter-input"
            />
            <input
              type="text"
              [(ngModel)]="dimensionFilter"
              (input)="applyFilters()"
              placeholder="Wymiar..."
              class="filter-input"
            />
          </div>
        </div>
      </main>

      <div class="cards-grid">
        @for (location of filteredLocations; track location.id) {
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
  allLocations: Location[] = [];
  filteredLocations: Location[] = [];
  paginationInfo: Info | null = null;
  currentPage: number = 1;

  searchName: string = "";
  typeFilter: string = "";
  dimensionFilter: string = "";

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.rickAndMortyService.GetAllLocations(this.currentPage).subscribe((data) => {
      this.allLocations = data.results;
      this.paginationInfo = data.info;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredLocations = this.allLocations.filter((loc) => {
      return (
        loc.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
        loc.type.toLowerCase().includes(this.typeFilter.toLowerCase()) &&
        loc.dimension.toLowerCase().includes(this.dimensionFilter.toLowerCase())
      );
    });
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
