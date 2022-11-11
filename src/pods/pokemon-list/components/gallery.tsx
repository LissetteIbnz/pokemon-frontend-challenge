import cx from "classnames";
import { View } from "../pokemon-list.vm";
import styles from "./gallery.module.scss";

interface GalleryProps {
  children: React.ReactNode;
  view: View;
}

export const Gallery = ({ children, view }: GalleryProps) => {
  const isListView = view === "list";

  return (
    <section className={cx(styles.gallery, { [styles.list]: isListView })}>{children}</section>
  );
};
