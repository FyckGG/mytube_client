import React from "react";
import styles from "./MyTab.module.css";

const MyTab = (props) => {
  return (
    <button
      className={props.tab_active ? styles.mytab_on : styles.mytab}
      onClick={props.tab_action}
    >
      {props.tabname}
    </button>
  );
};

export default MyTab;

// className={
//   props.active
//     ? `${styles.menu_content_active} ${styles.menu_content} `
//     : styles.menu_content
// }
