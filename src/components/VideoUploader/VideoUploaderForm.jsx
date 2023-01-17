import React from "react";
import styles from "./VideoUploaderForm.module.css";
import VideoInput from "../VideoInput/VideoInput";
import axios from "axios";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";
import Donut from "../UI/Donut/Donut";
import userActions from "../../userActions/userActions";

const VideoUploader = () => {
  const fileReader = new FileReader();

  const [videoName, setVideoName] = React.useState("");
  const [videoDescription, setVideoDescription] = React.useState("");
  const [isPublic, setIsPublic] = React.useState(true);
  const [videoSubject, setVideoSubject] = React.useState("");
  const [videoForUpload, setVideoForUpload] = React.useState("");
  const [videoDuration, setVideoDuration] = React.useState(0);
  const [isVideoSending, setIsvideoSending] = React.useState(false);
  const store = React.useContext(Context);
  const navigate = useNavigate();

  const is_full_video_data = () => {
    if (
      videoName !== "" &&
      videoDescription !== "" &&
      videoSubject !== "" &&
      videoForUpload !== ""
    )
      return true;
    else return false;
  };

  const handleVideoChange = (e) => {
    setVideoForUpload(e);
    fileReader.readAsDataURL(e);
    fileReader.onloadend = () => {
      const media = new Audio(fileReader.result);
      media.onloadedmetadata = () => {
        setVideoDuration(media.duration);
      };
    };
  };

  const handlePublicChange = (e) => {
    if (e.target.value === "0") setIsPublic(true);
    else setIsPublic(false);
  };

  const handleSubjectChange = (e) => {
    setVideoSubject(e.target.value);
  };

  async function upload_video(e) {
    setIsvideoSending(true);
    e.preventDefault();

    const uploading_video = new FormData();
    uploading_video.append("id", store.user.id);
    uploading_video.append("video", videoForUpload);

    const upload_responce = await userActions.uploadVideo(uploading_video);
    console.log(upload_responce);

    const db_responce = await axios.post(
      "http://localhost:5000/user-action/add-video",
      {
        userId: store.user.id,
        name: videoName,
        path: `/usersData/${store.user.id}/videos/${upload_responce.data.video_name}`,
        description: videoDescription,
        is_public: isPublic,
        subject: videoSubject,
        duration: videoDuration,
      }
    );

    const thumbnail_responce = await axios.post(
      "http://localhost:5000/user-action/create-video-thumbnail",
      {
        videoId: db_responce.data._id,
        video_dir: `/../usersData/${store.user.id}/videos/${upload_responce.data.video_name}`,
        thumbnail_dir: `/../usersData/${store.user.id}/videos_thumbnails`,
        thumbnail_name: upload_responce.data.video_name.substring(
          0,
          upload_responce.data.video_name.indexOf(".")
        ),
      }
    );

    if (db_responce.status === 200) {
      alert("Видео успешно загружено.");
      navigate(`/profile/${store.user.id}`);
    }
  }
  return (
    <div className={styles.video_uploader}>
      <form className={styles.video_uploader_form} onSubmit={upload_video}>
        <VideoInput height={300} width={400} video_change={handleVideoChange} />
        <br />
        <label for="video_name">
          Название видео:
          <input
            type="text"
            id="video_name"
            value={videoName}
            onChange={(e) => {
              setVideoName(e.target.value);
            }}
          />
        </label>
        <label for="video_description">
          Описание видео:
          <textarea
            rows="3"
            cols="45"
            name="text"
            className={styles.video_description}
            value={videoDescription}
            onChange={(e) => {
              setVideoDescription(e.target.value);
            }}
          ></textarea>
        </label>
        <label>
          Тип доступа:
          <select onChange={handlePublicChange}>
            <option value="0">Публичный</option>
            <option value="1">Приватный</option>
          </select>
        </label>
        <br />
        <label for="video">
          Тема видео:
          <select onChange={handleSubjectChange}>
            <option selected disabled>
              Выберите тему
            </option>
            <option value="Фильмы/сериалы">Фильмы/сериалы</option>
            <option value="Мультфилмы/анимация">Мультфилмы/анимация</option>
            <option value="Музыка">Музыка</option>
            <option value="Видеоигры">Видеоигры</option>
            <option value="Спорт">Спорт</option>
            <option value="Активынй отдых">Активынй отдых</option>
            <option value="Наука/технологии">Наука/технологии</option>
            <option value="Экономика">Экономика</option>
            <option value="Политика">Политика</option>
          </select>
        </label>
        <div style={{ textAlign: "center" }}>
          {isVideoSending ? (
            <div className={styles.donut_panel}>
              <Donut
                donut_name={"Загрузка видео на сервер"}
                donut_name_size={"17px"}
                donut_color={"#f3f47b"}
                donut_size={"40px"}
              />
            </div>
          ) : (
            <input
              type="submit"
              id="uploading"
              value="Загрузить"
              className={
                is_full_video_data()
                  ? styles.send_video_button
                  : styles.send_video_button_disabled
              }
              disabled={!is_full_video_data()}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default VideoUploader;
