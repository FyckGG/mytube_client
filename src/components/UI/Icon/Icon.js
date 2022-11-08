import React from "react";

export default function Icon(props) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      onClick={props.action}
    ></img>
  );
}
