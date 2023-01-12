import React from "react";
import { Link } from "react-router-dom";
import MyVideoMin from "../UI/MyVideoMin/MyVideoMin";
import styles from "./VideosInProfile.module.css";
import convertTime from "../../otherServices/convertVideoTime";

export const VideosInProfile = (props) => {
  const s1 = props.currentVideoPage ? props.currentVideoPage * 24 : 0;
  const s2 = props.currentVideoPage
    ? (props.currentVideoPage + 1) * 24
    : props.videos.length;
  return (
    <div style={{ textAlign: "center" }}>
      {props.videos.slice(s1, s2).map((video) => (
        <div className={styles.video_min}>
          <Link
            to={`/watch_video?v=${video.id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <MyVideoMin
              video_id={video.id}
              src={`http://localhost:5000${video.thumbnail_dir}`}
              video_name={video.video_name}
              video_time={convertTime(video.video_duration)}
              video_views={video.number_views}
              video_date={video.video_date}
              is_watch_later={video.is_watch_later}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
