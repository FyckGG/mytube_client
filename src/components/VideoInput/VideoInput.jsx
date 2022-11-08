import React from "react";
import styles from "./VideoInput.module.css";
import is_video_check from "../../formatCheck/isVideoCheck";

const VideoInput = (props) => {
  const { height, width } = props;
  const inputRef = React.useRef();
  const [source, setSource] = React.useState();
  const [drop, setDrop] = React.useState(false);
  const [error, setError] = React.useState("");
  const fileReader = new FileReader();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };
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
    //console.log(e.dataTransfer);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      fileReader.readAsDataURL(file);
      const is_img = is_video_check(e.dataTransfer);
      if (!is_img) {
        setError("Недопустимое расширение файла.");
        setSource();
      } else {
        setError();
        fileReader.onloadend = () => {
          setSource(fileReader.result);
          // props.img_change(e.dataTransfer.files[0]);
          // console.log(imageURL);
        };
      }
    }
    //handleOnChange(e);
    setDrop(false);
  };
  return (
    <div>
      <label for="video_loader_button" className={styles.video_input_button}>
        Выбрать видео для загрузки
        <input
          type="file"
          id="video_loader_button"
          accept=".mov,.mp4"
          onChange={handleFileChange}
        />
      </label>

      <br />
      {!source ? (
        <div
          className={
            drop
              ? `${styles.video_input_empty_video} ${styles.video_input_empty_video_drop}`
              : styles.video_input_empty_video
          }
          style={{ width: "30%", height: height }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/4620/4620095.png"
            alt="upload_video"
            height="200px"
            width="200px"
            className={styles.video_icon}
            style={{ marginTop: height / 6 }}
            onDragEnter={dragStartHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragOverHandler}
            onDrop={dropHandler}
          />
        </div>
      ) : (
        <video
          className={styles.video_input_video}
          width="30%"
          height={height}
          controls
          src={source}
        />
      )}
    </div>
  );
};

export default VideoInput;
