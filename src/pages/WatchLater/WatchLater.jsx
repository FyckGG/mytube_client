import React from "react";
import UserDataLoad from "../../userDataLoad/userDataLoad";
import { VIdeoMinList } from "../../components/UI/VideoMinList/VIdeoMinList";
import { getLastUrlPart } from "../../otherServices/getLastUrlPart";
import { Donut_2 } from "../../components/UI/Donut_2/Donut_2";
import styles from "./WatchLater.module.css";

export const WatchLater = () => {
  const [watchLaterVideos, setWatchLaterVideos] = React.useState([]);
  const [isVIdeosLoad, setIsVideosLoad] = React.useState(true);

  React.useEffect(() => {
    const getWatchLaterVideos = async () => {
      const user_id = getLastUrlPart(window.location.href);
      const watch_later_videos = await UserDataLoad.getWatchLaterVideos(
        user_id
      );
      const videos = watch_later_videos.data.map((video) => {
        return { ...video, is_watch_later: true };
      });
      setWatchLaterVideos(videos);
      setIsVideosLoad(false);
    };
    getWatchLaterVideos();
  }, []);
  return (
    <div className={styles.watch_later_page}>
      {isVIdeosLoad ? (
        <Donut_2 />
      ) : watchLaterVideos.length == 0 ? (
        <h1>Нет видео для просмотра позже</h1>
      ) : (
        <VIdeoMinList videos={watchLaterVideos} />
      )}
    </div>
  );
};
