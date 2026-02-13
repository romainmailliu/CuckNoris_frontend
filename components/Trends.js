import styles from "../styles/Trends.module.css";

function Trend(props) {
  return (
    <div className={styles.feed}>
      <div className={styles.partieHaute}>
        <span className={styles.usertname}>#{props.name}</span>
      </div>
    </div>
  );
}

export default Trend;
