import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./LikeDislikePanel.module.css";

const LikeDislikePanel = (props) => {
  return (
    <div className={styles.like_dislike}>
      <div
        className={styles.like_dislike_button}
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
        className={styles.like_dislike_button}
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
