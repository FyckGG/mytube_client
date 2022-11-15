import React from "react";
import styles from "./VideoPreview.module.css";

const VideoPreview = (props) => {
  return (
    <img
      style={{ borderRadius: "5px", height: "auto", width: props.width }}
      src={props.src}
    ></img>
  );
};

export default VideoPreview;
