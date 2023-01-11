import React from "react";
import styles from "./MainPage.module.css";
import VideoMin from "../../components/UI/VideoMin/VideoMin";
import { VIdeoMinList } from "../../components/UI/VideoMinList/VIdeoMinList";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../..";
import { set } from "mobx";

const MainPage = () => {
  const store = React.useContext(Context);
  const [isUserLoading, setIsUserLoading] = React.useState(store.isLoading);
  const [videos, setVideos] = React.useState([]);
  const [videosLoading, setVideosLoading] = React.useState(true);
  React.useEffect(() => {
    const getVideos = async () => {
      const videos_res = await axios.post(
        "http://localhost:5000/data-load/get-videos",
        { user: store.user.id }
      );

      if (!isUserLoading) {
        setVideos(videos_res.data);
        setVideosLoading(false);
      }
      console.log(videos_res);
      setIsUserLoading(store.isLoading);
    };

    getVideos();
  }, [isUserLoading]);

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
