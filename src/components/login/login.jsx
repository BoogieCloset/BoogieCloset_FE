import React, { useState } from "react";
import styles from "./login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className={styles.container}>
      <h1 className={styles.login_text}>Login</h1>
      <form >
        <p>Email address</p>
        <input
          className={styles.input_style}
          type="email"
          placeholder="email@janesfakedomain.net"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          className={styles.input_style}
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button_style} type="submit">
          Login
        </button>
        <p className={styles.registerLink}>
          Don't have an account? <a href="/register">Register Account</a>
        </p>
      </form>
    </div>
  );
};