import React from "react";
import styles from "./PageButton.module.css";

const PageButton = (props) => {
  return (
    <button
      className={
        props.is_button_active ? styles.current_page_button : styles.page_button
      }
      onClick={props.on_click}
      disabled={props.is_button_active}
    >
      {props.number}
    </button>
  );
};

export default PageButton;
