import cx from "classnames";
import styles from "./card.module.scss";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => {
  return <div {...props} className={cx(styles.card, className)} />;
};
