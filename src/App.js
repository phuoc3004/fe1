import "./App.css";
import { RouterProvider } from "react-router-dom";
import routers from "./routers/router";

function App() {
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
