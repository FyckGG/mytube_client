import React from "react";
import { Link } from "react-router-dom";
import MyVideoMin from "../UI/MyVideoMin/MyVideoMin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./VideosInProfile.module.css";
import convertTime from "../../otherServices/convertVideoTime";

export const VideosInProfile = (props) => {
  // const [editVideoFormActive, setEditVideoFormActive] = React.useState(false);
  const editVideo = (e) => {
    e.preventDefault();
    console.log(e.target);
    props.activation_edit_form();
  };
  const s1 = props.currentVideoPage ? props.currentVideoPage * 24 : 0;
  const s2 = props.currentVideoPage
    ? (props.currentVideoPage + 1) * 24
    : props.videos.length;
  return (
    <div style={{ textAlign: "center" }}>
      {props.videos.slice(s1, s2).map((video) => (
        <div className={styles.video_min}>
          <Link
            to={`/watch_video?v=${video.id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <div className={styles.video_min_item}>
              <MyVideoMin
                video_id={video.id}
                src={`${process.env.REACT_APP_API_URL}${video.thumbnail_dir}`}
                video_name={video.video_name}
                video_time={convertTime(video.video_duration)}
                video_views={video.number_views}
                video_date={video.video_date}
                is_watch_later={video.is_watch_later}
              />
              {props.can_redact ? (
                <div
                  id={video.id}
                  className={styles.edit_icon}
                  // onClick={editVideo}
                >
                  <Link
                    to={`/edit_video?v=${video.id}`}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <FontAwesomeIcon
                      className={styles.font_edit}
                      icon={faPen}
                      size="lg"
                    />
                  </Link>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
