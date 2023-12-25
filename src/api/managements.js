import http from "../helpers/http";
import { getToken } from "./users";

export const getAllOrdersAdmin = () => {
  return http.get("/order/all", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};
export const getBestCustomer = () => {
  return http.get("/user/bestCustomers", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};
