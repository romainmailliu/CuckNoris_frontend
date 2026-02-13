import styles from "../styles/Feed.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { removeTweets } from "../reducers/lastTweets";
import { useDispatch } from "react-redux";

function Feed(props) {
  const dispatch = useDispatch();

  // const removeTweetClick = () => {
  //   dispatch(removeTweets(props.content));
  // };

  return (
    <div className={styles.feed}>
      <div className={styles.partieHaute}>
        <div className={styles.userLogo}></div>
        <span className={styles.firstname}>{props.author.firstname}</span>
        <span className={styles.username}>@{props.author.username}</span>
      </div>
      <div className={styles.partiBasse}>
        <div className={styles.content}>
          {props.content} <span className={styles.hashtag}>#finDuGame</span>
        </div>
      </div>
      <span className={styles.icons}>
        <FontAwesomeIcon
          icon={faHeart}
          className="like"
          style={{ color: "rgb(240,29,114)" }}
        />
        <FontAwesomeIcon
          icon={faXmark}
          style={{ color: "rgba(255, 255, 255, 1.00)" }}
        />
      </span>
    </div>
  );
}

export default Feed;
