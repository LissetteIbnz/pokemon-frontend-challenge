export interface Pokemon {
  id: string;
  name: string;
  types: string;
  isFavorite: boolean;
  imageUrl: string;
}

export type Filters = "all" | "favorites";
