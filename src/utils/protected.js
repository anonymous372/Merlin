import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../constant";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Protected = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const checkUserLogIn = async () => {
    const token = localStorage.getItem("token") || "";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const result = await axios.get(BASE_API_URL + "api/me", config);
      if (result.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkUserLogIn();
  }, []);
  if (loading)
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  return <>{isLoggedIn ? children : <Navigate to="/" />}</>;
};

export default Protected;
