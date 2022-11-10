interface Pokemon {
  id: string;
  imageURL: string;
  name: string;
  isFavorite: boolean;
}

export interface PokemonDetails extends Pokemon {
  soundURL: string;
  type: string;
  cp: number;
  hp: number;
  weight: string;
  height: string;
  evolutions: Pokemon[];
}
