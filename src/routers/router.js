import { createBrowserRouter } from "react-router-dom";
import CartDetail from "../components/cart/CartDetail";
import CollectionsLayout from "../layouts/CollectionsLayout";
import HomePage from "../pages/home/HomePage";
import LoadingPage from "../pages/loading/LoadingPage";
import Login from "../pages/login/Login";
import Detail from "../pages/product-detail/Detail";
import Products from "../pages/products/Products";
import Register from "../pages/register/Register";
import CheckOut from "../components/checkout/CheckOut";
import Success from "../pages/resultPayment/Success";
// import User from "../components/user/User";
import Fail from "../pages/resultPayment/Fail";
import Order from "../pages/order/Order";
import AdminOrder from "../pages/admin/orders/AdminOrder";
import LoginAdmin from "../pages/admin/login/LoginAdmin";
import AdminLayout from "../pages/admin/layout/AdminLayout";
import Customers from "../pages/admin/customers/Customers";
import AdminProducts from "../pages/admin/products/AdminProducts";
import Overview from "../pages/admin/overview/Overview";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <LoadingPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <Overview />,
      },
      {
        path: "users",
        element: <Customers />,
      },
      {
        path: "products",
        element: <AdminProducts />,
        children: [
          {
            path: "all",
            element: <AdminProducts />,
          },
        ],
      },
      {
        path: "orders",
        element: <AdminOrder />,
      },
    ],
  },
  {
    path: "/admin/login",
    children: [
      {
        path: "",
        element: <LoginAdmin />,
      },
    ],
  },
  {
    path: "/payment/success",
    element: <CollectionsLayout />,
    children: [
      {
        path: "",
        element: <Success />,
      },
    ],
  },
  {
    path: "/payment/fail",
    element: <CollectionsLayout />,
    children: [
      {
        path: "",
        element: <Fail />,
      },
    ],
  },
  {
    path: "/orders",
    element: <CollectionsLayout />,
    children: [
      {
        path: "",
        element: <Order />,
      },
    ],
  },
  {
    path: "/checkouts",
    element: <CollectionsLayout />,
    children: [
      {
        path: "",
        element: <CheckOut />,
      },
    ],
  },
  {
    path: "/cart",
    element: <CollectionsLayout />,
    children: [
      {
        path: "",
        element: <CartDetail />,
      },
      {
        path: "information",
        element: <CartDetail />,
      },
    ],
  },
  {
    path: "/account",
    element: <CollectionsLayout />,

    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "",
        element: <></>,
      },
    ],
  },
  {
    path: "/collections",
    element: <CollectionsLayout />,
    children: [
      {
        path: "shirt",
        element: <Products />,

        index: true,
      },
      {
        path: "pants",
        element: <Products />,
      },
      {
        path: "accessories",
        element: <Products />,
      },
    ],
    default: true,
  },
  {
    path: "/smart-devices",
    element: <CollectionsLayout />,
    children: [
      {
        path: "PHONES",
        element: <LoadingPage />,
      },
      {
        path: "LAPTOPS",
        element: <LoadingPage />,
      },
    ],
  },
  {
    path: "/products",
    element: <CollectionsLayout />,
    children: [
      { path: "", element: <Products /> },
      { path: ":idProduct", element: <Detail /> },
    ],
  },
]);
export default routers;
