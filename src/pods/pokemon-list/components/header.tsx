import * as React from "react";
import cx from "classnames";
import { IconGrid, IconMenu } from "assets/icons";
import { Button, GroupButtons, GroupButtonsProps, Input, Select } from "common/components";
import { ViewFilter, TypeOption, View } from "../pokemon-list.vm";
import styles from "./header.module.scss";

const LITERALS = {
  all: "All",
  favorites: "Favorites",
  search: "Search",
  type: "Type",
  viewList: "View list",
  viewGrid: "View grid",
};

export interface HeaderProps {
  onSearchChange: (value: string) => void;
  onTypeFilterChange: (typeFilter: string) => void;
  onViewChange: (view: View) => void;
  onViewFilterChange: (viewFilter: ViewFilter) => void;
  search: string;
  typeFilter: string;
  typeOptions: TypeOption[];
  viewFilter: ViewFilter;
}

export const Header = ({
  onSearchChange,
  onTypeFilterChange,
  onViewChange,
  onViewFilterChange,
  search,
  typeFilter,
  typeOptions,
  viewFilter,
}: HeaderProps) => {
  const viewFilterButtons = React.useMemo<GroupButtonsProps["buttons"]>(
    () => [
      {
        onClick: () => onViewFilterChange("all"),
        title: LITERALS.all,
        isActive: viewFilter === "all",
      },
      {
        onClick: () => onViewFilterChange("favorites"),
        title: LITERALS.favorites,
        isActive: viewFilter === "favorites",
      },
    ],
    [onViewFilterChange, viewFilter]
  );

  return (
    <nav className={styles.nav}>
      <GroupButtons buttons={viewFilterButtons} />
      <div className={cx(styles.space, styles.filters)}>
        <Input
          className={styles.search}
          placeholder={LITERALS.search}
          onChange={onSearchChange}
          value={search}
        />
        <Select
          placeholder={LITERALS.type}
          onChange={onTypeFilterChange}
          options={typeOptions}
          value={typeFilter}
          className={styles.type}
        />
        <div className={styles.actions}>
          <Button
            onClick={() => onViewChange("list")}
            aria-label={LITERALS.viewList}
            onlyIcon={true}
          >
            <IconMenu aria-hidden={true} className={styles.icon} />
          </Button>
          <div className={styles.separator} />
          <Button
            onClick={() => onViewChange("grid")}
            aria-label={LITERALS.viewGrid}
            onlyIcon={true}
          >
            <IconGrid aria-hidden={true} className={styles.icon} />
          </Button>
        </div>
      </div>
    </nav>
  );
};
