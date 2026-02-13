import styles from "../styles/LastTweets.module.css";
import { useEffect, useState } from "react";

function LastTweet() {
  const [tweetsData, setTweetsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tweets")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTweetsData(data.tweets);
      });
  }, []);

  const tweets = tweetsData.map((data, i) => {
    return (
      <Tweet
        key={i}
        content={data.content}
        firtname={data.author.firstname}
        date={data.createdAt}
      />
    );
  });

  return (
    <div>
      <div className={styles.tweetsContainer}>{tweets}</div>
    </div>
  );
}

export default LastTweet;
