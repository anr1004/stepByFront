import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";

let authContext: AuthContextType | null = null;
export const setAuthContext = (context: AuthContextType) => {
  authContext = context;
};

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = authContext?.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - JWT token expired or invalid.");
      if (authContext) {
        authContext.logout();
        alert("세션이 만료되었거나 인증되지 않았습니다. 다시 로그인해주세요.");
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
