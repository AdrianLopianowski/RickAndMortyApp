import { Component, OnInit } from "@angular/core";
import { CardComponent } from "../shared/components/cardComponent";
import { RickAndMortyService } from "../services/rick-and-morty.service";
import { Character, Episode, Location, Info } from "../models/rick-and-morty.interface";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-search-panel",
  imports: [CardComponent, CommonModule, FormsModule],
  template: `
    <main class="container">
      <div class="search-panel">
        <input
          type="text"
          [(ngModel)]="searchName"
          (input)="applyFilters()"
          placeholder="Wpisz nazwę..."
          class="search-input"
        />

        <div class="filters">
          <select
            [(ngModel)]="statusFilter"
            (change)="applyFilters()"
            class="filter-select"
          >
            <option value="">Status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>

          <select
            [(ngModel)]="genderFilter"
            (change)="applyFilters()"
            class="filter-select"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>
    </main>
    <div class="pagination-controls">
      <button (click)="PreviousPage()" [disabled]="!paginationInfo?.prev">
        Poprzednia Strona
      </button>
      <span>Strona {{ currentPage }}</span>
      <button (click)="NextPage()" [disabled]="!paginationInfo?.next">
        Następna Strona
      </button>
    </div>
    <br />
    <div class="cards-grid">
      @for (character of characters; track character.id) {
      <app-card [data]="character"></app-card>
      }
    </div>
  `,
  styles: [
    `
      .search-input,
      .filter-input,
      .filter-select {
        width: 100%;
        padding: 12px;
        border-radius: 6px;
        border: 1px solid #374151;
        background-color: #111827;
        color: #f9fafb;
        font-size: 16px;
      }
      .pagination-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        margin-top: 30px;
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
        cursor: not-allowed;
      }
      .search-input {
        margin-bottom: 16px;
      }

      .filters {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
      }

      .filter-select,
      .filter-input {
        flex: 1;
        min-width: 180px;
      }

      .search-panel {
        background-color: #1f2937;
        border: 1px solid #374151;
        border-radius: 8px;
        padding: 24px;
        margin-bottom: 32px;
      }
      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
      }
    `,
  ],
})
export class SearchPanelComponent implements OnInit {
  characters: Character[] = [];
  paginationInfo: Info | null = null;
  currentPage: number = 1;

  speciesFilter: string = "";
  typeFilter: string = "";
  searchName: string = "";
  statusFilter: string = "";
  genderFilter: string = "";

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.rickAndMortyService
      .GetAllCharacters(
        this.currentPage,
        this.searchName,
        this.statusFilter,
        this.genderFilter,
        this.speciesFilter,
        this.typeFilter
      )
      .subscribe({
        next: (data) => {
          this.characters = data.results;
          this.paginationInfo = data.info;
        },
        error: (err) => {
          this.characters = [];
          this.paginationInfo = null;
        },
      });
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
