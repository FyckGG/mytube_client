import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./LikeDislikePanel.module.css";

const LikeDislikePanel = (props) => {
  return (
    <div
      className={
        localStorage.getItem("token") == null
          ? `${styles.like_dislike} ${styles.like_dislike_unval}`
          : styles.like_dislike
      }
    >
      <div
        className={
          localStorage.getItem("token") == null
            ? `${styles.like_dislike_button} ${styles.like_dislike_button_unval}`
            : props.is_like_active
            ? styles.like_dislike_button_pressed
            : styles.like_dislike_button
        }
        style={{ borderRadius: "5px 0 0 5px" }}
        onClick={props.onLike}
      >
        <FontAwesomeIcon
          icon={faThumbsUp}
          size="xl"
          style={{ marginRight: "5px" }}
        />
        <p>{props.likes}</p>
      </div>
      <div
        className={
          localStorage.getItem("token") == null
            ? `${styles.like_dislike_button} ${styles.like_dislike_button_unval}`
            : props.is_dislike_active
            ? styles.like_dislike_button_pressed
            : styles.like_dislike_button
        }
        style={{ borderRadius: "0 5px 5px 0" }}
        onClick={props.onDislike}
      >
        <FontAwesomeIcon
          icon={faThumbsDown}
          size="xl"
          style={{ marginRight: "5px" }}
        />
        <p>{props.dislikes}</p>
      </div>
    </div>
  );
};

export default LikeDislikePanel;
