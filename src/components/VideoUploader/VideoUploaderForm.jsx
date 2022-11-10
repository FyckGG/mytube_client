import React from "react";
import styles from "./VideoUploaderForm.module.css";
import VideoInput from "../VideoInput/VideoInput";
import axios from "axios";
import { Context } from "../..";

const VideoUploader = () => {
  const [videoName, setVideoName] = React.useState("");
  const [videoDescription, setVideoDescription] = React.useState("");
  const [isPublic, setIsPublic] = React.useState(true);
  const [videoSubject, setVideoSubject] = React.useState("");
  const [videoForUpload, setVideoForUpload] = React.useState("");
  const store = React.useContext(Context);

  const handleVideoChange = (e) => {
    setVideoForUpload(e);
  };

  const handlePublicChange = (e) => {
    if (e.target.value === "0") setIsPublic(true);
    else setIsPublic(false);
  };

  const handleSubjectChange = (e) => {
    console.log(e.target.value);
    setVideoSubject(e.target.value);
  };

  async function upload_video(e) {
    e.preventDefault();
    const uploading_video = new FormData();
    uploading_video.append("id", store.user.id);
    uploading_video.append("video", videoForUpload);
    const upload_responce = await axios.post(
      "http://localhost:5000/user-action/upload-video",
      uploading_video,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(upload_responce.data.video_name);
    // const db_responce = await axios.post(
    //   "http://localhost:5000/user-action/add-video",
    //   {
    //     userId: store.user.id,
    //     name: videoName,
    //     path: "cococ",
    //     description: videoDescription,
    //     is_public: isPublic,
    //     subject: videoSubject,
    //   }
    // );
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
              console.log(e.target.value);
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
              console.log(e.target.value);
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
          <input
            type="submit"
            id="uploading"
            value="Загрузить"
            className={styles.send_video_button}
          />
        </div>
      </form>
    </div>
  );
};

export default VideoUploader;
