import cx from "classnames";
import { Card } from "../card";
import { HeartButton } from "../heart-button";
import { SoundButton } from "./components";
import styles from "./pokemon-card.module.scss";

export interface PokemonCardProps {
  className?: string;
  imageUrl: string;
  isFavorite: boolean;
  onClick: () => void;
  onFavorite: () => void;
  title: string;
  types?: string;
}

export const PokemonCard = ({
  className,
  imageUrl,
  isFavorite,
  onClick,
  onFavorite,
  title,
  types,
}: PokemonCardProps) => {
  return (
    <Card className={cx(styles.container, className)} onClick={onClick}>
      <img loading="lazy" className={styles.media} alt={title} src={imageUrl} />
      <footer className={styles.footer}>
        <hgroup>
          <h2>{title}</h2>
          {types && <p>{types}</p>}
        </hgroup>
        <HeartButton onClick={onFavorite} isActive={isFavorite} />
      </footer>
    </Card>
  );
};
