import React from "react";
import styles from "./VideoPreview.module.css";

const VideoPreview = (props) => {
  return (
    <img
      style={{
        borderRadius: "5px",
        height: `${props.width * 0.6}px`,
        width: `${props.width}px`,
      }}
      src={props.src}
    ></img>
  );
};

export default VideoPreview;
