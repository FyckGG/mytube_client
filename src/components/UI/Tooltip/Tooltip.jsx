import React from "react";
import styles from "./Tooltip.module.css";

const Tooltip = ({ children, text, ...rest }) => {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <div
        {...rest}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      <div
        className={styles.tooltip}
        style={show ? { visibility: "visible" } : {}}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
