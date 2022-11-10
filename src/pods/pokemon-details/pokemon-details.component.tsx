import { IconSound } from "assets/icons";
import { Button, Card, HeartButton } from "common/components";
import { PokemonDetails } from "./pokemon-details.vm";
import styles from "./pokemon-details.module.scss";

interface PokemonDetailsComponentProps {
  pokemon: PokemonDetails;
  onFavorite: (pokemonId: PokemonDetails["id"], isFavorite: boolean) => void;
}

export const PokemonDetailsComponent = ({ pokemon, onFavorite }: PokemonDetailsComponentProps) => {
  return (
    <article className={styles.container}>
      <Card>
        <div className={styles["media-container"]}>
          <img className={styles.image} src={pokemon.imageURL} alt={pokemon.name} />
          <Button className={styles.sound} onlyIcon={true}>
            <IconSound />
          </Button>
        </div>
        <footer className={styles.footer}>
          <hgroup className={styles["footer__description"]}>
            <h2>{pokemon.name}</h2>
            <p>{pokemon.type}</p>
          </hgroup>
          <div className={styles["footer__heart"]}>
            <HeartButton
              onClick={() => onFavorite(pokemon.id, pokemon.isFavorite)}
              isActive={pokemon.isFavorite}
            />
          </div>
          <div className={styles["footer__cp"]}>
            <div />
            <p>CP: {pokemon.cp}</p>
          </div>
          <div className={styles["footer__hp"]}>
            <div />
            <p>HP: {pokemon.hp}</p>
          </div>
          <div className={styles["footer__left"]}>
            <p>Weight</p>
            <p>{pokemon.weight}</p>
          </div>
          <div className={styles["footer__right"]}>
            <p>Height</p>
            <p>{pokemon.height}</p>
          </div>
        </footer>
      </Card>

      <h3>Evolutions</h3>
      <div>
        {pokemon.evolutions.map((evolution) => (
          <Card key={evolution.id}>
            <div className={styles["media-container"]}>
              <img className={styles.image} src={evolution.imageURL} alt={evolution.name} />
            </div>
            <footer className={styles.footer}>
              <hgroup className={styles["footer__description"]}>
                <h2>{evolution.name}</h2>
              </hgroup>
              <div className={styles["footer__heart"]}>
                <HeartButton
                  onClick={() => onFavorite(evolution.id, evolution.isFavorite)}
                  isActive={evolution.isFavorite}
                />
              </div>
            </footer>
          </Card>
        ))}
      </div>
    </article>
  );
};
