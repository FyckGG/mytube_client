import React from "react";
import styles from "./UserVideos.module.css";
import Main_Button from "../UI/main_button/Main_Button";
import { Link } from "react-router-dom";
import { Context } from "../..";
const UserVideos = () => {
  const store = React.useContext(Context);
  return (
    <div className={styles.user_video}>
      {store.user.isActivated ? (
        <>
          <div className={styles.no_video}>
            <h2>Нет видео</h2>
          </div>
          <Link
            to={`/upload_video/${store.user.id}`}
            className={styles.add_video}
          >
            Загрузить видео
          </Link>{" "}
        </>
      ) : (
        <h2>Для загрузки видео подтвердите свою электронную почту</h2>
      )}
    </div>
  );
};

export default UserVideos;
