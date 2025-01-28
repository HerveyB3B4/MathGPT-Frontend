import axios from "axios";

const api = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.error("Response error:", error.response);
    } else if (error.request) {
      console.error("Request error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

const request = {
  get: (url: string, params = {}) => api.get(url, { params }),
  post: (url: string, data = {}) => api.post(url, data),
  postFormData: (url: string, formData = {}) =>
    api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }),
  put: (url: string, data = {}) => api.put(url, data),
  patch: (url: string, data = {}) => api.patch(url, data),
  delete: (url: string, data = {}) => api.delete(url, { data })
};

export default request;
