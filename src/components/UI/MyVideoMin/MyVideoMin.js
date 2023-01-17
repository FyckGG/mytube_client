import React from "react";
import VideoPreview from "../VideoPreview/VideoPreview";
import styles from "./MyVideoMin.module.css";
import convertCount from "./../../../otherServices/ConvertCount";
import timeAgo from "./../../../otherServices/timeAgo";
import Tooltip from "../Tooltip/Tooltip";
import { VerticalDotsInVIdeoMin } from "../VerticalDotsInVideoMin/VerticalDotsInVIdeoMin";

const MyVideoMin = (props) => {
  return (
    <div className={styles.video_min}>
      <div className={styles.dots}>
        <VerticalDotsInVIdeoMin
          is_watch_later={props.is_watch_later}
          video_id={props.video_id}
        />
      </div>
      <VideoPreview src={props.src} width="200" />
      <Tooltip text={props.video_name}>
        <h3 className={styles.video_name}>{props.video_name}</h3>
      </Tooltip>
      <p className={styles.views}>{convertCount(props.video_views)} просм.</p>
      <p className={styles.video_time}>{props.video_time}</p>
      <p>{timeAgo(props.video_date)}</p>
    </div>
  );
};

export default MyVideoMin;
