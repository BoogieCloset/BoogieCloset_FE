import styles from "./sidebar.module.css";

export const Sidebar = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
      <aside className={styles.sidebar}>
        <ul className={styles.list}>
          {categories.map((category) => (
            <li
              key={category}
              className={styles["list-item"]}
              style={{ fontWeight: selectedCategory === category ? "bold" : "normal" }}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>
    );
  };