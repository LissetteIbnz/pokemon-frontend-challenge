import { EvolutionSection, PokemonDetailsCard } from "./components";
import { PokemonDetails } from "./pokemon-details.vm";
import styles from "./pokemon-details.module.scss";

interface PokemonDetailsComponentProps {
  pokemon: PokemonDetails;
  onNavigateToPokemon: (pokemonId: PokemonDetails["id"]) => void;
  onFavorite: (pokemonId: PokemonDetails["id"], isFavorite: boolean) => void;
}

export const PokemonDetailsComponent = ({
  pokemon,
  onNavigateToPokemon,
  onFavorite,
}: PokemonDetailsComponentProps) => {
  const hasEvolutions = pokemon.evolutions.length > 0;

  return (
    <article className={styles.container}>
      <PokemonDetailsCard
        onFavorite={() => onFavorite(pokemon.id, pokemon.isFavorite)}
        pokemon={pokemon}
      />

      {hasEvolutions && (
        <EvolutionSection
          onNavigateToPokemon={onNavigateToPokemon}
          evolutions={pokemon.evolutions}
          onFavorite={onFavorite}
        />
      )}
    </article>
  );
};
