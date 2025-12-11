import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-site-header",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="container header-container">
        <a routerLink="/" class="logo"> R&M </a>

        <nav class="main-nav">
          <a routerLink="/characters" routerLinkActive="active" class="nav-link">
            Postacie
          </a>

          <a routerLink="/locations" routerLinkActive="active" class="nav-link">
            Lokacje
          </a>

          <a routerLink="/episodes" routerLinkActive="active" class="nav-link">
            Odcinki
          </a>
        </nav>
      </div>
    </header>
    <main class="container">
      <div class="intro-section">
        <h1 class="main-title">Rick and Morty</h1>
        <p class="subtitle">Przegladarka Wszechswiata</p>
      </div>
    </main>
  `,
  styles: [
    `
      .site-header {
        background-color: #111827;
        border-bottom: 2px solid #374151;
        padding: 10px 0;
        position: sticky;
        top: 0;
        z-index: 50;
      }

      main.container {
        background-color: #111827;
        padding: 30px 10px;
        max-width: 800px;
        margin: 40px auto;

        text-align: center;
      }

      .main-title {
        font-family: "Creepster", cursive;
        font-size: 4rem;
        color: #06b6d4;
        text-shadow: 4px 4px 0px #97ce4c;
        margin-bottom: 10px;
      }

      .subtitle {
        font-family: "Creepster", cursive;
        font-size: 2rem;
        color: #97ce4c;
        text-shadow: 2px 2px 0px #06b6d4;
        letter-spacing: 2px;
      }

      .header-container {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 20px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .logo,
      .nav-link {
        font-family: "Creepster", cursive;
        text-decoration: none;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        letter-spacing: 2px;
      }

      .logo {
        font-size: 2.5rem;
        color: #06b6d4;
        text-shadow: 3px 3px 0px #97ce4c;
      }

      .logo:hover {
        transform: scale(1.1) rotate(-2deg);
      }

      .main-nav {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 2rem;
        align-items: center;
      }

      .nav-link {
        font-size: 1.5rem;
        color: #97ce4c;
        text-shadow: 2px 2px 0px #06b6d4;
        background: none;
        border: none;
      }

      .nav-link:hover {
        color: #ffffff;
        text-shadow: 0 0 15px #97ce4c;
        transform: scale(1.1);
      }

      .nav-link.active {
        color: #06b6d4;
        text-shadow: 2px 2px 0px #ffffff;
        text-decoration: underline wavy #97ce4c;
        text-underline-offset: 8px;
      }

      @media (max-width: 600px) {
        .header-container {
          flex-direction: column;
          gap: 10px;
        }
        .main-nav {
          gap: 1rem;
        }
        .nav-link {
          font-size: 1.2rem;
        }
      }
    `,
  ],
})
export class SiteHeaderComponent {}
