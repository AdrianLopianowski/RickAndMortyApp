import { Component, OnInit } from "@angular/core";
import { RickAndMortyService } from "../../services/rick-and-morty.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-characters",
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Lista Postaci</h2>
      <div class="pagination-controls">
        <button (click)="PreviousPage()" [disabled]="currentPage === 1">
          Poprzednia
        </button>
        <span>Strona {{ currentPage }}</span>
        <button (click)="NextPage()" [disabled]="!paginationInfo?.next">Następna</button>
      </div>
      <ul>
        @for (character of characters; track character.id) {
        <li>
          {{ character.name }}
        </li>
        }
      </ul>
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
  `,
})
export class CharactersComponent {
  constructor(private rickAndMortyService: RickAndMortyService) {}
  currentPage: number = 1;
  paginationInfo: any = null;
  characters: any[] = [];
  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.rickAndMortyService.GetAllCharacters(this.currentPage).subscribe((data: any) => {
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
