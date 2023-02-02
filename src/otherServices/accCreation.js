import { Context } from "..";
import { useContext } from "react";
import axios from "axios";
import React from "react";

async function AccCreation(email, login, password, imgProfile) {
  const store = useContext(Context);

  const uploading_avatar = new FormData();

  const response = await store.registration(email, login, password);

  const create_dir_response = await axios.post(
    `${process.env.REACT_APP_API_URL}/users-data/create-dir`,
    { id: response.data.user.id }
  );
  const create_dir_avatar_response = await axios.post(
    `${process.env.REACT_APP_API_URL}/users-data/create-dir-avatar`,
    { id: response.data.user.id }
  );
  uploading_avatar.append("id", response.data.user.id);
  if (imgProfile != null) {
    uploading_avatar.append("avatar", imgProfile);
    var avatar_response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users-data/upload-avatar`,
      uploading_avatar,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } else {
    var avatar_response = await axios.post(
      `${process.env.REACT_APP_API_URL}/users-data/add-defaut-avatar`,
      {
        id: response.data.user.id,
      }
    );
  }

  await axios.post(
    `${process.env.REACT_APP_API_URL}/users-data/save-avatar-info`,
    {
      id: response.data.user.id,
      avatar_name: avatar_response.data.avatar_name,
      avatar_dir: create_dir_avatar_response.data.avatar_path,
    }
  );

  return "Регистрация прошла успешно";
}

export default AccCreation;
