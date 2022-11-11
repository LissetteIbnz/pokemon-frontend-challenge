export interface PaginateDTO<ItemDTO> {
  limit: number;
  offset: number;
  count: number;
  items: ItemDTO[];
}

export type PaginateParamsDTO = {
  limit?: number;
  offset?: number;
  search?: string;
  isFavorite?: boolean;
  type?: string;
};
