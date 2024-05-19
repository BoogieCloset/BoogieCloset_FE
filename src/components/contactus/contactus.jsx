import React, { useState } from "react";
import styles from "./contactus.module.css";

export const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log(firstName, lastName, email, message);
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Contact us</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="firstName" className={styles.label}>
              First name
            </label>
            <input
              type="text"
              id="firstName"
              className={styles.inputname}
              placeholder="Jane"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="lastName" className={styles.label}>
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              className={styles.input}
              placeholder="Smitherton"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Email address
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder="email@janesfakedomain.net"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="message" className={styles.label}>
            Your message
          </label>
          <textarea
            id="message"
            className={styles.textarea}
            placeholder="Enter your question or message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};
