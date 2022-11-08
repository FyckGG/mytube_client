import React from "react";
import "./Main_Button.css";

export default function Main_Button(props) {
  return (
    <button className="main_button" onClick={props.button_action}>
      {props.children}
    </button>
  );
}
