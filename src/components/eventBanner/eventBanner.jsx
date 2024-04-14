import styles from "./eventBanner.module.css";

export const EventBanner = () => {
  return (
    <article
      className={styles.banner}
      style={{
        backgroundImage: "url(/images/logo.png",
        backgroundSize: "100%",
      }}
    >
    </article>
  );
};
