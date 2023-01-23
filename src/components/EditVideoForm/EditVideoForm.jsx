import React from "react";
import { useSearchParams } from "react-router-dom";
import EditForm from "../UI/EditForm/EditForm";
import { observer } from "mobx-react-lite";
import styles from "./EditVideoForm.module.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import userActions from "../../userActions/userActions";
import Donut from "../UI/Donut/Donut";

export const EditVideoForm = observer((props) => {
  const navigate = useNavigate();
  const [videoDescription, setVideoDescription] = React.useState(
    props.default_description
  );
  const store = React.useContext(Context);
  const [videoName, setVideoName] = React.useState(props.default_name);
  const [videoAccess, setVideoAccess] = React.useState(props.default_access);
  const [error, setError] = React.useState("");
  const [isSendingData, setIsSendingData] = React.useState(false);
  const [isDeletingVideo, setIsDeletingVideo] = React.useState(false);
  // const [videoSubject, setVideoSubject] = React.useState(props.default_subject);

  const delete_video = async () => {
    setIsDeletingVideo(true);
    const result = await userActions.deleteVideo(props.video_id);
    navigate(`/profile/${store.user.id}`);
    //638494a1fe301e648c2bb148
  };

  const changeVideo = async (e) => {
    e.preventDefault();
    if (videoName == "" || videoDescription == "") {
      setError("При изменении видео не должно быть пустых строк.");
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
    navigate(`/profile/${store.user.id}`);
  };

  React.useEffect(() => {
    setVideoName(props.default_name);
    setVideoDescription(props.default_description);
    setVideoAccess(props.default_access);
    // setVideoSubject(props.default_subject);
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
