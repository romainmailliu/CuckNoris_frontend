import styles from "../styles/LastTweets.module.css";
import { useEffect, useState } from "react";
import Feed from "./Feed";
import { useSelector } from "react-redux";

function LastTweet() {
  const [tweetsData, setTweetsData] = useState([]);
  const [likedTweet, setLikedTweet] = useState([]);

  const removedIds = useSelector((state) => state.lastTweets?.removedIds || []);
  useEffect(() => {
    fetch("http://localhost:3000/tweets")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTweetsData(data.tweets);
      });
  }, []);
  const updateLikedTweets = (tweetId) => {
    if (likedTweet.find((tweet) => tweet === tweetId)) {
      setLikedTweet(likedTweet.filter((tweet) => tweet !== tweetId));
    } else {
      setLikedTweet([...likedTweet, tweetId]);
    }
  };
  const visibleTweets = tweetsData.filter(
    (tweet) => !removedIds.includes(String(tweet._id)),
  );

  const tweets = visibleTweets.map((data, i) => {
    const isLiked = likedTweet.some((tweet) => tweet === data._id);
    return (
      <Feed
        key={data._id}
        {...data}
        isLiked={isLiked}
        updateLikedTweets={updateLikedTweets}
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
