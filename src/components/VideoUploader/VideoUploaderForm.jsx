import React from "react";
import styles from "./VideoUploaderForm.module.css";
import VideoInput from "../VideoInput/VideoInput";

const VideoUploader = () => {
  return (
    <div className={styles.video_uploader}>
      <form className={styles.video_uploader_form}>
        <VideoInput height={300} width={400} />
        <br />
        <label for="video_name">
          Название видео:
          <input type="text" id="video_name" />
        </label>
        <label for="video_description">
          Описание видео:
          <textarea
            rows="3"
            cols="45"
            name="text"
            className={styles.video_description}
          ></textarea>
        </label>
        <label>
          Тип доступа:
          <select>
            <option value="0">Публичный</option>
            <option value="1">Приватный</option>
          </select>
        </label>
        <br />
        <label for="video">
          Тема видео:
          <select>
            <option selected disabled>
              Выберите тему
            </option>
            <option value="0">Фильмы/сериалы</option>
            <option value="1">Мультфилмы/анимация</option>
            <option value="2">Музыка</option>
            <option value="3">Видеоигры</option>
            <option value="4">Спорт</option>
            <option value="5">Активынй отдых</option>
            <option value="6">Наука/технологии</option>
            <option value="7">Экономика</option>
            <option value="8">Политика</option>
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
