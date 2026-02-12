import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/users";

import styles from "../styles/Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarlybirds } from "@fortawesome/free-brands-svg-icons";
import { Modal } from "antd";

import { useRouter } from "next/router"; // Gérer le changement de page

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [isSignInVisible, setIsSignInVisible] = useState(false);

  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // SIGN UP
  const handleSignUp = async () => {
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: signUpFirstname,
          username: signUpUsername,
          password: signUpPassword,
        }),
      });

      const data = await response.json();

      if (data.result) {
        dispatch(login({ username: signUpUsername, token: data.token }));

        setSignUpFirstname("");
        setSignUpUsername("");
        setSignUpPassword("");
        setIsSignUpVisible(false);
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Server unavailable. Please try again.");
    }
  };

  // SIGN IN
  const handleSignIn = async () => {
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: signInUsername,
          password: signInPassword,
        }),
      });

      const data = await response.json();

      if (data.result) {
        dispatch(login({ username: signInUsername, token: data.token }));

        setSignInUsername("");
        setSignInPassword("");
        setIsSignInVisible(false);
        router.push("/");
      } else {
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Server unavailable. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      {/* LEFT */}
      <div className={styles.left}>
        <FontAwesomeIcon icon={faEarlybirds} className={styles.icon} />
      </div>
      {/* RIGHT */}
      <div className={styles.right}>
        <h1 className={styles.title}>Et toi, tu en penses quoi ?</h1>
        <p className={styles.subtitle}>
          Rejoins LaChouette pour donner ton avis sur tout !{" "}
        </p>

        <button
          className={styles.heroBtnUp}
          onClick={() => setIsSignUpVisible(true)}
        >
          Sign up
        </button>

        <p className={styles.areYouBack}>Tu es de retour ?</p>

        <button
          className={styles.heroBtnIn}
          onClick={() => setIsSignInVisible(true)}
        >
          Sign in
        </button>
      </div>
      {/* ✅ MODAL SIGN UP */}
      <Modal
        open={isSignUpVisible}
        onCancel={() => setIsSignUpVisible(false)}
        footer={null}
        centered
        width={420}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Create your account</h2>
            <p>Join Hackatweet today 🚀</p>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Firstname"
              value={signUpFirstname}
              onChange={(e) => setSignUpFirstname(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username"
              value={signUpUsername}
              onChange={(e) => setSignUpUsername(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />
          </div>

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <button className={styles.primaryBtn} onClick={handleSignUp}>
            Create account
          </button>

          <div className={styles.switchText}>
            Already have an account?
            <span
              onClick={() => {
                setIsSignUpVisible(false);
                setIsSignInVisible(true);
              }}
            >
              Sign in
            </span>
          </div>
        </div>
      </Modal>

      {/* ✅ MODAL SIGN IN */}
      <Modal
        open={isSignInVisible}
        onCancel={() => setIsSignInVisible(false)}
        footer={null}
        centered
        width={420}
      >
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <h2>Welcome back 👋</h2>
            <p>Sign in to continue</p>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username"
              value={signInUsername}
              onChange={(e) => setSignInUsername(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
            />
          </div>

          {errorMessage && <p className={styles.error}>{errorMessage}</p>}

          <button className={styles.primaryBtn} onClick={handleSignIn}>
            Sign in
          </button>

          <div className={styles.switchText}>
            Don’t have an account?
            <span
              onClick={() => {
                setIsSignInVisible(false);
                setIsSignUpVisible(true);
              }}
            >
              Create one
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Login;
