import { Routes } from "@angular/router";
import { CharactersComponent } from "./pages/characters/characters.component";
import { EpisodesComponent } from "./pages/episodes/episodes.component";
import { LocationsComponent } from "./pages/locations/locations.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { FavoritesComponent } from "./pages/favorites/favorites.component";

import { loginGuard } from "./guards/login.guard";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "characters", component: CharactersComponent },
  { path: "episodes", component: EpisodesComponent },
  { path: "locations", component: LocationsComponent },
  { path: "login", component: LoginComponent, canActivate: [loginGuard] },
  { path: "favorites", component: FavoritesComponent, canActivate: [authGuard] },

  { path: "**", redirectTo: "" },
];
