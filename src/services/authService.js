import $api from "./../http/index";

export default class AuthServices {
  static autorization = async (login_email, password) => {
    return $api.post(`${process.env.REACT_APP_API_URL}/users/autorization`, {
      em_log: login_email,
      password: password,
    });
  };

  static registration = async (email, login, password, img_profile) => {
    return $api.post(`${process.env.REACT_APP_API_URL}/users/registration`, {
      email: email,
      login: login,
      password: password,
      img_profile: img_profile,
    });
  };

  static logout = async () => {
    return $api.post(`${process.env.REACT_APP_API_URL}/users/logout`);
  };

  static deleteAccount = async () => {
    return $api.post(`${process.env.REACT_APP_API_URL}/users/delete-user`);
  };
}
