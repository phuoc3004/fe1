import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authenticate = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    if (!token || isAdmin === null) {
      navigate("/admin/login");
    }
  }, [navigate]);
  return <>{props.children}</>;
};

export default Authenticate;
