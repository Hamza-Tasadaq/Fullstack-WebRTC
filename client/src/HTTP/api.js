import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5500",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const makePostRequest = async (subURL, data) => {
  const res = await api.post(subURL, data);
  return res;
};
export const makeGetRequest = async (subURL) => {
  const res = await api.get(subURL);
  return res;
};

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/refresh`, {
          withCredentials: true,
        });

        return api.request(originalRequest);
      } catch (err) {
        console.log(err.message);
      }
    }
    throw error;
  }
);

export default api;
