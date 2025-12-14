import { Component, OnInit } from "@angular/core";
import { RickAndMortyService } from "../../services/rick-and-morty.service";
import { CommonModule } from "@angular/common";
import { ApiResponse, Location, Info } from "../../models/rick-and-morty.interface";
import { CardComponent } from "../../shared/components/cardComponent";

@Component({
  selector: "app-locations",
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="container page-container">
      <h2 class="page-title">Postacie</h2>

      <div class="cards-grid">
        @for (location of locations; track location.id) {
        <app-card [data]="location"></app-card>
        }
      </div>
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

        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
      }
    `,
  ],
})
export class LocationsComponent {
  constructor(private rickAndMortyService: RickAndMortyService) {}
  currentPage: number = 1;
  paginationInfo: Info | null = null;
  locations: Location[] = [];
  ngOnInit() {
    this.LoadData();
  }
  LoadData() {
    this.rickAndMortyService.GetAllLocations(this.currentPage).subscribe((data) => {
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
