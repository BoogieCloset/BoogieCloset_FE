import React from 'react';
import styles from './register.module.css';

export const Register = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.register_text}>Register</h1>
      <form>
        <p>Email address</p>
        <input
          className={styles.input_style1}
          type="email"
          placeholder="email@janesfakedomain.net"
          required
        />
        <p>Password</p>
        <input
          className={styles.input_style2}
          type="password"
          placeholder="password"
          required
        />
        <p>Password Confirmation</p>
        <input
          className={styles.input_style2}
          type="password"
          placeholder="password"
          required
        />
        <button className={styles.button_style} type="submit">Register</button>
      </form>
    </div>
  );
}