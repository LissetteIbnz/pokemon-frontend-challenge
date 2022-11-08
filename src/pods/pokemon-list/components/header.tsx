import { GroupButtons } from "common/components";
import styles from "./header.module.scss";

const LITERALS = {
  all: "All",
  favorites: "Favorites",
};

export interface HeaderProps {
  onAllClick: () => void;
  onFavoritesClick: () => void;
}

export const Header = ({ onAllClick, onFavoritesClick }: HeaderProps) => {
  return (
    <nav className={styles.nav}>
      <GroupButtons
        buttons={[
          {
            onClick: onAllClick,
            title: LITERALS.all,
          },
          {
            onClick: onFavoritesClick,
            title: LITERALS.favorites,
          },
        ]}
      />
    </nav>
  );
};
