import { IconSound } from "assets/icons";
import { Button, Card, HeartButton } from "common/components";
import { PokemonDetails } from "../pokemon-details.vm";
import styles from "./pokemon-details-card.module.scss";

const LITERALS = {
  hp: "HP:",
  cp: "CP:",
  weight: "Weight",
  height: "Height",
};

export interface PokemonDetailsCardProps {
  pokemon: PokemonDetails;
  onFavorite: (pokemonId: PokemonDetails["id"], isFavorite: boolean) => void;
}

export const PokemonDetailsCard = ({ onFavorite, pokemon }: PokemonDetailsCardProps) => {
  return (
    <Card>
      <div className={styles["media-container"]}>
        <img alt={pokemon.name} className={styles.image} loading="lazy" src={pokemon.imageURL} />
        <Button className={styles.sound} onlyIcon={true}>
          <IconSound aria-hidden={true} />
        </Button>
      </div>
      <footer className={styles.footer}>
        <hgroup className={styles.footer__description}>
          <h2>{pokemon.name}</h2>
          <p>{pokemon.type}</p>
        </hgroup>
        <div className={styles.footer__heart}>
          <HeartButton
            isActive={pokemon.isFavorite}
            onClick={() => onFavorite(pokemon.id, pokemon.isFavorite)}
          />
        </div>
        <Bar className={styles.footer__cp}>
          {LITERALS.cp} {pokemon.cp}
        </Bar>
        <Bar className={styles.footer__hp}>
          {LITERALS.hp} {pokemon.hp}
        </Bar>
        <div className={styles.footer__left}>
          <p>{LITERALS.weight}</p>
          <p>{pokemon.weight}</p>
        </div>
        <div className={styles.footer__right}>
          <p>{LITERALS.height}</p>
          <p>{pokemon.height}</p>
        </div>
      </footer>
    </Card>
  );
};

interface BarProps {
  children: React.ReactNode;
  className: string;
}

const Bar = ({ children, className }: BarProps) => {
  return (
    <div className={className}>
      <div />
      <p>{children}</p>
    </div>
  );
};
