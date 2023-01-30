import React from "react";
import styles from "./BurgerMenu.module.css";
import { Link } from "react-router-dom";

export default function BurgerMenu(props) {
  return (
    <div
      className={
        props.active
          ? `${styles.menu_content_active} ${styles.menu_content} `
          : styles.menu_content
      }
    >
      <div className={`${styles.menu_header} ${styles.bottom_border}`}>
        {props.header}
      </div>
      <ul>
        {props.items.map((item, item_index, all_items) =>
          item.href === "" && item.value === "line" ? (
            <></>
          ) : item_index + 1 < all_items.length &&
            all_items[item_index + 1].href === "" &&
            all_items[item_index + 1].value === "line" ? (
            <Link to={item.href}>
              <li className={styles.bottom_border}>{item.value}</li>
            </Link>
          ) : (
            <Link to={item.href}>
              <li>{item.value}</li>
            </Link>
          )
        )}
      </ul>
    </div>
  );
}
