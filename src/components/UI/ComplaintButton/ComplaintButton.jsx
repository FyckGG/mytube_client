import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import styles from "./ComplaintButton.module.css";

const ComplaintButton = () => {
  return (
    <div className={styles.complaint_button}>
      <div className={styles.complaint_icon}>
        <FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>
      </div>
      <div className={styles.complaint_text}>Пожаловаться</div>
    </div>
  );
};

export default ComplaintButton;
