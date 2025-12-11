import { Routes } from "@angular/router";
import { CharactersComponent } from "./pages/characters/characters.component";
import { EpisodesComponent } from "./pages/episodes/episodes.component";
import { LocationsComponent } from "./pages/locations/locations.component";
import { HomeComponent } from "./pages/home/home.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "characters", component: CharactersComponent },
  { path: "episodes", component: EpisodesComponent },
  { path: "locations", component: LocationsComponent },
  { path: "**", redirectTo: "" },
];
