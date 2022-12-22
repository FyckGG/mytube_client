import React from "react";
import VideoPreview from "../VideoPreview/VideoPreview";
import styles from "./VideoMin.module.css";
import convertCount from "./../../../otherServices/ConvertCount";
import timeAgo from "./../../../otherServices/timeAgo";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { Link } from "react-router-dom";

const VideoMin = (props) => {
  return (
    <div className={styles.video_min}>
      <div>
        <VideoPreview
          src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          width="200"
        />
      </div>
      <div className={styles.video_info}>
        <Link to={"/profile/63779401330ba70b9cc7dd97"}>
          <ProfilePicture
            src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
            alt="profile_img"
            width="40"
            height="40"
          />
        </Link>
        <div className={styles.video_stats}>
          <h2 className={styles.video_name}>videoName..</h2>
          <Link
            to={"/profile/63779401330ba70b9cc7dd97"}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <h4 className={styles.channel_name}>channelName</h4>
          </Link>
          <p className={styles.views}>{convertCount(228)} просм.</p>
          <p className={styles.video_time}>{"3m 5s"}</p>
          <p>{timeAgo("2022-12-14T13:58:40.809+00:00")}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoMin;
