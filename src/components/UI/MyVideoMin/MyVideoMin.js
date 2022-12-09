import React from "react";
import VideoPreview from "../VideoPreview/VideoPreview";
import styles from "./MyVideoMin.module.css";
import convertCount from "./../../../otherServices/ConvertCount";
import timeAgo from "./../../../otherServices/timeAgo";

const MyVideoMin = (props) => {
  return (
    <div className={styles.video_min}>
      <VideoPreview src={props.src} width="200" />
      <h3 className={styles.video_name}>{props.video_name}</h3>

      <p className={styles.views}>{convertCount(props.video_views)} просм.</p>
      <p className={styles.video_time}>{props.video_time}</p>
      <p>{timeAgo(props.video_date)}</p>
    </div>
  );
};

export default MyVideoMin;
