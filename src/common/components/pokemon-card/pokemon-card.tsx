import cx from "classnames";
import { Card } from "../card";
import { HeartButton } from "../heart-button";
import styles from "./pokemon-card.module.scss";

export interface PokemonCardProps {
  className?: string;
  description: string;
  imageUrl: string;
  isFavorite: boolean;
  onFavorite: () => void;
  title: string;
}

export const PokemonCard = ({
  description,
  imageUrl,
  isFavorite,
  onFavorite,
  title,
  className,
}: PokemonCardProps) => {
  return (
    <Card className={cx(styles.container, className)}>
      <img loading="lazy" className={styles.media} alt={title} src={imageUrl} />
      <div className={styles.description}>
        <hgroup>
          <h2>{title}</h2>
          <p>{description}</p>
        </hgroup>
        <HeartButton onClick={onFavorite} isActive={isFavorite} />
      </div>
    </Card>
  );
};
