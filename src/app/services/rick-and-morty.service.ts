import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RickAndMortyService {
  constructor(private http: HttpClient) {}

  GetRandomCharacter() {
    const randomNum: number = Math.floor(Math.random() * 826) + 1;
    return this.http.get(`https://rickandmortyapi.com/api/character/${randomNum}`);
  }

  GetRandomLocation() {
    const randomNum: number = Math.floor(Math.random() * 126) + 1;
    return this.http.get(`https://rickandmortyapi.com/api/location/${randomNum}`);
  }

  GetRandomEpisode() {
    const randomNum: number = Math.floor(Math.random() * 51) + 1;
    return this.http.get(`https://rickandmortyapi.com/api/episode/${randomNum}`);
  }

  GetAllCharacters(page: number = 1) {
    return this.http.get(`https://rickandmortyapi.com/api/character?page=${page}`);
  }
  GetAllLocations(page: number = 1) {
    return this.http.get(`https://rickandmortyapi.com/api/location?page=${page}`);
  }
  GetAllEpisodes(page: number = 1) {
    return this.http.get(`https://rickandmortyapi.com/api/episode?page=${page}`);
  }
}
