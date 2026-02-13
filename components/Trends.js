import styles from "../styles/Trends.module.css";

function Trend(props) {
  return (
    <div className={styles.feed}>
      <div className={styles.partieHaute}>
        <span className={styles.username}>#{props.name}</span>
        <span className={styles.count}>{props.count} posts</span>
      </div>
    </div>
  );
}

export default Trend;
