import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-site-header",
  imports: [RouterLink],
  template: `
    <header class="site-header">
      <div class="container header-container">
        <a routerLink="/" class="logo"> R&M </a>

        <nav class="main-nav">
          <button routerLink="/characters" class="nav-button">Postacie</button>
          <button routerLink="/locations" class="nav-button">Lokacje</button>
          <button routerLink="/episodes" class="nav-button">Odcinki</button>
        </nav>
      </div>
    </header>

    <main class="container">
      <div class="intro-section">
        <h1 class="main-title">Rick and Morty</h1>
        <p class="subtitle">Przeglądarka Wszechświata</p>
      </div>
    </main>
  `,
  styles: [
    `
      .site-header {
        background-color: #1f2937;
        border-bottom: 1px solid #374151;
        padding: 8px 0;
        position: sticky;
        top: 0;
        z-index: 50;
      }

      .header-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }

      .logo {
        position: absolute;
        left: 0;
        font-size: 1.25rem;
        font-weight: 600;
        text-decoration: none;
        font-family: "Creepster", cursive;
        color: #06b6d4;
      }

      .logo:hover {
        color: #ffffff;
      }

      .main-nav {
        display: flex;
        gap: 1.5rem;
      }
      .nav-button {
        background-color: transparent;
        color: #f9fafb;
        border: none;
        font-weight: 700;
        cursor: pointer;
        transition: color 0.15s ease-in-out;
      }

      .nav-button:hover {
        color: #ffffff;
      }

      .main-title {
        font-family: "Creepster", cursive;
        font-size: 64px;
        color: #06b6d4;
      }

      .intro-section,
      .surprise-box {
        text-align: center;
        padding: 32px 0;
      }
    `,
  ],
})
export class SiteHeaderComponent {}
