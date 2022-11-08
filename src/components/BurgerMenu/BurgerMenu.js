import React from "react";
import styles from "./BurgerMenu.module.css";

export default function BurgerMenu(props) {
  return (
    <div
      className={
        props.active
          ? `${styles.menu_content_active} ${styles.menu_content} `
          : styles.menu_content
      }
    >
      <div className={styles.menu_header}>{props.header}</div>
      <ul>
        {props.items.map((item) => (
          <li>
            <a href={item.href}>{item.value}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
