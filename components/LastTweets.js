import styles from "../styles/LastTweets.module.css";
import { useEffect, useState } from "react";
import Feed from "./Feed";

function LastTweet() {
  const [tweetsData, setTweetsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tweets")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTweetsData(data.tweets);
      });
  }, [tweetsData]);

  const tweets = tweetsData.map((data, i) => {
    return <Feed key={i} {...data} />;
  });

  return (
    <div>
      <div className={styles.tweetsContainer}>{tweets}</div>
    </div>
  );
}

export default LastTweet;
