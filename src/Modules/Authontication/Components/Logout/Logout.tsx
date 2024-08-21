import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("ay7agaa");
    navigate("/login");
  };
}
