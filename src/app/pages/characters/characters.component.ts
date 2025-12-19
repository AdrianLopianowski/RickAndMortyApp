import { Component, OnInit } from "@angular/core";
import { RickAndMortyService } from "../../services/rick-and-morty.service";
import { CommonModule } from "@angular/common";
import { Character, Info } from "../../models/rick-and-morty.interface";
import { CardComponent } from "../../shared/components/cardComponent";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-characters",
  imports: [CommonModule, CardComponent, FormsModule],
  template: `
    <div class="container page-container">
      <h2 class="page-title">Postacie</h2>

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
            <select
              [(ngModel)]="speciesFilter"
              (change)="applyFilters()"
              class="filter-select"
            >
              <option value="">Species</option>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
              <option value="Robot">Robot</option>
              <option value="Mythological Creature">Mythological Creature</option>
            </select>
            <select
              [(ngModel)]="typeFilter"
              (change)="applyFilters()"
              class="filter-select"
            >
              <option value="">Type</option>
              <option value="Parasite">Parasite</option>
              <option value="Cyborg">Cyborg</option>
              <option value="Disease">Disease</option>
              <option value="Poopybutthole">Poopybutthole</option>
            </select>
          </div>
        </div>
      </main>

      <div class="cards-grid">
        @for (character of Characters; track character.id) {
        <app-card [data]="character"></app-card>
        } @empty {
        <p class="text-center">Nie znaleziono postaci spełniających kryteria.</p>
        }
      </div>

      <div class="pagination-controls">
        <button (click)="PreviousPage()" [disabled]="!paginationInfo?.prev">
          Poprzednia Strona
        </button>
        <span>Strona {{ currentPage }}</span>
        <button (click)="NextPage()" [disabled]="!paginationInfo?.next">
          Następna Strona
        </button>
      </div>
    </div>
  `,
  styles: `
    .container { padding: 20px; color: white; }
    
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

    .search-input, .filter-select {
      width: 100%;
      padding: 12px;
      border-radius: 6px;
      border: 1px solid #374151;
      background-color: #111827;
      color: #f9fafb;
      font-size: 16px;
    }

    .search-input { margin-bottom: 16px; }

    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .filter-select {
      flex: 1;
      min-width: 180px;
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
  `,
})
export class CharactersComponent implements OnInit {
  currentPage: number = 1;
  paginationInfo: Info | null = null;
  Characters: Character[] = [];
  speciesFilter: string = "";
  typeFilter: string = "";
  originFilter: string = "";
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
          this.Characters = data.results;
          this.paginationInfo = data.info;
        },
        error: (err) => {
          this.Characters = [];
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
