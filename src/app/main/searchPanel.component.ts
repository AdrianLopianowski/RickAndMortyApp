import { Component } from "@angular/core";

@Component({
  selector: "app-search-panel",
  template: ` <main class="container">
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
  </main>`,
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
    `,
  ],
})
export class SearchPanelComponent {}
