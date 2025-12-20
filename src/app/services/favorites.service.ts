import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { RickAndMortyData } from "../models/rick-and-morty.interface";

@Injectable({
  providedIn: "root",
})
export class FavoritesService {
  constructor(private authService: AuthService) {}

  private getUserKey(): string | null {
    const user = localStorage.getItem("logged_in_user");
    return user ? `favorites_${user.trim().toLowerCase()}` : null;
  }

  private getItemCategory(item: RickAndMortyData): string {
    if ("species" in item) return "character";

    if ("dimension" in item) return "location";

    if ("episode" in item) {
      if (typeof item.episode === "string") {
        return "episode";
      }
    }

    return "unknown";
  }

  getFavorites(): RickAndMortyData[] {
    const key = this.getUserKey();
    if (!key) return [];
    const data = localStorage.getItem(key);
    try {
      return data ? (JSON.parse(data) as RickAndMortyData[]) : [];
    } catch (e) {
      console.error("Błąd parsowania ulubionych", e);
      return [];
    }
  }

  isFavorite(item: RickAndMortyData): boolean {
    if (!item || !item.id) return false;
    const favorites = this.getFavorites();
    const itemCategory = this.getItemCategory(item);

    return favorites.some(
      (fav) => fav.id === item.id && this.getItemCategory(fav) === itemCategory
    );
  }

  toggleFavorite(item: RickAndMortyData) {
    const key = this.getUserKey();
    if (!key) return;

    const favorites = this.getFavorites();
    const itemCategory = this.getItemCategory(item);

    const index = favorites.findIndex(
      (fav) => fav.id === item.id && this.getItemCategory(fav) === itemCategory
    );

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(item);
    }

    localStorage.setItem(key, JSON.stringify(favorites));
  }
}
