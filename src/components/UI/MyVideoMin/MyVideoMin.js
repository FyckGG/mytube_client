import React from "react";
import VideoPreview from "../VideoPreview/VideoPreview";
import styles from "./MyVideoMin.module.css";

const MyVideoMin = (props) => {
  return (
    <div className={styles.video_min}>
      <VideoPreview src={props.src} width="200" />
      <h3 className={styles.video_name}>{props.video_name}</h3>
      {/* <p className={styles.views}>{props.views} просмотров</p> */}
      <p className={styles.views}>0 просмотров</p>
      <p className={styles.video_time}>{props.video_time}</p>
    </div>
  );
};

export default MyVideoMin;
