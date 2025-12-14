import { Component, OnInit } from "@angular/core";
import { RickAndMortyService } from "../../services/rick-and-morty.service";
import { CommonModule } from "@angular/common";
import { ApiResponse, Character, Info } from "../../models/rick-and-morty.interface";
import { CardComponent } from "../../shared/components/cardComponent";

@Component({
  selector: "app-characters",
  imports: [CommonModule, CardComponent],
  template: `
    <div class="container page-container">
      <h2 class="page-title">Postacie</h2>

      <div class="cards-grid">
        @for (character of characters; track character.id) {
        <app-card [data]="character"></app-card>
        }
      </div>
    </div>
  `,
  styles: `
    .container { padding: 20px; color: white; }
    li { margin-bottom: 5px; font-size: 18px; }
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
      .pagination-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        margin-top: 20px;
      }
      .page-container {
      padding: 20px;
    }

    .page-title {
      font-family: "Creepster", cursive;
      color: #97ce4c;
      font-size: 3rem;
      text-align: center;
      margin-bottom: 30px;
      text-shadow: 3px 3px 0 #06b6d4;
    }

    
    .cards-grid {
      display: grid;
      /* repeat(auto-fill, ...): Wstaw tyle kolumn, ile się zmieści.
         minmax(300px, 1fr): Każda karta ma min. 300px szerokości, 
         ale może się rozciągnąć (1fr), żeby wypełnić dziury.
      */
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px; 
    }
  `,
})
export class CharactersComponent {
  constructor(private rickAndMortyService: RickAndMortyService) {}
  currentPage: number = 1;
  paginationInfo: Info | null = null;
  characters: Character[] = [];
  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.rickAndMortyService.GetAllCharacters(this.currentPage).subscribe((data) => {
      this.characters = data.results;
      this.paginationInfo = data.info;
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
