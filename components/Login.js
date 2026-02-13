import styles from "../styles/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarlybirds } from "@fortawesome/free-brands-svg-icons";

function Login() {
  //const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className={styles.container}>
      {/* Partie gauche */}
      <div className={styles.left}>
        <FontAwesomeIcon icon={faEarlybirds} className={styles.icon} />
        <logo></logo>
      </div>

      {/* Partie droite */}
      <div className={styles.right}>
        <logo></logo>
        <h1>See what's happening</h1>
        <p>Join Hackatweet today</p>
        <button>Sign up</button>
        <p>Already have an account?</p>
        <button>Sign in</button>
      </div>
    </div>
  );
}

export default Login;
