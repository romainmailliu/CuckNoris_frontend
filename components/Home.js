import styles from "../styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarlybirds } from "@fortawesome/free-brands-svg-icons";
import Tweet from "./Tweet";
import Trends from "./Trends";
import LastTweet from "./LastTweets";
import { useDispatch, useSelector } from "react-redux";
import { logout, login } from "../reducers/users";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [hashtags, setHashtags] = useState([]);

  // Va chercher le username dans le Reducer
  const username = useSelector((state) => state.user.value.username);

  // Gère la déconnection en renvoyant sur Login et vidant le Reducer
  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  console.log("username=>", username);

  // Récupérer la data des tweets dans la base de donnée

  useEffect(() => {
    const fetchHashtags = async () => {
      const response = await fetch("http://localhost:3000/hashtag");
      const data = await response.json();

      setHashtags(data.result);
    };

    fetchHashtags();
  }, []);

  // Faire un map pour les faire apparaitre
  const allHashtags = hashtags.map((name, i) => <Trends key={i} name={name} />);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <FontAwesomeIcon icon={faEarlybirds} className={styles.icon} />
        <div className={styles.userLogout}>
          <div className={styles.userLogo}></div>
          <span className={styles.username}>@{username}</span>
          <button onClick={() => handleLogout()} className={styles.logout}>
            Logout
          </button>
        </div>
      </div>
      <div className={styles.home}>
        <div className={styles.tweetPostContainer}>
          <Tweet />
        </div>
        <div className={styles.feedContainer}>
          <LastTweet />
        </div>
      </div>
      <div className={styles.trends}>
        <div className={styles.container}>
          <h1>Trends</h1>
          {allHashtags}
        </div>
      </div>
    </div>
  );
}

export default Home;
