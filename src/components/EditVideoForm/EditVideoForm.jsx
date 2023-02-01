import React from "react";
import { useSearchParams } from "react-router-dom";
import EditForm from "../UI/EditForm/EditForm";
import { observer } from "mobx-react-lite";
import styles from "./EditVideoForm.module.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import userActions from "../../userActions/userActions";
import Donut from "../UI/Donut/Donut";
import { checkHashTags } from "../../otherServices/checkHashTags";

export const EditVideoForm = observer((props) => {
  const navigate = useNavigate();
  const [videoDescription, setVideoDescription] = React.useState(
    props.default_description
  );
  const store = React.useContext(Context);
  const [videoName, setVideoName] = React.useState(props.default_name);
  const [videoAccess, setVideoAccess] = React.useState(props.default_access);
  const [error, setError] = React.useState("");
  const [videoTags, setVideoTags] = React.useState("");
  const [isTagsCorrect, setIsTagsCorrect] = React.useState("");
  const [videoHashtags, setVideoHashtags] = React.useState("");
  const [isHashTagsCorrect, setIsHashTagsCorrect] = React.useState("");
  const [isSendingData, setIsSendingData] = React.useState(false);
  const [isDeletingVideo, setIsDeletingVideo] = React.useState(false);

  const delete_video = async () => {
    setIsDeletingVideo(true);
    const result = await userActions.deleteVideo(props.video_id);
    navigate(`/profile/${store.user.id}`);
  };

  const changeVideo = async (e) => {
    e.preventDefault();
    if (videoName == "" || videoDescription == "") {
      setError(
        "При изменении видео не должны быть пусты название и описание видео."
      );
      return;
    }
    const tags_arr = videoTags.split(" ");
    const hash_tags_arr = videoHashtags.split(" ");

    if (!checkHashTags(hash_tags_arr) && videoHashtags != "") {
      setError("В начале каждого хештега должен стоять символ #");
      return;
    }
    if (tags_arr.length > 10) {
      setError("Превышено максимальное число тегов");
      return;
    }
    if (hash_tags_arr.length > 3) {
      setError("Превышено максимальное число хештегов");
      return;
    }
    setError("");
    setIsSendingData(true);
    const edit_result = await userActions.editVideo(
      store.user.id,
      props.video_id,
      videoName,
      videoDescription,
      videoAccess
    );
    const edit_tags_result = await userActions.editTags(
      store.user.id,
      props.video_id,
      tags_arr,
      hash_tags_arr
    );
    navigate(`/profile/${store.user.id}`);
  };

  React.useEffect(() => {
    setVideoName(props.default_name);
    setVideoDescription(props.default_description);
    setVideoAccess(props.default_access);
    setVideoTags(props.tags.join(" "));
    setVideoHashtags(props.hash_tags.join(" "));
  }, [props.is_loading]);

  return (
    // <div className={styles.edit_video_form}>
    <EditForm>
      <div>
        <h1>Изменить данные видео:</h1>
        <form onSubmit={changeVideo}>
          <label for="video_name">
            Название видео:
            <input
              type={"text"}
              maxLength={100}
              value={videoName}
              onChange={(e) => {
                setVideoName(e.target.value);
              }}
            />
          </label>
          <br />
          <label for="video_description">
            Описание видео:
            <textarea
              maxLength={500}
              rows="3"
              cols="45"
              name="text"
              className={styles.video_description}
              value={videoDescription}
              onChange={(e) => {
                setVideoDescription(e.target.value);
              }}
            />
          </label>
          <br />
          <label for="video_tags">
            <div style={{ display: "inline-block" }}>
              Теги видео (макс: 10):
            </div>
            <div
              style={{
                display: "inline-block",
                marginLeft: "5px",
                color: "#9f1f35",
              }}
            >
              {isTagsCorrect}
            </div>
            <textarea
              maxLength={200}
              rows="3"
              cols="45"
              name="text"
              className={styles.textarea}
              value={videoTags}
              onChange={(e) => {
                setVideoTags(e.target.value);
              }}
            ></textarea>
          </label>
          <label for="video_hashtags">
            <div style={{ display: "inline-block" }}>
              Хештеги видео (макс: 3):
            </div>

            <div
              style={{
                display: "inline-block",
                marginLeft: "5px",
                color: "#9f1f35",
              }}
            >
              {isHashTagsCorrect}
            </div>

            <textarea
              maxLength={100}
              rows="3"
              cols="45"
              name="text"
              className={styles.textarea}
              value={videoHashtags}
              onChange={(e) => {
                setVideoHashtags(e.target.value);
              }}
            ></textarea>
          </label>
          <label>
            Тип доступа:
            <select
              defaultValue={videoAccess}
              value={videoAccess}
              onChange={(e) => {
                setVideoAccess(e.target.value);
              }}
            >
              <option value={true}>Публичный</option>
              <option value={false}>Приватный</option>
            </select>
          </label>
          <br />
          {/* <label>
              Тема видео:
              <select
                defaultValue={videoSubject}
                value={videoSubject}
                onChange={(e) => {
                  setVideoSubject(e.target.value);
                }}
              >
                <option value={"Фильмы/сериалы"}>Фильмы/сериалы</option>
                <option value={"Мультфилмы/анимация"}>
                  Мультфилмы/анимация
                </option>
                <option value={"Музыка"}>Музыка</option>
                <option value={"Видеоигры"}>Видеоигры</option>
                <option value={"Спорт"}>Спорт</option>
                <option value={"Активный отдых"}>Активный отдых</option>
                <option value={"Наука/технологиии"}>Наука/технологии</option>
                <option value={"Экономика"}>Экономика</option>
                <option value={"Политика"}>Политика</option>
              </select>
            </label> */}
          <div className={styles.error_message}>{error}</div>
          {isSendingData ? (
            <div style={{ display: "inline-block" }}>
              <Donut
                donut_name={"Сохранение изменений"}
                donut_name_size={"20px"}
                donut_color={"#f3f47b"}
                donut_size={"40px"}
              />
            </div>
          ) : isDeletingVideo ? (
            <div style={{ display: "inline-block" }}>
              <Donut
                donut_name={"Удаление видео"}
                donut_name_size={"20px"}
                donut_color={"#f3f47b"}
                donut_size={"40px"}
              />
            </div>
          ) : (
            <>
              <input
                className={`${styles.submit_button} ${styles.finish_button}`}
                type={"submit"}
                id={"save_changes"}
                value={"Сохранить изменения"}
              />
              <input
                className={`${styles.cancel_button} ${styles.finish_button}`}
                type={"button"}
                id={"cancel_changes"}
                value={"Отменить"}
                onClick={() => {
                  navigate(`/profile/${store.user.id}`);
                }}
              />
              <br />
              <input
                onClick={() => {
                  delete_video();
                }}
                className={`${styles.delete_button} ${styles.finish_button}`}
                type={"button"}
                value={"Удалить видео"}
              />
            </>
          )}
        </form>
      </div>
    </EditForm>
    // </div>
  );
});
