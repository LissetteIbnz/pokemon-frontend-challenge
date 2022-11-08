import styles from "./app.layout.module.scss";

type AppLayoutProps = React.HTMLAttributes<HTMLElement>;

export const AppLayout = (props: AppLayoutProps) => {
  return <main {...props} className={styles.app} />;
};
