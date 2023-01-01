import React from "react";
import styles from "./ChannelInformation.module.css";
import convertDate from "../../otherServices/convertDate";
import addSpaces from "../../otherServices/addSpaces";

const ChannelInformation = (props) => {
  return (
    <div className={styles.channel_info}>
      <h2>Описание канала</h2>
      <div className={styles.info_text}>
        <p className={styles.description}>Здесь могло быть ваше описание</p>
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
    </div>
  );
};

export default ChannelInformation;
