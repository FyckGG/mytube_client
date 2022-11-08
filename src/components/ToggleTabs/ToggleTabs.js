import React from "react";
import styles from "./ToggleTabs.module.css";
import MyTab from "../UI/MyTab/MyTab";
import { useState } from "react";

const ToggleTabs = (props) => {
  const [choisedMenu, setChoisedMenu] = useState(props.tab_items[0].tab_id);
  const arr = props.tab_items;
  const first_item = arr[0];
  const [tabsActive, setTabsActive] = useState(
    arr.map((item) => (item = item == first_item ? true : false))
  );

  return (
    <div className={styles.tab}>
      <div className={styles.tab_flip}>
        {arr.map((item) => (
          <MyTab
            tabname={item.tabname}
            tab_active={tabsActive[item.tab_id]}
            className={styles.tab_menu}
            tab_action={() => {
              setChoisedMenu(item.tab_id);
              const newTabsActive = [...tabsActive];
              for (let i = 0; i < newTabsActive.length; i++)
                newTabsActive[i] = false;
              newTabsActive[item.tab_id] = true;
              setTabsActive([...newTabsActive]);
            }}
          />
        ))}
      </div>

      {arr.map(
        (item) =>
          choisedMenu == arr[item.tab_id].tab_id && (
            <div id={`tab_menu_${item.tab_id}`} className={styles.tab_content}>
              {arr[item.tab_id].tab_content}
            </div>
          )
      )}
    </div>
  );
};

export default ToggleTabs;
