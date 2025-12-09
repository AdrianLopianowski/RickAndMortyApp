import { Component } from "@angular/core";

@Component({
  selector: "app-site-header",
  template: `
    <header class="site-header">
      <div class="container header-container">
        <a routerLink="/" class="logo"> R&M </a>

        <nav class="main-nav">
          <a routerLink="/postacie" class="nav-link">Postacie</a>
          <a routerLink="/lokacje" class="nav-link">Lokacje</a>
          <a routerLink="/odcinki" class="nav-link">Odcinki</a>
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
        background-color: #1f2937; /* ciemne tło */
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
      .main-nav a {
        color: #f9fafb;
        text-decoration: none;
        margin-left: 24px;
        font-weight: 700;
      }

      .main-nav a:first-child {
        margin-left: 0;
      }
      .nav-link {
        color: #e5e7eb;
        text-decoration: none;
        transition: color 0.15s ease-in-out;
      }

      .nav-link:hover {
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
