import { EvolutionSection, PokemonDetailsCard } from "./components";
import { PokemonDetails } from "./pokemon-details.vm";
import styles from "./pokemon-details.module.scss";
import { Button } from "common/components";

const LITERALS = {
  goBack: "Go back",
};

export interface PokemonDetailsComponentProps {
  pokemon: PokemonDetails;
  onGoBack: () => void;
  onNavigateToPokemon: (pokemonId: PokemonDetails["id"]) => void;
  onFavorite: (pokemonId: PokemonDetails["id"], isFavorite: boolean) => void;
}

export const PokemonDetailsComponent = ({
  pokemon,
  onNavigateToPokemon,
  onFavorite,
  onGoBack,
}: PokemonDetailsComponentProps) => {
  const hasEvolutions = pokemon.evolutions.length > 0;

  return (
    <article className={styles.container}>
      <PokemonDetailsCard
        pokemon={pokemon}
        onFavorite={() => onFavorite(pokemon.id, pokemon.isFavorite)}
      />

      {hasEvolutions && (
        <EvolutionSection
          evolutions={pokemon.evolutions}
          onFavorite={onFavorite}
          onNavigateToPokemon={onNavigateToPokemon}
        />
      )}

      <Button className={styles.button} onClick={onGoBack}>
        {LITERALS.goBack}
      </Button>
    </article>
  );
};
