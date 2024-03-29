import React from "react";
import VideoMin from "../VideoMin/VideoMin";
import { Link } from "react-router-dom";
import styles from "./VideoMinList.module.css";

export const VIdeoMinList = (props) => {
  return (
    <div>
      {props.videos.map((video) => (
        <div className={styles.video_min} key={video.video_id}>
          <Link
            to={`/watch_video?v=${video.video_id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <VideoMin
              video_id={video.video_id}
              name={video.video_name}
              preview={video.video_preview}
              channel={video.channel_id}
              channel_name={video.channel_name}
              channel_icon={video.channel_avatar}
              views={video.count_views}
              date={video.video_date}
              duration={video.video_duration}
              is_watch_later={video.is_watch_later}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
