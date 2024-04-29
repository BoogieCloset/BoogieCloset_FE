import styles from "./login.module.css";


function Login() {
  return (
    <div className={styles.container}>
      <h1 className={styles.login_text}>Login</h1>
      <form>
        <p>Email address</p>
        <input
          className={styles.input_style}
          type="email"
          placeholder="email@janesfakedomain.net"
          required
        />
        <p>Password</p>
        <input
          className={styles.input_style}
          type="password"
          placeholder="password"
          required
        />
        <button className={styles.button_style} type="submit">Login</button>
        <p className={styles.registerLink}>
          Don't have an account? <a href="/register">Register Account</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
