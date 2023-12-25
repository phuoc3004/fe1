import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { Middleware } from "./cart/cart-slice";
import productSlice from "./products/product-slice";
import userSlice from "./user/user-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Middleware),
});
export default store;
