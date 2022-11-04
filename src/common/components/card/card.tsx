import cx from "classnames";
import styles from "./card.module.scss";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={cx(styles.card, className)}>{children}</div>;
}
