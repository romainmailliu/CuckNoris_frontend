import styles from "../styles/Tweet.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addTweets } from "../reducers/lastTweets";
import { useState } from "react";

function Tweet() {
  const [tweetInput, setTweetInput] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const postTweetClick = () => {
    if (!user.token) {
      return;
    }

    fetch("http://localhost:3000/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: tweetInput,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.tweet) {
          dispatch(
            addTweets({
              content: data.tweet.content,
            }),
          );
          setTweetInput("");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la création du tweet :", error);
      });
  };

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <div className={styles.inputWhats}>
        <input
          type="text"
          placeholder="What's up?"
          onChange={(e) => setTweetInput(e.target.value)}
          className={styles.whatsUp}
          value={tweetInput}
        />
      </div>

      <div className={styles.countTweet}>
        <span>0/280</span>
        <button className={styles.buttonTweet} onClick={() => postTweetClick()}>
          Tweet
        </button>
      </div>
    </div>
  );
}

export default Tweet;
