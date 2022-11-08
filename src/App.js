import React from "react";
import styles from "./App.module.css";
import Login from "./components/Login/Login";
import Sign from "./components/Sign/Sign";
import { useState, useRef, useEffect, useContext } from "react";
import Navbar from "./components/navbar/Navbar";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import list from "./imgs/list1.png";
import cross from "./imgs/cross.png";
import AccOptions from "./components/AccOptions/AccOptions";
import { Route, Routes, Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons"; //// Здесь по хорошему сделать библиотеку как советовалось в статейке
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faListSquares } from "@fortawesome/free-solid-svg-icons";
import { faClockFour } from "@fortawesome/free-solid-svg-icons";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import UserProfile from "./pages/UserProfile/UserProfile";
import MainPage from "./pages/MainPage/MainPage";
import UserLikes from "./pages/UserLikes/UserLikes";
import UserPlaylists from "./pages/UserPlaylists/UserPlaylists";
import UserSubscriptions from "./pages/UserSubscriptions/UserSubscriptions";
import UploadVideo from "./pages/UploadVideo/UploadVideo";
import { Context } from ".";

function App() {
  const nodeRef = useRef(null);
  const store = useContext(Context);

  const items_acc_menu = [
    {
      href: "/profile",
      value: "Мой профиль",
      icon: faUser,
    },
    {
      href: "/subscriptions",
      value: "Мои подписки",
      icon: faListSquares,
    },
    {
      href: "/liked_videos",
      value: "Понравившиеся видео",
      icon: faThumbsUp,
    },
    {
      href: "/watch_later",
      value: "Смотреть позже",
      icon: faClockFour,
    },
    {
      href: "/playlisis",
      value: "Плейлисты",
      icon: faFilm,
    },
    {
      href: "/",
      value: "Покинуть аккаунт",
      icon: faDoorOpen,
      action: () => {
        //console.log("ggf");
        store.logout();
        setOptionsActive(false);
      },
    },
  ];

  const iteeems = [
    {
      href: "dcld,cdlc,dlcdlcdc",
      value: "vfvfvfvfv",
    },
    { href: "frefsfmskfsfsfsfsf", value: "mkvmkvmfkvmk" },
    { href: "fr", value: "yo mr white" },
  ];
  const [signActive, setSignActive] = useState(false);
  const [loginActive, setLoginActive] = useState(false);
  const [burgerActive, setBurgerActive] = useState(false);
  const [openList, setOpenList] = useState(list);
  const [isLogUser, setIsLogUser] = useState(false);
  const [optionsActive, setOptionsActive] = useState(false);

  const handleLogChange = () => {
    isLogUser ? setIsLogUser(false) : setIsLogUser(true);
  };

  const accOptionRef = useRef(null);
  const accOptionButtonRef = useRef(null);

  useEffect(() => {
    if (!optionsActive) return;
    const handleClick = (e) => {
      if (!accOptionRef.current) return;
      if (
        !accOptionRef.current.contains(e.target) &&
        !accOptionButtonRef.current.contains(e.target)
      ) {
        setOptionsActive(false);
        console.log("gbgb");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [optionsActive, setOptionsActive]);

  return (
    <div>
      <Navbar
        is_log={isLogUser}
        sign_in={() => setSignActive(true)}
        log_in={() => setLoginActive(true)}
        open_options={() => {
          if (optionsActive) {
            setOptionsActive(false);
          } else {
            setOptionsActive(true);
          }
        }}
        burger_action={() => {
          if (burgerActive) {
            setOpenList(list);
            setBurgerActive(false);
          } else {
            setOpenList(cross);
            setBurgerActive(true);
          }
        }}
        list_icon={openList}
        acc_button_ref={accOptionButtonRef}
      />
      <Sign
        modalActive={signActive}
        setModalActive={setSignActive}
        onSign={handleLogChange}
      ></Sign>
      <Login
        modalActive={loginActive}
        setModalActive={setLoginActive}
        onLog={handleLogChange}
      ></Login>
      <div className={styles.page_content}>
        <AccOptions
          items={items_acc_menu}
          acc_ref={accOptionRef}
          header="Параметры аккаунта"
          optionsActive={optionsActive}
        />

        <BurgerMenu
          active={burgerActive}
          setActive={setBurgerActive}
          items={iteeems}
          header="Навигация"
        />

        <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/subscriptions" element={<UserSubscriptions />} />
          <Route path="/liked_videos" element={<UserLikes />} />
          <Route path="/watch_later" element={<UserPlaylists />} />
          <Route path="/playlisis" element={<UserPlaylists />} />
          <Route path="/upload_video" element={<UploadVideo />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
