import React from "react";
import EditForm from "../UI/EditForm/EditForm";
import ImgUploader from "../ImgUploader/ImgUploader";
import { Donut_2 } from "../UI/Donut_2/Donut_2";
import styles from "./EditProfileForm.module.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import UserDataChange from "../../userDataChange/userDataChange";
import Donut from "../UI/Donut/Donut";
import { observer } from "mobx-react-lite";

export const EditProfileForm = observer((props) => {
  const store = React.useContext(Context);
  const navigate = useNavigate();
  const [imgProfile, setImgProfile] = React.useState(null);
  const [description, setDescription] = React.useState(
    props.default_description
  );
  const [isSendingData, setIsSendingData] = React.useState(false);
  const [isDeletingUser, setIsDeletingUser] = React.useState(false);
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    setDescription(props.default_description);
  }, [props.is_loading]);
  const handleImgChange = (e) => {
    setImgProfile(e);
  };

  const editProfile = async (e) => {
    e.preventDefault();

    if (description == "") {
      setError("Необходимо заполнить все строки");
      return;
    }
    setError("");
    setIsSendingData(true);
    if (imgProfile !== null) {
      const new_avatar = new FormData();
      new_avatar.append("id", store.user.id);
      new_avatar.append("avatar", imgProfile);

      const new_avatar_responce = await UserDataChange.change_avatar(
        new_avatar
      );
    }

    const edit_channel_description =
      await UserDataChange.change_channel_description(
        store.user.id,
        description
      );
    setIsSendingData(false);
    navigate(`/profile/${store.user.id}`);
  };

  const delete_profile = async () => {
    setIsDeletingUser(true);
    await store.deleteAccount();
    alert("Ваш аккаунт успешно удалён.");
    navigate(`/`);
  };

  return (
    <EditForm>
      {props.is_loading ? (
        <Donut_2 />
      ) : (
        <>
          <h1>Редактировать профиль:</h1>
          <form onSubmit={editProfile}>
            <label>
              <div className={styles.img_uploader}>
                <ImgUploader
                  default_img={props.default_profile}
                  img_change={handleImgChange}
                  button_text="Сменить аватар"
                  height="150px"
                  width="150px"
                />
              </div>
            </label>
            <label>
              Описание канала:
              <textarea
                className={styles.textarea}
                maxLength={300}
                rows="3"
                cols="45"
                name="text"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </label>
            <div className={styles.error_message}>{error}</div>
            {isSendingData | isDeletingUser ? (
              <div style={{ display: "inline-block" }}>
                <Donut
                  donut_name={
                    isSendingData ? "Сохранение изменений" : "Удаление аккаунта"
                  }
                  donut_name_size={"20px"}
                  donut_color={"#f3f47b"}
                  donut_size={"40px"}
                />
              </div>
            ) : (
              <>
                <input
                  className={`${styles.finish_button} ${styles.save_button}`}
                  type={"submit"}
                  value={"Сохранить изменения"}
                />
                <input
                  className={`${styles.finish_button} ${styles.cancel_button}`}
                  type={"button"}
                  value={"Отменить"}
                  onClick={() => {
                    navigate(`/profile/${store.user.id}`);
                  }}
                />
                <br />
                <input
                  onClick={() => {
                    delete_profile(store.user.id);
                  }}
                  className={`${styles.delete_button} ${styles.finish_button}`}
                  type={"button"}
                  value={"Удалить аккаунт"}
                />
              </>
            )}
          </form>
        </>
      )}
    </EditForm>
  );
});
