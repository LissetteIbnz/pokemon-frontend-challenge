export interface PokemonDTO {
  id: string;
  name: string;
  number: number;
  image: string;
  isFavorite: boolean;
  types: string[];
}

export interface PokemonDetailsDTO {
  id: string;
  name: string;
  types: string[];
  weight: SizeDTO;
  height: SizeDTO;
  evolutions: EvolutionDTO[];
  maxCP: number;
  maxHP: number;
  number: number;
  previousEvolutions: EvolutionDTO[];
  image: string;
  sound: string;
  isFavorite: boolean;
}

interface EvolutionDTO {
  id: string;
  number: number;
  name: string;
  image: string;
  isFavorite: boolean;
  types: string[];
}

interface SizeDTO {
  minimum: string;
  maximum: string;
}
