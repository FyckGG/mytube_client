import React from "react";
import EditForm from "../UI/EditForm/EditForm";
import validator from "validator";
import styles from "./ResetPasswordForm.module.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Donut from "../UI/Donut/Donut";
import axios from "axios";

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [passwordStatus, setPasswordStatus] = React.useState({});
  const [repeatPasswordStatus, setRepeatPasswordStatus] = React.useState({});
  const [isSendingData, setIsSendingData] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const handlePasswordChange = async (e) => {
    setPassword(e.target.value);
    if (e.target.value == "") setPasswordStatus({ is_good: false, text: "" });
    else if (validator.isStrongPassword(e.target.value, [{ minLowercase: 1 }]))
      setPasswordStatus({ is_good: true, text: "Пароль надежен" });
    else setPasswordStatus({ is_good: false, text: "Пароль ненадежен" });
    if (e.target.value !== repeatPassword && repeatPassword !== "")
      setRepeatPasswordStatus({ is_good: false, text: "Пароли не совпадают" });
    else if (repeatPassword !== "")
      setRepeatPasswordStatus({ is_good: true, text: "Пароли совпадают" });
  };
  const handleRepeatPasswordChange = async (e) => {
    setRepeatPassword(e.target.value);
    if (e.target.value == "")
      setRepeatPasswordStatus({ is_good: false, text: "" });
    else if (e.target.value !== password)
      setRepeatPasswordStatus({ is_good: false, text: "Пароли не совпадают" });
    else setRepeatPasswordStatus({ is_good: true, text: "Пароли совпадают" });
  };
  const resetPassword = async (e) => {
    e.preventDefault();
    setIsSendingData(true);
    await axios
      .post("http://localhost:5000/users/reset-password", {
        user_id: searchParams.get("id"),
        token: searchParams.get("token"),
        password: repeatPassword,
      })
      .then((res) => {
        alert(
          "Пароль успешно изменен. На почту отправлено письмо об успешном завершении операции."
        );
      })
      .catch((err) => {
        console.log(err);
        alert("При изменении пароля произошла ошибка");
      });
    setIsSendingData(false);
    navigate(`/`);
  };

  return (
    <div className={styles.reset_password_form}>
      <EditForm>
        <form onSubmit={resetPassword}>
          <label>
            <div className={styles.input_header}>Новый пароль:</div>
            <div
              className={
                passwordStatus.is_good
                  ? `${styles.input_status} ${styles.input_status_good}`
                  : `${styles.input_status} ${styles.input_status_bad}`
              }
            >
              {passwordStatus.text}
            </div>
            <input
              type={"password"}
              value={password}
              onChange={(e) => {
                handlePasswordChange(e);
              }}
            />
          </label>
          <br />
          <label>
            <div className={styles.input_header}>Повторите новый пароль:</div>
            <div
              className={
                repeatPasswordStatus.is_good
                  ? `${styles.input_status} ${styles.input_status_good}`
                  : `${styles.input_status} ${styles.input_status_bad}`
              }
            >
              {repeatPasswordStatus.text}
            </div>
            <input
              type={"password"}
              value={repeatPassword}
              onChange={(e) => handleRepeatPasswordChange(e)}
            />
          </label>
          {isSendingData ? (
            <div style={{ display: "inline-block" }}>
              <Donut
                donut_name={"Изменение пароля"}
                donut_name_size={"20px"}
                donut_color={"#f3f47b"}
                donut_size={"40px"}
              />
            </div>
          ) : (
            <input
              className={
                passwordStatus.is_good && repeatPasswordStatus.is_good
                  ? styles.submit_button
                  : styles.submit_button_disabled
              }
              type={"submit"}
              value={"Изменить пароль"}
              disabled={
                !(passwordStatus.is_good && repeatPasswordStatus.is_good)
              }
            />
          )}
        </form>
      </EditForm>
    </div>
  );
};
