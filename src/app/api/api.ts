// api.ts

import axios from "axios";
import { deleteCookie, getCookie } from "../utils/cookies/cookieUtils";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiUrl,
});

export const loginApi = async (username: string, password: string) => {
  try {
    const response = await api.post("/login", {
      username: username,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateToken = async (token: string) => {
  try {
    const response = await api.post("/validateToken", {
      token: token,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// const refreshAccessToken = async () => {
//   try {
//     const token =  getCookie("token");
//     const response = await api.get("/auth/refresh", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const access_token = response.data.access_token;
//     localStorage.setItem("access_token", access_token);
//     return access_token;
//   } catch (error) {
//     window.location.href = "/login";
//     return Promise.reject(error);
//   }
// };

// Configura Axios para incluir el token de autenticación en el encabezado de las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    deleteCookie("token");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      logout();
      deleteCookie("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
