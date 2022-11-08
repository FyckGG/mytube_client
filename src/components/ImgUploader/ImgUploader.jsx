import React from "react";
import styles from "./ImgUploader.module.css";
import { useState, useEffect } from "react";
import ProfilePicture from "../UI/ProfilePicture/ProfilePicture";
import is_img_check from "../../formatCheck/isImgCheck";

const ImgUploader = (props) => {
  const [imageURL, setImageURL] = useState();
  const [fileStatus, setFileStatus] = useState();
  const [drop, setDrop] = useState(false);
  const fileReader = new FileReader();

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrop(true);
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrop(false);
  };
  const dragOverHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const dropHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      fileReader.readAsDataURL(file);
      const is_img = is_img_check(e.dataTransfer);
      if (!is_img) {
        setFileStatus("Недопустимое расширение файла.");
        setImageURL();
      } else {
        setFileStatus();
        fileReader.onloadend = () => {
          setImageURL(fileReader.result);
          props.img_change(e.dataTransfer.files[0]);
          console.log(imageURL);
        };
      }
    }
    handleOnChange(e);
    setDrop(false);
  };

  const handleOnChange = (e) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      fileReader.readAsDataURL(file);
      const is_img = is_img_check(e.target);
      if (!is_img) {
        setFileStatus("Недопустимое расширение файла.");
        setImageURL();
      } else {
        setFileStatus();
        fileReader.onloadend = () => {
          setImageURL(fileReader.result);
          props.img_change(e.target.files[0]);
          console.log(imageURL);
        };
      }
    }
  };
  useEffect(() => {
    if (!props.is_parent_active) {
      setImageURL();
      setFileStatus();
    }
  }, [props.is_parent_active]);
  return (
    <form className={styles.img_upload_form}>
      <label for="file-loader-button" className={styles.custom_file_upload}>
        {props.button_text}
        <input
          id="file-loader-button"
          type="file"
          className={styles.upload_file_button}
          onChange={handleOnChange}
        />
      </label>
      <br />

      <img
        className={
          drop
            ? `${styles.upload_photo} ${styles.upload_photo_drop}`
            : styles.upload_photo
        }
        onDragEnter={dragStartHandler}
        onDragLeave={dragLeaveHandler}
        onDragOver={dragOverHandler}
        onDrop={dropHandler}
        src={imageURL ? imageURL : props.default_img}
        alt="no-photo"
        width={props.width}
        height={props.height}
      />

      <div className={fileStatus ? styles.img_status : ""}>{fileStatus}</div>
    </form>
  );
};

export default ImgUploader;
