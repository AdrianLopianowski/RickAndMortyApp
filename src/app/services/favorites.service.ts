import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class FavoritesService {
  constructor(private authService: AuthService) {}

  private getUserKey(): string | null {
    const user = localStorage.getItem("logged_in_user");
    return user ? `favorites_${user.trim().toLowerCase()}` : null;
  }

  private getItemCategory(item: any): string {
    if (item.species) return "character";
    if (item.dimension) return "location";
    if (item.episode && typeof item.episode === "string") return "episode";
    return "unknown";
  }

  getFavorites(): any[] {
    const key = this.getUserKey();
    if (!key) return [];
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Błąd parsowania ulubionych", e);
      return [];
    }
  }

  isFavorite(item: any): boolean {
    if (!item || !item.id) return false;
    const favorites = this.getFavorites();
    const itemCategory = this.getItemCategory(item);

    return favorites.some(
      (fav) => fav.id == item.id && this.getItemCategory(fav) === itemCategory
    );
  }

  toggleFavorite(item: any) {
    const key = this.getUserKey();
    if (!key) return;

    const favorites = this.getFavorites();
    const itemCategory = this.getItemCategory(item);
    const index = favorites.findIndex(
      (fav) => fav.id == item.id && this.getItemCategory(fav) === itemCategory
    );

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(item);
    }

    localStorage.setItem(key, JSON.stringify(favorites));
  }
}
