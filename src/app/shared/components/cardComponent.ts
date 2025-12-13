import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule],

  template: `
    <article class="card-main">
      @if (data.image) {
      <div class="image-wrapper">
        <img [src]="data.image" [alt]="data.name" />
      </div>
      }

      <div class="card-content">
        <h2 class="card-title">{{ data.name }}</h2>

        @if (data.status) {
        <p class="info-row">
          <span class="label">Status:</span>
          <span
            class="value"
            [class.dead]="data.status === 'Dead'"
            [class.alive]="data.status === 'Alive'"
          >
            {{ data.status }}
          </span>
        </p>
        } @if (data.species) {
        <p class="info-row"><span class="label">Gatunek:</span> {{ data.species }}</p>
        } @if (data.type) {
        <p class="info-row"><span class="label">Typ:</span> {{ data.type }}</p>
        } @if (data.air_date) {
        <p class="info-row">
          <span class="label">Data emisji:</span> {{ data.air_date }}
        </p>
        }
      </div>
    </article>
  `,
  styles: [
    `
      .card-main {
        background-color: #1f2937;
        border: 2px solid #374151;
        border-radius: 12px;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .card-main:hover {
        transform: translateY(-5px);
        border-color: #97ce4c;
        box-shadow: 0 0 15px rgba(151, 206, 76, 0.3);
      }

      .image-wrapper {
        width: 100%;
        height: 250px;
        overflow: hidden;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }

      .card-main:hover img {
        transform: scale(1.05);
      }

      .card-content {
        padding: 16px;
        text-align: left;
      }

      .card-title {
        font-family: "Creepster", cursive;
        font-size: 1.8rem;
        color: #06b6d4;
        margin: 0 0 12px 0;
        line-height: 1.1;
      }

      .info-row {
        margin: 6px 0;
        color: #d1d5db;
        font-size: 0.95rem;
      }

      .label {
        color: #9ca3af;
        font-weight: bold;
      }

      .alive {
        color: #97ce4c;
        font-weight: bold;
      }
      .dead {
        color: #ef4444;
        font-weight: bold;
      }
    `,
  ],
})
export class CardComponent {
  @Input() data: any;
}
