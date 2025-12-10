import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RickAndMortyService {
  constructor(private http: HttpClient) {}

  GetRandomResult() {
    const randomNum: number = Math.floor(Math.random() * 826) + 1;
    return this.http.get(`https://rickandmortyapi.com/api/character/${randomNum}`);
  }
}
