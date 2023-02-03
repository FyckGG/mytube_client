import React from "react";
import styles from "./UserVideos.module.css";
import Main_Button from "../UI/main_button/Main_Button";
import { Link } from "react-router-dom";
import { Context } from "../..";
import MyVideoMin from "../UI/MyVideoMin/MyVideoMin";
import { VideosInProfile } from "../VideosInProfile/VideosInProfile";
import { observer } from "mobx-react-lite";
import convertTime from "../../otherServices/convertVideoTime";

import PageList from "../UI/PageList/PageList";

const UserVideos = observer((props) => {
  const store = React.useContext(Context);
  const [editVideoActive, setEditVideoActive] = React.useState(false);
  const [currentVideoPage, setCurrentVideoPage] = React.useState(0);

  const handleEdiVideoFormActive = () => {
    setEditVideoActive(true);
  };

  const handlePageChange = (e) => {
    setCurrentVideoPage(e);
  };
  return (
    <>
      <div className={styles.user_video}>
        {props.is_loading ? (
          <h2 className={styles.loading}>Идёт загрузка...</h2>
        ) : (
          <>
            {props.videos == "" ? (
              <div className={styles.no_video}>
                <h2>Нет видео</h2>
              </div>
            ) : (
              <VideosInProfile
                activation_edit_form={handleEdiVideoFormActive}
                can_redact={props.can_change}
                videos={props.videos}
                currentVideoPage={currentVideoPage}
              />
            )}
            {props.can_change && !props.is_activated ? (
              <div style={{ marginTop: "5px" }}>
                <Link
                  to={`/upload_video/${props.user_id}`}
                  className={styles.add_video}
                >
                  Загрузить видео
                </Link>
              </div>
            ) : props.can_change ? (
              <h2>Для загрузки видео подтвердите свою электронную почту.</h2>
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
        )}
      </div>
    </>
  );
});

export default UserVideos;
