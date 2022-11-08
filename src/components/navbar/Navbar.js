import React from "react";
import { ReactDOM } from "react";
import Search from "../searching/Search";
import Main_Button from "../UI/main_button/Main_Button";
import Icon from "../UI/Icon/Icon";
import { Context } from "../..";
import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import styles from "./Navbar.module.css";

const Navbar = observer((props) => {
  const is_log = props.is_log;
  const store = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  return (
    <>
      <div className={styles.navbar}>
        {store.isLoading ? (
          <h2 className={styles.loading}>Loading...</h2>
        ) : (
          <ul>
            <li style={{ float: "left" }}>
              <Main_Button>Main Page</Main_Button>
            </li>
            <li style={{ float: "left" }}>
              <Icon
                src={props.list_icon}
                action={props.burger_action}
                alt="GG"
                height={"25px"}
                width={"25px"}
              />
            </li>
            <li>
              <Search />
            </li>
            {store.isAuth ? (
              <li style={{ float: "right" }} ref={props.acc_button_ref}>
                <Main_Button button_action={props.open_options}>
                  Account
                </Main_Button>
              </li>
            ) : (
              <>
                <li style={{ float: "right" }}>
                  <Main_Button button_action={props.log_in}>Log in</Main_Button>
                </li>
                <li style={{ float: "right", paddingRight: "15px" }}>
                  <Main_Button button_action={props.sign_in}>
                    Sign in
                  </Main_Button>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </>
  );
});

export default Navbar;
