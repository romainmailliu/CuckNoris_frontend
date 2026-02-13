import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarlybirds } from "@fortawesome/free-brands-svg-icons";
import Tweet from "./Tweet";
import Trends from "./Trends";
function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <FontAwesomeIcon icon={faEarlybirds} className={styles.icon} />
        <div className={styles.userLogout}>
          <h2>Logo USER</h2>
          <button className={styles.logout}>Logout</button>
        </div>
      </div>
      <div className={styles.home}>
        <div className={styles.tweetPostContainer}>
          <Tweet />
        </div>
        <div className={styles.feedContainer}></div>
      </div>
      <div className={styles.trends}>
        <Trends />
      </div>
    </div>
  );
}

export default Home;
