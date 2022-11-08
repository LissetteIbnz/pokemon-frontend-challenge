import cx from "classnames";
import styles from "./card.module.scss";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return <div className={cx(styles.card, className)}>{children}</div>;
};
