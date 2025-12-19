import { Component, OnInit } from "@angular/core";
import { RickAndMortyService } from "../../services/rick-and-morty.service";
import { CommonModule } from "@angular/common";
import { Episode, Info } from "../../models/rick-and-morty.interface";
import { CardComponent } from "../../shared/components/cardComponent";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-episodes",
  imports: [CardComponent, CommonModule, FormsModule],
  template: `
    <div class="container page-container">
      <h2 class="page-title">Odcinki</h2>

      <main class="container">
        <div class="search-panel">
          <input
            type="text"
            [(ngModel)]="searchName"
            (input)="applyFilters()"
            placeholder="Wpisz nazwę odcinka..."
            class="search-input"
          />
          <select [(ngModel)]="codeFilter" (change)="applyFilters()" class="filter-input">
            <option value="">Wybierz Sezon</option>
            <option
              *ngFor="let code of ['S01', 'S02', 'S03', 'S04', 'S05']"
              [value]="code"
            >
              {{ code }}
            </option>
          </select>
        </div>
      </main>

      <div class="cards-grid">
        @for (episode of episodes; track episode.id) {
        <app-card [data]="episode"></app-card>
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
    
    .page-container { padding: 20px; }

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

    .search-input, .filter-input {
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

    .filter-input {
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
      margin-top: 16px;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
})
export class EpisodesComponent implements OnInit {
  constructor(private rickAndMortyService: RickAndMortyService) {}

  currentPage: number = 1;
  paginationInfo: Info | null = null;
  episodes: Episode[] = [];

  searchName: string = "";
  codeFilter: string = "";

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.rickAndMortyService
      .GetAllEpisodes(this.currentPage, this.searchName, this.codeFilter)
      .subscribe({
        next: (data) => {
          this.episodes = data.results;
          this.paginationInfo = data.info;
        },
        error: () => {
          this.episodes = [];
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
    if (this.paginationInfo?.prev) {
      this.currentPage--;
      this.LoadData();
    }
  }
}
