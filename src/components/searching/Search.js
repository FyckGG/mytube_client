import React from "react";
import styles from "./Search.module.css";
import { useMediaQuery } from "react-responsive";
import Main_Button from "../UI/main_button/Main_Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [stringSearch, setStringSearch] = React.useState(
    searchParams.get("params") ? searchParams.get("params") : ""
  );
  const [stringParams, setStringParams] = React.useState("");
  const navigate = useNavigate();

  return (
    <div className={styles.search}>
      <form>
        <input
          type="text"
          maxLength={50}
          value={stringSearch}
          onChange={(e) => {
            setStringSearch(e.target.value);
            const str_par_1 = e.target.value.replace(/ /g, "+");
            const str_par_2 = str_par_1.replace(/#/g, "%23");
            setStringParams(str_par_2);
          }}
          placeholder="Поиск"
        ></input>
      </form>
      {stringParams != "" ? (
        <Link to={`/search-results?params=${stringParams}&&page=0`}>
          <Main_Button>Найти</Main_Button>
        </Link>
      ) : (
        <Main_Button>Найти</Main_Button>
      )}
    </div>
  );
}
