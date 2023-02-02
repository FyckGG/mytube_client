import React from "react";
import styles from "./PostCommentForm.module.css";

const PostCommentForm = (props) => {
  const handlePostFormChange = () => {
    props.on_cancel();
  };

  const handleCommentTextChange = (e) => {
    props.on_comment(e.target.value);
  };

  const sendComment = () => {
    props.on_send();
  };
  return (
    <div className={styles.post_form}>
      <div className={styles.post_pole}>
        <textarea
          maxLength={2000}
          rows="3"
          cols="60"
          name="text"
          className={styles.text_area}
          onChange={handleCommentTextChange}
        ></textarea>
      </div>
      <div className={styles.form_buttons}>
        <button className={styles.cancel} onClick={handlePostFormChange}>
          Отмена
        </button>
        <button className={styles.send} onClick={sendComment}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default PostCommentForm;
