import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./LikeDislikePanel.module.css";

const LikeDislikePanel = () => {
  return (
    <div className={styles.like_dislike}>
      <div
        className={styles.like_dislike_button}
        style={{ borderRadius: "5px 0 0 5px" }}
      >
        <FontAwesomeIcon
          icon={faThumbsUp}
          size="xl"
          style={{ marginRight: "5px" }}
        />
        <p>228 тыс.</p>
      </div>
      <div
        className={styles.like_dislike_button}
        style={{ borderRadius: "0 5px 5px 0" }}
      >
        <FontAwesomeIcon
          icon={faThumbsDown}
          size="xl"
          style={{ marginRight: "5px" }}
        />
        <p>9</p>
      </div>
    </div>
  );
};

export default LikeDislikePanel;
