import axios from "axios";

export const API_URL = `${process.env.REACT_APP_API_URL}/users`;

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  config.headers.Autorization = `Bearer ${localStorage.getItem("token")}`;
  //console.log(config);
  return config;
});

$api.interceptors.response.use(
  (config) => {
    //config.headers.Autorization = `Bearer ${localStorage.getItem("token")}`;
    //console.log(config);
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry == true
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("Not autorized");
      }
    }
    throw error;
  }
);

export default $api;
