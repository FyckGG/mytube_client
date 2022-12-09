import React from "react";
import styles from "./UserVideos.module.css";
import Main_Button from "../UI/main_button/Main_Button";
import { Link } from "react-router-dom";
import { Context } from "../..";
import MyVideoMin from "../UI/MyVideoMin/MyVideoMin";
import { observer } from "mobx-react-lite";
import convertTime from "./../../otherServices/convertVideoTime";

const UserVideos = observer((props) => {
  const store = React.useContext(Context);
  console.log(store.user);
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
                props.videos.map((video) => (
                  <div className={styles.video_min}>
                    <Link
                      to={`/watch_video?v=${video.id}&u=${store.user.id}`}
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
                ))
              )}
              <div style={{ marginTop: "5px" }}>
                <Link
                  to={`/upload_video/${props.user_id}`}
                  className={styles.add_video}
                >
                  Загрузить видео
                </Link>{" "}
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
