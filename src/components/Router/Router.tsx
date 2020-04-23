import React, { useState, useEffect } from "react";
import App from "../App/App";
import Login from "../../views/Login/login";
import config from "../../config/config";

const Router = () => {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (password === config.password) {
      setLoggedIn(true);
    }
  }, [password]);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(ev.target.value);
  };

  return (
    <>
      {loggedIn ? (
        <App />
      ) : (
        <Login handleChange={handleChange} value={password} />
      )}
    </>
  );
};

export default Router;
