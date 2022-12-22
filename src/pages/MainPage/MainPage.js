import React from "react";
import styles from "./MainPage.module.css";
import VideoMin from "../../components/UI/VideoMin/VideoMin";
import { Link } from "react-router-dom";

const MainPage = () => {
  const arr = [1, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 1, 1];
  return (
    <div className={styles.main_page}>
      {arr.map(() => (
        <div className={styles.video_min}>
          <Link
            to={
              "/watch_video?v=638494a1fe301e648c2bb148&u=63779401330ba70b9cc7dd97"
            }
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <VideoMin />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MainPage;
