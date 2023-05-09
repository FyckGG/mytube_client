import AuthServices from "../services/authService";
import { makeAutoObservable } from "mobx";
import axios from "axios";
import { API_URL } from "../http";

export default class Store {
  user = {};
  isAuth = false;
  //isLoading = false;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  async autorization(em_log, password) {
    try {
      const response = await AuthServices.autorization(em_log, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      throw "Неверно задан логин, email или пароль.";
    }
  }

  async registration(email, login, password, img_profile) {
    try {
      const response = await AuthServices.registration(
        email,
        login,
        password,
        img_profile
      );
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (e) {
      throw e.response.data.error;
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get(`${API_URL}/refresh`, {
        withCredentials: true,
      });

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      const response = await AuthServices.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async deleteAccount() {
    try {
      const response = await AuthServices.deleteAccount();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
}
