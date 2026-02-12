import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarlybirds } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div>
      <div className={styles.header}>
        <FontAwesomeIcon icon={faEarlybirds} />
        <button>Logout</button>
      </div>
    </div>
  );
}

export default Home;
