import React from "react";
import styles from "./VerticalDots.module.css";

export const VerticalDots = (props) => {
  const [contentActive, setContentActive] = React.useState(false);
  const showContent = (e) => {
    e.preventDefault();
    setContentActive(!contentActive);
  };
  return (
    <div>
      <div className={styles.dropdown} onClick={showContent}>
        <ul
          className={`${styles.dropbtn} ${styles.icons} ${styles.btn_right} ${styles.showleft}`}
        >
          <li></li>
          <li></li>
          <li></li>
        </ul>

        <div
          className={
            contentActive
              ? `${styles.dropdown_content} ${styles.dropdown_content_active}`
              : styles.dropdown_content
          }
        >
          {props.content.map((item) => (
            <div className={styles.content_item}>{item.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
