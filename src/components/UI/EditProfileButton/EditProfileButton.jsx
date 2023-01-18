import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import styles from "./EditProfileButton.module.css";

const EditProfileButton = () => {
  return (
    <div className={styles.edit_profile_button}>
      <div className={styles.button_insc}>Редактировать профиль</div>
      <FontAwesomeIcon icon={faPen} size="lg" className={styles.button_icon} />
    </div>
  );
};

export default EditProfileButton;
