import React from "react";
import styles from "./MainPage.module.css";
import VideoMin from "../../components/UI/VideoMin/VideoMin";
import { Link } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
  const [videos, setVideos] = React.useState([]);
  const [videosLoading, setVideosLoading] = React.useState(false);
  React.useEffect(() => {
    const getVideos = async () => {
      setVideosLoading(true);
      const videos = await axios.get(
        "http://localhost:5000/data-load/get-videos"
      );
      console.log(videos);
      setVideos(videos.data);
      setVideosLoading(false);
    };
    getVideos();
  }, []);

  return (
    <div className={styles.main_page}>
      {videosLoading ? (
        <div>Загрузка...</div>
      ) : (
        <>
          {videos.map((video) => (
            <div className={styles.video_min}>
              <Link
                //to={"/watch_video?v=638494a1fe301e648c2bb148"}
                to={`watch_video?v=${video.video_id}`}
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
        </>
      )}
    </div>
  );
};

export default MainPage;
