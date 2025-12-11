import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  ApiResponse,
  Character,
  Location,
  Episode,
} from "../models/rick-and-morty.interface";
@Injectable({
  providedIn: "root",
})
export class RickAndMortyService {
  constructor(private http: HttpClient) {}

  GetRandomCharacter() {
    const id = Math.floor(Math.random() * 826) + 1;
    return this.http.get<Character>(`https://rickandmortyapi.com/api/character/${id}`);
  }

  GetRandomLocation() {
    const id = Math.floor(Math.random() * 126) + 1;
    return this.http.get<Location>(`https://rickandmortyapi.com/api/location/${id}`);
  }

  GetRandomEpisode() {
    const id = Math.floor(Math.random() * 51) + 1;
    return this.http.get<Episode>(`https://rickandmortyapi.com/api/episode/${id}`);
  }

  GetAllCharacters(page: number = 1) {
    return this.http.get<ApiResponse<Character>>(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
  }
  GetAllLocations(page: number = 1) {
    return this.http.get<ApiResponse<Location>>(
      `https://rickandmortyapi.com/api/location?page=${page}`
    );
  }
  GetAllEpisodes(page: number = 1) {
    return this.http.get<ApiResponse<Episode>>(
      `https://rickandmortyapi.com/api/episode?page=${page}`
    );
  }
}
