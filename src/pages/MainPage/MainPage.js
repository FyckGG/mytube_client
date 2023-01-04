import React from "react";
import styles from "./MainPage.module.css";
import VideoMin from "../../components/UI/VideoMin/VideoMin";
import { VIdeoMinList } from "../../components/UI/VideoMinList/VIdeoMinList";
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
          <VIdeoMinList videos={videos} />
        </>
      )}
    </div>
  );
};

export default MainPage;
