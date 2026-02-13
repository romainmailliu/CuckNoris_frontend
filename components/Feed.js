import styles from "../styles/Feed.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { removeTweets } from "../reducers/lastTweets";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Feed(props) {
  const dispatch = useDispatch();
  const [likeCount, setLikeCount] = useState(0);
  const user = useSelector((state) => state.user.value);

  const removeTweetClick = () => {
    if (!user || !user.token) {
      return;
    }

    fetch(`http://localhost:3000/tweets/${props._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ token: user.token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(removeTweets(props._id));
        }
      });
  };

  const handleLikeTweet = () => {
    props.updateLikedTweets(props._id);
  };
  let heartIconStyle = { cursor: "pointer" };
  if (props.isLiked) {
    heartIconStyle = { color: "#e74c3c", cursor: "pointer" };
  }

  const handleCountlike = () => {
    if (props.isLiked) {
      setLikeCount(Math.max(0, likeCount - 1));
    } else {
      setLikeCount(likeCount + 1);
    }
  };

  const formatHoursOnly = (dateIso) => {
    if (!dateIso) return "";

    const dateTweet = new Date(dateIso);
    const maintenant = new Date();

    const diffInMs = maintenant - dateTweet;

    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "il y a moins d'une heure";
    } else {
      return `il y a ${diffInHours}h`;
    }
  };

  return (
    <div className={styles.feed}>
      <div className={styles.partieHaute}>
        <div className={styles.userLogo}></div>
        <span className={styles.firstname}>{props.author.firstname}</span>
        <span className={styles.username}>@{props.author.username}</span>
        <span className={styles.date}>{formatHoursOnly(props.createdAt)}</span>
      </div>
      <div className={styles.partiBasse}>
        <div className={styles.content}>
          {props.content} <span className={styles.hashtag}></span>
        </div>
      </div>
      <span className={styles.icons}>
        <span>
          <FontAwesomeIcon
            icon={faHeart}
            className="like"
            style={heartIconStyle}
            onClick={() => {
              handleLikeTweet();
              handleCountlike();
            }}
          />
        </span>
        <span>{likeCount}</span>
        <span>
          {user && props.author && user.username === props.author.username && (
            <FontAwesomeIcon
              icon={faXmark}
              style={{ color: "rgba(255, 255, 255, 1.00)" }}
              onClick={() => removeTweetClick()}
            />
          )}
        </span>
      </span>
    </div>
  );
}

export default Feed;
