import http from "../helpers/http";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const register = (authRequest) => {
  return http.post("/user/register", authRequest);
};

export const login = (authRequest) => {
  return http.post("/user/login", authRequest);
};

export const getProfile = (token) => {
  return http.get("/user/profile", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const editProfile = (data) => {
  return http.post("user/profile/edit", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const getCustomersOrders = () => {
  return http.get("/user/customerOrders", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};
