import React from "react";
import styles from "./UserVideos.module.css";
import Main_Button from "../UI/main_button/Main_Button";
import { Link } from "react-router-dom";
import { Context } from "../..";
import MyVideoMin from "../UI/MyVideoMin/MyVideoMin";
import { VideosInProfile } from "../VideosInProfile/VideosInProfile";
import { observer } from "mobx-react-lite";
import convertTime from "./../../otherServices/convertVideoTime";

import PageList from "../UI/PageList/PageList";

const UserVideos = observer((props) => {
  const store = React.useContext(Context);
  const [currentVideoPage, setCurrentVideoPage] = React.useState(0);

  const handlePageChange = (e) => {
    setCurrentVideoPage(e);
    console.log(e);
  };
  return (
    <div className={styles.user_video}>
      {props.is_loading ? (
        <h2 className={styles.loading}>Идёт загрузка...</h2>
      ) : (
        <>
          {!props.is_activated ? (
            <>
              {props.videos == "" ? (
                <div className={styles.no_video}>
                  <h2>Нет видео</h2>
                </div>
              ) : (
                <VideosInProfile
                  videos={props.videos}
                  currentVideoPage={currentVideoPage}
                />
                /* props.videos
                  .slice(currentVideoPage * 24, (currentVideoPage + 1) * 24)
                  .map((video) => (
                    <div className={styles.video_min}>
                      <Link
                        to={`/watch_video?v=${video.id}`}
                        style={{ color: "inherit", textDecoration: "inherit" }}
                      >
                        <MyVideoMin
                          src={`http://localhost:5000${video.thumbnail_dir}`}
                          video_name={video.video_name}
                          video_time={convertTime(video.video_duration)}
                          video_views={video.number_views}
                          video_date={video.video_date}
                        />
                      </Link>
                    </div>
                  )) */
              )}
              {props.is_load ? (
                <div style={{ marginTop: "5px" }}>
                  <Link
                    to={`/upload_video/${props.user_id}`}
                    className={styles.add_video}
                  >
                    Загрузить видео
                  </Link>
                </div>
              ) : (
                <></>
              )}
              <div style={{ marginTop: "7px" }}>
                {Math.ceil(props.videos.length / 24) >= 2 ? (
                  <PageList
                    buttons_count={Math.ceil(props.videos.length / 24)}
                    on_page_change={handlePageChange}
                    active_button={currentVideoPage}
                  />
                ) : (
                  <></>
                )}
              </div>
            </>
          ) : (
            <h2>Для загрузки видео подтвердите свою электронную почту.</h2>
          )}{" "}
        </>
      )}
    </div>
  );
});

export default UserVideos;
