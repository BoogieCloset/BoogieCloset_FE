import React, { useState } from 'react';
import axios from 'axios';
import styles from "./login.module.css";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const response = await axios.post('/login', formData, {
        withCredentials: true
      });

      const authorizationHeader = response.headers['authorization'];
      if (authorizationHeader) {
        // 토큰 값을 로컬 스토리지에 저장합니다.
        localStorage.setItem('token', authorizationHeader);
        console.log('Received token:', authorizationHeader); // 토큰을 로그에 출력
      } else {
        console.error('Authorization header is missing in the response.');
      }


      window.location.href = '/';
      
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.login_text}>Login</h1>
      <form onSubmit={handleLogin}>
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
