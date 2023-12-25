import http from "../helpers/http";
import { getToken } from "./users";

export const getAllCartItems = () => {
  return http.get("/cart", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const addCartItem = (cartItem) => {
  return http.post("/cart/add", cartItem, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};

export const deleteCartItemApi = (id) => {
  return http.delete(`/cart/delete/${id}`, "", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};
