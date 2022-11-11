import * as React from "react";
import { Button } from "common/components";
import styles from "./fetch-button.module.scss";

const LITERALS = {
  loading: "Loading more...",
  loadNewer: "Load Newer",
  nothingMore: "Nothing more to load",
};

export interface LoadMoreProps {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export const LoadMoreButton = React.forwardRef<HTMLDivElement, LoadMoreProps>(
  ({ fetchNextPage, hasNextPage, isFetchingNextPage }, ref) => {
    const buttonText = () => {
      if (isFetchingNextPage) {
        return LITERALS.loading;
      }

      if (hasNextPage) {
        return LITERALS.loadNewer;
      }

      return LITERALS.nothingMore;
    };

    return (
      <div ref={ref} className={styles.button}>
        <Button disabled={!hasNextPage || isFetchingNextPage} onClick={fetchNextPage}>
          {buttonText()}
        </Button>
      </div>
    );
  }
);
LoadMoreButton.displayName = "LoadMoreButton";
