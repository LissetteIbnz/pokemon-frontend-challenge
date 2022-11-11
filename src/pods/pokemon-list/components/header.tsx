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
          value={search}
          onChange={onSearchChange}
        />
        <Select
          className={styles.type}
          options={typeOptions}
          placeholder={LITERALS.type}
          value={typeFilter}
          onChange={onTypeFilterChange}
        />
        <div className={styles.actions}>
          <Button
            aria-label={LITERALS.viewList}
            onlyIcon={true}
            onClick={() => onViewChange("list")}
          >
            <IconMenu aria-hidden={true} className={styles.icon} />
          </Button>
          <div className={styles.separator} />
          <Button
            aria-label={LITERALS.viewGrid}
            onlyIcon={true}
            onClick={() => onViewChange("grid")}
          >
            <IconGrid aria-hidden={true} className={styles.icon} />
          </Button>
        </div>
      </div>
    </nav>
  );
};
