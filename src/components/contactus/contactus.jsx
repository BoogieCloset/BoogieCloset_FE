import React from 'react';
import styles from './contactus.module.css';

function Contact() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Contact us</h1>
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="firstName" className={styles.label}>First name</label>
            <input type="text" id="firstName" className={styles.inputname} placeholder="Jane" required />
          </div>
          <div className={styles.field}>
            <label htmlFor="lastName" className={styles.label}>Last name</label>
            <input type="text" id="lastName" className={styles.input} placeholder="Smitherton" required />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email address</label>
          <input type="email" id="email" className={styles.input} placeholder="email@janesfakedomain.net" required />
        </div>
        <div className={styles.field}>
          <label htmlFor="message" className={styles.label}>Your message</label>
          <textarea id="message" className={styles.textarea} placeholder="Enter your question or message" required />
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
}

export default Contact;