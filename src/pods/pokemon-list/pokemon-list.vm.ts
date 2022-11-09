import { SelectProps } from "common/components";

export interface Pokemon {
  id: string;
  name: string;
  types: string;
  isFavorite: boolean;
  imageUrl: string;
}

export type QueryFilters = {
  offset: number;
  search: string;
  type: string;
};

export type Filters = "all" | "favorites";

export type TypeOption = SelectProps["options"][number];
