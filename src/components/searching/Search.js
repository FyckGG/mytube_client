import React from "react";
import styles from "./Search.module.css";
import { useMediaQuery } from "react-responsive";
import Main_Button from "../UI/main_button/Main_Button";

export default function Search() {
  return (
    <form className={styles.search}>
      <input type="text" placeholder="Search"></input>

      <Main_Button>Find</Main_Button>
    </form>
  );
}
