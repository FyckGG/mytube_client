import { hover } from "@testing-library/user-event/dist/hover";
import React from "react";
import { useState, useContext } from "react";
import { useEffect } from "react";
import Modal_Win from "../UI/Modal_Win/Modal_Win";
import styles from "./Sign.module.css";
import validator from "validator";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import ImgUploader from "./../ImgUploader/ImgUploader";
import empty_photo from "./../../imgs/empty_photo.jpg";

import axios from "axios";

function Sign({ modalActive, setModalActive, onSign }) {
  var regLogin = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i;

  function check_on_correct() {
    if (
      errorEmail == "" &&
      errorLogin == "" &&
      errorPassword == "" &&
      errorRepassword == "" &&
      email != "" &&
      login != "" &&
      password != "" &&
      repassword != ""
    )
      return true;
    else return false;
  }

  async function sendingData(e) {
    try {
      setServerResponse("");
      e.preventDefault();

      setIsSendingData(true);

      const uploading_avatar = new FormData();

      const response = await store.registration(email, login, password);

      const create_dir_response = await axios.post(
        "http://localhost:5000/users-data-creation/create-dir",
        { id: response.data.user.id }
      );
      console.log(response);
      const create_dir_avatar_response = await axios.post(
        "http://localhost:5000/users-data-creation/create-dir-avatar",
        { id: response.data.user.id }
      );
      console.log(create_dir_avatar_response);
      uploading_avatar.append("id", response.data.user.id);
      if (imgProfile != null) {
        uploading_avatar.append("avatar", imgProfile);
        var avatar_response = await axios.post(
          "http://localhost:5000/users-data-creation/upload-avatar",
          uploading_avatar,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        var avatar_response = await axios.post(
          "http://localhost:5000/users-data-creation/add-defaut-avatar",
          {
            id: response.data.user.id,
          }
        );
      }

      await axios.post(
        "http://localhost:5000/users-data-creation/save-avatar-info",
        {
          id: response.data.user.id,
          avatar_name: avatar_response.data.avatar_name,
          avatar_dir: create_dir_avatar_response.data.avatar_path,
        }
      );

      setIsSendingData(false);
      setModalActive(false);
      alert(
        "Регистрация прошла успешно. Для подтверждения аккаунта перейдите по ссылке, присланной на Вашу электронную почту."
      );
    } catch (e) {
      setServerResponse(e);
      setIsSendingData(false);
    }
  }

  const handleImgChange = (e) => {
    setImgProfile(e);
  };

  const store = useContext(Context);

  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRepassword, setErrorRepassword] = useState("");
  const [imgProfile, setImgProfile] = useState(null);
  const [isSendingData, setIsSendingData] = useState(false);
  const [serverResponce, setServerResponse] = useState("");

  useEffect(() => {
    setEmail("");
    setErrorEmail("");
    setLogin("");
    setErrorLogin("");
    setPassword("");
    setErrorPassword("");
    setRepassword("");
    setErrorRepassword("");
    setServerResponse("");
    setImgProfile(null);
  }, [modalActive]);

  return (
    <Modal_Win active={modalActive} setActive={setModalActive}>
      <h1 style={{ padding: "15px", color: "#f3f47b" }}>Registration</h1>
      <hr />

      <div className={styles.sign_panel}>
        <form className={styles.form_reg} onSubmit={sendingData}>
          <label for="email">
            E-mail
            <br />
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (!validator.isEmail(e.target.value))
                  setErrorEmail("Некорректный e-mail");
                else setErrorEmail("");
              }}
            ></input>
          </label>
          <p className={styles.bad_input}>{errorEmail}</p>
          <br />
          <label for="login_s">
            Login
            <br />
            <input
              type="text"
              id="login_s"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                if (!regLogin.test(e.target.value))
                  setErrorLogin("Некорректный логин");
                else setErrorLogin("");
              }}
            ></input>
          </label>
          <p className={styles.bad_input}>{errorLogin}</p>
          <br />
          <label for="pas_1">
            Password
            <br />
            <input
              type="password"
              id="pas_s_1"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                if (
                  !validator.isStrongPassword(e.target.value, [
                    { minLowercase: 1 },
                  ])
                )
                  setErrorPassword("Некорректный пароль");
                else setErrorPassword("");
                if (e.target.value != repassword)
                  setErrorRepassword("Пароли не совпадают");
                else setErrorRepassword("");
              }}
            ></input>
          </label>
          <p className={styles.bad_input}>{errorPassword}</p>
          <br />
          <label for="pas_2">
            Repeat the password
            <br />
            <input
              type="password"
              id="pas_s_2"
              value={repassword}
              onChange={(e) => {
                setRepassword(e.target.value);
                if (e.target.value != password)
                  setErrorRepassword("Пароли не совпадают");
                else setErrorRepassword("");
              }}
            ></input>
          </label>
          <p className={styles.bad_input}>{errorRepassword}</p>
          <br />
          {isSendingData ? (
            <div className={styles.load_panel}>
              <div
                style={{
                  display: "inline-block",
                  color: "#f3f47b",
                  fontSize: "15px",
                  fontWeight: "bold",
                  margin: "auto",
                }}
              >
                Отправка данных
              </div>
              <div class={styles.donut}></div>{" "}
            </div>
          ) : (
            <input
              className={
                check_on_correct()
                  ? styles.create_acc
                  : styles.create_acc_disabled
              }
              type="submit"
              value="Create a new account"
              disabled={!check_on_correct()}
            ></input>
          )}

          <p className={styles.bad_input}>{serverResponce}</p>
        </form>
        <div className={styles.img_upload}>
          <ImgUploader
            default_img="https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png"
            is_parent_active={modalActive}
            img_change={handleImgChange}
            button_text="Выберите аватар"
            height="150px"
            width="150px"
          />
        </div>
      </div>
    </Modal_Win>
  );
}

export default observer(Sign);
