import React from "react";
import styles from "./WatchVideo.module.css";
import ReactPlayer from "react-player/lazy";
import { Context } from "../..";
import { useSearchParams } from "react-router-dom";
import ProfilePicture from "../../components/UI/ProfilePicture/ProfilePicture";
import Main_Button from "../../components/UI/main_button/Main_Button";
import LikeDislikePanel from "../../components/LikeDislikePanel/LikeDislikePanel";
import axios from "axios";
import { observer } from "mobx-react-lite";

const WatchVideo = observer(() => {
  const store = React.useContext(Context);
  const [videoPath, setVideoPath] = React.useState("");
  const [videoName, setVideoName] = React.useState("");
  const [videoDescription, setVideoDescription] = React.useState("");
  const [videoSubject, setVideoSubject] = React.useState("");
  const [channelAvatar, setChannelAvatar] = React.useState("");
  const [channelName, setChannelName] = React.useState("");
  const [countLike, setCountLike] = React.useState("");
  const [countDislike, setCountDislike] = React.useState("");
  const [countSubs, setCountSubs] = React.useState("");
  const [countViews, setCountViews] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLoading, setPageLoading] = React.useState(false);

  React.useEffect(() => {
    const getVideo = async () => {
      setPageLoading(true);
      const video = await axios.post(
        "http://localhost:5000/user-action/load-watch-video",
        {
          video_id: searchParams.get("v"),
        }
      );
      setVideoPath(video.data.video.video_directory);
      setVideoName(video.data.video.video_name);
      setVideoDescription(video.data.video.video_description);
      setVideoSubject(video.data.video.video_subject);
      setChannelAvatar(video.data.channel_avatar);
      setChannelName(video.data.channel_name);
      setCountLike(video.data.count_likes);
      setCountDislike(video.data.count_dislikes);
      setCountSubs(video.data.count_subs);
      setCountViews(video.data.count_views);
      setPageLoading(false);
    };
    getVideo();
  }, []);

  return (
    <div>
      <div className={styles.video_player}>
        <ReactPlayer
          url={`http://localhost:5000${videoPath}`}
          controls
          width="100%"
          height="70vh"
          style={{ display: "inline-block", marginTop: "20px" }}
        />
      </div>
      {pageLoading ? (
        <div></div>
      ) : (
        <>
          <div
            style={{ borderBottom: "4px solid #d9d9d9", paddingBottom: "10px" }}
          >
            <div className={styles.video_stat}>
              <h1 className={styles.video_name}>{videoName}</h1>
              <h2 className={styles.views_count}>
                Количество просмотров:{countViews}
              </h2>
            </div>
            <LikeDislikePanel likes={countLike} dislikes={countDislike} />

            <div className={styles.channel_picture}>
              <ProfilePicture
                src={`http://localhost:5000${channelAvatar}`}
                alt="profile_img"
                width="60"
                height="60"
              />
            </div>
            <div className={styles.channel_info}>
              <h3 className={styles.channel_name}>{channelName}</h3>
              <p className={styles.count_subs}>
                {pageLoading ? "" : `${countSubs} subs.`}
              </p>
            </div>
            {store.user.login == channelName || pageLoading ? (
              <></>
            ) : (
              <div className={styles.subscribe_button}>
                <Main_Button>Подписаться</Main_Button>
              </div>
            )}
          </div>
          <div className={styles.video_description}>
            <h3>Описание видео:</h3>
            <p>{videoDescription}</p>
            <h3 style={{ marginTop: "5px" }}>Категория: {videoSubject}</h3>
          </div>
        </>
      )}
    </div>
  );
});

export default WatchVideo;
