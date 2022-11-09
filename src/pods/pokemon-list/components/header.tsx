import { IconGrid, IconMenu } from "assets/icons";
import cx from "classnames";
import { Button, GroupButtons, Input, Select } from "common/components";
import { TypeOption } from "../pokemon-list.vm";
import styles from "./header.module.scss";

const LITERALS = {
  all: "All",
  favorites: "Favorites",
  search: "Search",
  type: "Type",
};

export interface HeaderProps {
  onAllClick: () => void;
  onSearchChange: (value: string) => void;
  onFavoritesClick: () => void;
  searchTerm: string;
  onTypeSelect: (value: string) => void;
  selectedType: string;
  typeOptions: TypeOption[];
}

export const Header = ({
  onAllClick,
  onFavoritesClick,
  onSearchChange,
  searchTerm,
  onTypeSelect,
  selectedType,
  typeOptions,
}: HeaderProps) => {
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
      <div className={cx(styles.space, styles.filters)}>
        <Input
          className={styles.search}
          placeholder={LITERALS.search}
          onChange={onSearchChange}
          value={searchTerm}
        />
        <Select
          placeholder={LITERALS.type}
          onChange={onTypeSelect}
          options={typeOptions}
          value={selectedType}
          className={styles.type}
        />
        <div className={styles.actions}>
          <Button variant="secondary" onlyIcon={true}>
            <IconMenu className={styles.icon} />
          </Button>
          <div className={styles.separator} />
          <Button variant="secondary" onlyIcon={true}>
            <IconGrid className={styles.icon} />
          </Button>
        </div>
      </div>
    </nav>
  );
};
