import React from "react";
import { useState, useEffect, useContext } from "react";
import Modal_Win from "../UI/Modal_Win/Modal_Win";
import styles from "./Login.module.css";
import AuthServices from "../../services/authService";
import { Context } from "../..";
import { observer } from "mobx-react-lite";

function Login({ modalActive, setModalActive, onLog }) {
  const [login_email, setLogin_email] = useState("");
  const [password, setPassword] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const store = useContext(Context);

  async function autorization(e) {
    e.preventDefault();
    let server_message = "";
    let server_status = 0;

    try {
      const response = await store.autorization(login_email, password);
      console.log(store.user);
      setModalActive(false);
    } catch (e) {
      setResponseStatus(e);
    }
  }

  useEffect(() => {
    setLogin_email("");
    setPassword("");
    setResponseStatus("");
  }, [modalActive]);

  return (
    <Modal_Win active={modalActive} setActive={setModalActive}>
      <h1 style={{ padding: "15px", color: "#f3f47b" }}>Account login</h1>
      <hr />
      <form className={styles.form_sig} onSubmit={autorization}>
        <label for="login_l">
          Login or email
          <br />
          <input
            type="text"
            id="login_l"
            value={login_email}
            onChange={(e) => setLogin_email(e.target.value)}
          ></input>
        </label>
        <br />
        <label for="pas_l_1">
          Password
          <br />
          <input
            type="password"
            id="pas_l_1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <br />
        </label>

        <input
          style={{ cursor: "pointer" }}
          className={styles.create_acc}
          type="submit"
          value="Log in"
        ></input>
        <p className={styles.bad_input}>{responseStatus}</p>
      </form>
    </Modal_Win>
  );
}

export default observer(Login);
