import React from "react";
import styles from "./EditForm.module.css";

const EditForm = (props) => {
  return <div className={styles.edit_video_form}>{props.children}</div>;
};

export default EditForm;
