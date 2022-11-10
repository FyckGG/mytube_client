import React from "react";
import styles from "./Donut.module.css";

const Donut = (props) => {
  return (
    <div className={styles.load_panel}>
      <div
        style={{
          display: "inline-block",
          color: "#f3f47b",
          fontSize: "15px",
          fontWeight: "bold",
          margin: "auto",
        }}
      >
        {props.donut_name}
      </div>
      <div
        class={styles.donut}
        style={{
          borderLeftColor: props.donut_color,
          width: props.donut_size,
          height: props.donut_size,
        }}
      ></div>{" "}
    </div>
  );
};

export default Donut;
