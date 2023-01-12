import React from "react";
import { VideosInProfile } from "../../components/VideosInProfile/VideosInProfile";
import { observer } from "mobx-react-lite";
import { getNewestVideos } from "../../otherServices/getNewestVideos";
import { getMostPopularVideos } from "../../otherServices/getMostPopularVIdeos";
import { getBestVideos } from "../../otherServices/getBestVideos";
import styles from "./UserProfileMainPage.module.css";

const UserProfileMainPage = observer((props) => {
  const [newestVideos, setNewestVideos] = React.useState([]);
  const [popularVideos, setPopularVideos] = React.useState([]);
  const [bestVideos, setBestVideos] = React.useState([]);

  React.useEffect(() => {
    getMostPopularVideos(props.videos);
    setNewestVideos(getNewestVideos(props.videos));
    setPopularVideos(getMostPopularVideos(props.videos));
    setBestVideos(getBestVideos(props.videos));
    console.log(props.videos);
    getNewestVideos(props.videos);
  }, [props.is_loading]);
  return (
    <div className={styles.prof_main_page}>
      {props.is_loading ? (
        <h2 className={styles.loading}>Идёт загрузка...</h2>
      ) : (
        <>
          <h1>Новые видео:</h1>
          {newestVideos.length == 0 ? (
            <h2 className={styles.videos_empty}>Новые видео отсутствуют.</h2>
          ) : (
            <VideosInProfile videos={newestVideos} />
          )}
          <h1>Наиболее просматриваемые видео:</h1>
          {popularVideos.length == 0 ? (
            <h2 className={styles.videos_empty}>Видео не имеют просмотров.</h2>
          ) : (
            <VideosInProfile videos={popularVideos} />
          )}
          <h1>Лучшие по оценкам видео:</h1>
          {bestVideos.length == 0 ? (
            <h2 className={styles.videos_empty}>Ваши видео никому не нужны.</h2>
          ) : (
            <VideosInProfile videos={bestVideos} />
          )}
        </>
      )}
    </div>
  );
});

export default UserProfileMainPage;
