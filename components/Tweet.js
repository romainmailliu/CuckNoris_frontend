import styles from "../styles/Tweet.module.css";

function Tweet() {
  fetch("https://api.example.com/tweets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Jean Dupont",
      email: "jean@example.com",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Succès:", data))
    .catch((error) => console.error("Erreur:", error));

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
        <button className={styles.buttonTweet}>Tweet</button>
      </div>
    </div>
  );
}

export default Tweet;
