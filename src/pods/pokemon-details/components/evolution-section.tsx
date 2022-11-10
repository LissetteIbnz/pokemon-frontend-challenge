import { PokemonCard } from "common/components";
import { PokemonDetails } from "../pokemon-details.vm";
import styles from "./evolution-section.module.scss";

const LITERALS = { evolutions: "Evolutions" };

interface EvolutionSectionProps {
  evolutions: PokemonDetails["evolutions"];
  onNavigateToPokemon: (pokemonId: PokemonDetails["id"]) => void;
  onFavorite: (pokemonId: PokemonDetails["id"], isFavorite: boolean) => void;
}

export const EvolutionSection = ({
  evolutions,
  onNavigateToPokemon,
  onFavorite,
}: EvolutionSectionProps) => {
  return (
    <>
      <h2 className={styles.title}>{LITERALS.evolutions}</h2>
      <div className={styles.evolution}>
        {evolutions.map((evolution) => (
          <PokemonCard
            imageUrl={evolution.imageURL}
            isFavorite={evolution.isFavorite}
            key={evolution.id}
            onClick={() => onNavigateToPokemon(evolution.id)}
            onFavorite={() => onFavorite(evolution.id, evolution.isFavorite)}
            title={evolution.name}
          />
        ))}
      </div>
    </>
  );
};
