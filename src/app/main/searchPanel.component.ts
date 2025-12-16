import { Component } from "@angular/core";
import { CardComponent } from "../shared/components/cardComponent";
import { RickAndMortyService } from "../services/rick-and-morty.service";
import { Character, Episode, Location, Info } from "../models/rick-and-morty.interface";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-search-panel",
  imports: [CardComponent, CommonModule],
  template: `
    <main class="container">
      <div class="search-panel">
        <input type="text" placeholder="Wpisz nazwę..." class="search-input" />
        <div class="filters">
          <select class="filter-select">
            <option>Status</option>
            <option>Alive</option>
            <option>Dead</option>
            <option>Unknown</option>
          </select>
          <input type="text" placeholder="Gender..." class="filter-input" />
          <select class="filter-select">
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Unknown</option>
          </select>
        </div>
      </div>
    </main>
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
export class SearchPanelComponent {
  constructor(private rickAndMortyService: RickAndMortyService) {}
  paginationInfo: Info | null = null;
  characters: Character[] = [];
  currentPage: number = 1; // Initialize currentPage
  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.rickAndMortyService.GetAllCharacters(this.currentPage).subscribe((data) => {
      this.paginationInfo = data.info;
      this.characters = data.results;
    });
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
