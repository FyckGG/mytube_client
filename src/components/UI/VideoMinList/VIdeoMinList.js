import React from "react";
import VideoMin from "../VideoMin/VideoMin";
import { Link } from "react-router-dom";
import styles from "./VideoMinList.module.css";

export const VIdeoMinList = ({ videos }) => {
  return (
    <div>
      {videos.map((video) => (
        <div className={styles.video_min}>
          <Link
            to={`/watch_video?v=${video.video_id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <VideoMin
              name={video.video_name}
              preview={video.video_preview}
              channel={video.channel_id}
              channel_name={video.channel_name}
              channel_icon={video.channel_avatar}
              views={video.count_views}
              date={video.video_date}
              duration={video.video_duration}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
