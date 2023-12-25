import http from "../helpers/http";
import { getToken } from "./users";

// export const getAllProducts = () => {
//   return http.get("/products/category/tops");
// };
export const getAllProductNonPagination = () => {
  return http.get("/product/all");
};
export const getAllProducts = (page, size = 6, sort) => {
  return http.get("/product/all", {
    params: {
      page: page,
      size: size,
      sort: sort,
    },
  });
};
export const getDetailProduct = (id) => {
  return http.get(`/product/detail/${id}`);
};
export const getAllCategories = () => {
  return http.get("/category/all");
};
export const getProductBestSeller = () => {
  return http.get("/product/bestSeller");
};
export const addProduct = (data) => {
  return http.post("/product/add", data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};
export const updateProduct = (id, data) => {
  return http.post(`/product/update/${id}`, data, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};
