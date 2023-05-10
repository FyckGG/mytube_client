import React from "react";
import Modal_Win from "../UI/Modal_Win/Modal_Win";
import { Donut_2 } from "components/UI/Donut_2/Donut_2";
import userActions from "userActions/userActions";

import styles from "./ComplaintForm.module.css";

const ComplaintForm = (props) => {
  async function sendComplaint(e) {
    e.preventDefault();
    setIsComplaintSending(true);
    if (props.target_type == "user")
      await userActions.sendComplaint(
        props.user_id,
        props.target_id,
        complaint
      );
    else
      await userActions.sendVideoComplaint(
        props.user_id,
        props.target_id,
        complaint
      );
    alert(
      "Жалоба получена. После её рассмотрения мы отправим письмо на Вашу почту"
    );
    setIsComplaintSending(false);
    setComplaint("");
    props.hide_form();
  }

  const [complaint, setComplaint] = React.useState("");
  const [isComplaintSending, setIsComplaintSending] = React.useState(false);

  return (
    <Modal_Win active={props.modal_active} setActive={props.set_modal_active}>
      <div className={styles.complaint}>
        <h1 style={{ padding: "15px", color: "#f3f47b" }}>
          Форма для отправки жалобы
        </h1>
        <form className={styles.complaint_form} onSubmit={sendComplaint}>
          <label for="complaint">
            <div style={{ color: "#f3f47b" }}>
              {props.target_type == "user"
                ? "Укажите причину жалобы на пользователя"
                : "Укажите причину жалобы на видео"}
            </div>

            <br />
            <textarea
              id="complaint"
              className={styles.complaint_text}
              maxLength={1000}
              rows="10"
              cols="105"
              name="text"
              value={complaint}
              onChange={(e) => {
                setComplaint(e.target.value);
              }}
            ></textarea>
          </label>
          <br />
          {isComplaintSending ? (
            <Donut_2 />
          ) : (
            <input type={"submit"} id={"save_changes"} value={"Пожаловаться"} />
          )}
        </form>
      </div>
    </Modal_Win>
  );
};

export default ComplaintForm;
