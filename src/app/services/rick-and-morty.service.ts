import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
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

  GetAllCharacters(
    page: number = 1,
    name: string = "",
    status: string = "",
    gender: string = "",
    species: string = "",
    type: string = ""
  ): Observable<ApiResponse<Character>> {
    let params = new HttpParams().set("page", page.toString());
    if (name) params = params.set("name", name);
    if (status) params = params.set("status", status);
    if (species) params = params.set("species", species);
    if (type) params = params.set("type", type);
    return this.http.get<ApiResponse<Character>>(
      `https://rickandmortyapi.com/api/character`,
      { params }
    );
  }
  GetAllLocations(
    page: number = 1,
    name: string = "",
    type: string = "",
    dimension: string = ""
  ): Observable<ApiResponse<Location>> {
    let params = new HttpParams().set("page", page.toString());
    if (name) params = params.set("name", name);
    if (type) params = params.set("type", type);
    if (dimension) params = params.set("dimension", dimension);
    return this.http.get<ApiResponse<Location>>(
      `https://rickandmortyapi.com/api/location`,
      { params }
    );
  }
  GetAllEpisodes(
    page: number = 1,
    name: string = "",
    episodeCode: string = ""
  ): Observable<ApiResponse<Episode>> {
    let params = new HttpParams().set("page", page.toString());
    if (name) params = params.set("name", name);
    if (episodeCode) params = params.set("episode", episodeCode);
    return this.http.get<ApiResponse<Episode>>(
      `https://rickandmortyapi.com/api/episode`,
      { params }
    );
  }
}
