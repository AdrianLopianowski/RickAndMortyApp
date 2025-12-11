import { Component, OnInit } from "@angular/core";
import { RickAndMortyService } from "../../services/rick-and-morty.service"; // Sprawdź ścieżkę
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-locations",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h2>Lista Lokacji</h2>

      <div class="pagination-controls">
        <button (click)="PreviousPage()" [disabled]="currentPage === 1">
          Poprzednia
        </button>
        <span>Strona {{ currentPage }}</span>
        <button (click)="NextPage()" [disabled]="!paginationInfo?.next">Następna</button>
      </div>

      <ul>
        @for (location of locations; track location.id) {
        <li>{{ location.name }} ({{ location.type }})</li>
        }
      </ul>
    </div>
  `,

  styles: [
    `
      .container {
        padding: 20px;
        color: white;
      }
      li {
        margin-bottom: 5px;
        font-size: 18px;
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
      .pagination-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 16px;
        margin-top: 20px;
      }
    `,
  ],
})
export class LocationsComponent {
  constructor(private rickAndMortyService: RickAndMortyService) {}
  currentPage: number = 1;
  paginationInfo: any = null;
  locations: any[] = [];
  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.rickAndMortyService.GetAllLocations(this.currentPage).subscribe((data: any) => {
      this.locations = data.results;
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
