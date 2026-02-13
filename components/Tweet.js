import styles from "../styles/Tweet.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addTweets } from "../reducers/lastTweets";

function Tweet(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log(user);

  const postTweetClick = () => {
    if (!user.token) {
      return;
    }

    fetch(`http://localhost:3000/users/canTweet/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.canTweet) {
          dispatch(addTweets(props));
        }
      });
  };

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <div className={styles.inputWhats}>
        <input
          type="text"
          placeholder="What's up?"
          className={styles.whatsUp}
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
