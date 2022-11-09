import { SelectProps } from "common/components";

export interface Pokemon {
  id: string;
  name: string;
  types: string;
  isFavorite: boolean;
  imageUrl: string;
}

export type QueryFilters = {
  isFavorite?: boolean;
  offset: number;
  search: string;
  type: string;
};

export type ViewFilter = "all" | "favorites";

export type TypeOption = SelectProps["options"][number];
