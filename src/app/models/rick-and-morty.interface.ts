// 1.struktura paginacji
export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

// 2.LOKACJA
export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

// 3.POSTAĆ
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

// 4. Odcinek
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string; //
  characters: string[]; // Tablica linków do postaci
  url: string;
  created: string;
}

export interface ApiResponse<T> {
  info: Info;
  results: T[];
}
