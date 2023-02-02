import React from "react";
import styles from "./MainPage.module.css";
import VideoMin from "../../components/UI/VideoMin/VideoMin";
import { Donut_2 } from "../../components/UI/Donut_2/Donut_2";
import { VIdeoMinList } from "../../components/UI/VideoMinList/VIdeoMinList";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../..";

const MainPage = () => {
  const store = React.useContext(Context);
  const [isUserLoading, setIsUserLoading] = React.useState(store.isLoading);
  const [videos, setVideos] = React.useState([]);
  const [videosLoading, setVideosLoading] = React.useState(true);
  React.useEffect(() => {
    const getVideos = async () => {
      const videos_res = await axios.post(
        `${process.env.REACT_APP_API_URL}/data-load/get-videos`,
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
        <Donut_2 />
      ) : (
        <>
          <h1>Новые видео:</h1>
          <VIdeoMinList videos={videos} />
          <div style={{ marginTop: "2rem" }}>
            <Link to={`/new?page=0`} className={styles.more_videos_link}>
              Больше новых видео
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
