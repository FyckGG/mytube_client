import React from "react";
import "./Main_Button.css";

export default function Main_Button(props) {
  return (
    <button
      className={props.is_pressed ? "pressed_main_button" : "main_button"}
      onClick={props.button_action}
    >
      {props.children}
    </button>
  );
}
