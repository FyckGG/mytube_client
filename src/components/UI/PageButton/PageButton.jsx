import React from "react";
import styles from "./PageButton.module.css";

const PageButton = (props) => {
  return <button className={styles.page_button}>{props.number}</button>;
};

export default PageButton;
