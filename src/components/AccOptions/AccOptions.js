import React from "react";
import styles from "./AccOptions.module.css";
import { useEffect, useRef } from "react";
import { Transition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const defaultStyle = {
  transition: `opacity 200ms ease-in-out`,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default function AccOptions(props) {
  return (
    <Transition
      in={props.optionsActive}
      timeout={300}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          ref={props.acc_ref}
          className={`${styles.acc_options}`}
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          <div className={styles.options_header}>{props.header}</div>

          <ul>
            {props.items.map((item) => (
              <Link to={item.href}>
                <div className={styles.menu_item} onClick={item.action}>
                  <li>
                    <FontAwesomeIcon
                      icon={item.icon}
                      size="lg"
                      style={{ paddingRight: "5px" }}
                    />
                    {item.value}
                  </li>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </Transition>
  );
}

// return (
//   <div ref={props.acc_ref} className={styles.acc_options}>
//     <div className={styles.options_header}>{props.header}</div>

//     <ul>
//       <li>
//         <a href={""}>{"Выход там"}</a>
//       </li>
//     </ul>
//   </div>
// );
