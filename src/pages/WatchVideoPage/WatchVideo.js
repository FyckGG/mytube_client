import React from "react";
import styles from "./WatchVideo.module.css";
import ReactPlayer from "react-player/lazy";
import { Context } from "../..";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const WatchVideo = () => {
  const store = React.useContext(Context);
  const [videoPath, setVideoPath] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  React.useEffect(() => {
    const getVideo = async () => {
      const video = await axios.post(
        "http://localhost:5000/user-action/load-watch-video",
        {
          video_id: searchParams.get("v"),
        }
      );

      setVideoPath(video.data.video_directory);
    };
    getVideo();
  }, []);

  return (
    <div className={styles.video_player}>
      <ReactPlayer
        url={`http://localhost:5000${videoPath}`}
        controls
        width="100%"
        height="70vh"
        style={{ display: "inline-block", marginTop: "20px" }}
      />
    </div>
  );
};

export default WatchVideo;
