import React from "react";
import styles from "./VerticalDots.module.css";

export const VerticalDots = (props) => {
  const [contentActive, setContentActive] = React.useState(false);
  const dotsRef = React.useRef(null);

  React.useEffect(() => {
    if (!contentActive) return;
    const handleClick = (e) => {
      if (!dotsRef.current) {
        return;
      }
      if (!dotsRef.current.contains(e.target)) {
        setContentActive(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [contentActive, setContentActive]);

  const showContent = (e) => {
    e.preventDefault();
    setContentActive(!contentActive);
  };
  return (
    <div>
      <div className={styles.dropdown} onClick={showContent} ref={dotsRef}>
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
          ref={dotsRef}
        >
          {props.content.map((item) => (
            <div
              className={styles.content_item}
              onClick={() => {
                item.action();
                setContentActive(false);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
