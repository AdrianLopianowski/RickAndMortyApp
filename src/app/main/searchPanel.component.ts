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

    <div class="cards-grid">
      @for (character of filteredCharacters; track character.id) {
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
export class SearchPanelComponent implements OnInit {
  allCharacters: Character[] = [];
  filteredCharacters: Character[] = [];
  paginationInfo: Info | null = null;
  currentPage: number = 1;

  searchName: string = "";
  statusFilter: string = "";
  genderFilter: string = "";

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.rickAndMortyService.GetAllCharacters(this.currentPage).subscribe((data) => {
      this.paginationInfo = data.info;
      this.allCharacters = data.results;
      this.applyFilters();
    });
  }

  applyFilters() {
    const name = this.searchName.toLowerCase();

    this.filteredCharacters = this.allCharacters.filter((character) => {
      const matchesName = character.name.toLowerCase().includes(name);
      const matchesStatus = this.statusFilter
        ? character.status === this.statusFilter
        : true;
      const matchesGender = this.genderFilter
        ? character.gender === this.genderFilter
        : true;

      return matchesName && matchesStatus && matchesGender;
    });
  }
}
