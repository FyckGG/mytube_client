import React from "react";
import styles from "./UserVideos.module.css";
import Main_Button from "../UI/main_button/Main_Button";
import { Link } from "react-router-dom";
import { Context } from "../..";
import MyVideoMin from "../UI/MyVideoMin/MyVideoMin";
const UserVideos = (props) => {
  return (
    <div className={styles.user_video}>
      {!props.is_activated ? (
        <>
          {props.videos == "" ? (
            <div className={styles.no_video}>
              <h2>Нет видео</h2>
            </div>
          ) : (
            props.videos.map((video) => (
              <MyVideoMin
                src={`http://localhost:5000${video.thumbnail_dir}`}
                video_name={video.video_name}
                video_time={video.video_duration}
              />
            ))
          )}
          <Link
            to={`/upload_video/${props.user_id}`}
            className={styles.add_video}
          >
            Загрузить видео
          </Link>{" "}
        </>
      ) : (
        <h2>Для загрузки видео подтвердите свою электронную почту.</h2>
      )}
    </div>
  );
};

export default UserVideos;
