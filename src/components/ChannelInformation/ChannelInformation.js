import React from "react";
import styles from "./ChannelInformation.module.css";
import convertDate from "../../otherServices/convertDate";
import addSpaces from "../../otherServices/addSpaces";
import { Donut_2 } from "../UI/Donut_2/Donut_2";

const ChannelInformation = (props) => {
  console.log("views " + props.count_views);
  return (
    <div className={styles.channel_info}>
      {props.reg_date == "" || props.count_views == "" ? (
        <Donut_2 />
      ) : (
        <>
          <h2>Описание канала</h2>
          <div className={styles.info_text}>
            <p className={styles.description}>Описание отсутствует</p>
            <div className={styles.channel_stats}>
              <div className={styles.channel_stats_item}>
                Дата регистрации: {convertDate(props.reg_date)}
              </div>
              <div
                className={styles.channel_stats_item}
                style={{ marginTop: "5px" }}
              >
                Кол-во просмотров: {addSpaces(props.count_views)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ChannelInformation;
