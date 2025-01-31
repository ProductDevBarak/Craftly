import { set } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setTimeout(() => {
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      if (setId) {
        setId(null);
      }
      navigate("/");
    }, 5000);
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
