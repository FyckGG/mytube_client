import React from "react";
import VideoPreview from "../VideoPreview/VideoPreview";
import styles from "./VideoMin.module.css";
import convertCount from "./../../../otherServices/ConvertCount";
import convertTime from "./../../../otherServices/convertVideoTime";
import timeAgo from "./../../../otherServices/timeAgo";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Tooltip from "../Tooltip/Tooltip";
import { Link } from "react-router-dom";

const VideoMin = (props) => {
  return (
    <div className={styles.video_min}>
      <div>
        <VideoPreview
          src={`http://localhost:5000${props.preview}`}
          width="200"
        />
      </div>
      <div className={styles.video_info}>
        <Link to={`/profile/${props.channel}`} style={{ height: "40%" }}>
          <ProfilePicture
            src={`http://localhost:5000${props.channel_icon}`}
            alt="profile_img"
            width="40"
            height="40"
          />
        </Link>
        <div className={styles.video_stats}>
          <Tooltip text={props.name}>
            <h2 className={styles.video_name}>{props.name}</h2>
          </Tooltip>
          <Link
            to={"/profile/63779401330ba70b9cc7dd97"}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <h4 className={styles.channel_name}>{props.channel_name}</h4>
          </Link>
          <p className={styles.views}>{convertCount(props.views)} просм.</p>
          <p className={styles.video_time}>{convertTime(props.duration)}</p>
          <p>{timeAgo(props.date)}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoMin;
