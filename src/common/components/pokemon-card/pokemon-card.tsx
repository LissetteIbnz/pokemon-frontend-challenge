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

export function PokemonCard({
  description,
  imageUrl,
  isFavorite,
  onFavorite,
  title,
  className,
}: PokemonCardProps) {
  return (
    <Card className={className}>
      <img className={styles.media} alt={title} src={imageUrl} />
      <div className={styles.description}>
        <hgroup>
          <h2>{title}</h2>
          <p>{description}</p>
        </hgroup>
        <HeartButton onClick={onFavorite} isActive={isFavorite} />
      </div>
    </Card>
  );
}
