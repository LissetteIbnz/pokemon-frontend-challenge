import styles from "./gallery.module.scss";

interface GalleryProps {
  children: React.ReactNode;
}

export const Gallery = ({ children }: GalleryProps) => {
  return <section className={styles.gallery}>{children}</section>;
};
