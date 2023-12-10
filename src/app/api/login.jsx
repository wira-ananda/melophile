"use client";
import React, { useEffect, useState } from "react";
import Home from "../home/page";
import SeveralArtist from "./severalArtist";
import App from "../page";

export default function Login() {
  const CLIENT_ID = "ea80a78dcc144bee806b5fbadb5794c9";
  const URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const AUTH_LINK = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${URI}&response_type=${RESPONSE_TYPE}`;

  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;

    if (!token && hash) {
      let tokenApi = hash.substring(14).split("&")[0];
      setToken(tokenApi);
    }
  }, []);

  const logout = () => {
    setToken(null);
  };

  return (
    <>
      <div>
        {!token ? (
          <a href={AUTH_LINK}>Login</a>
        ) : (
          <h1 className="cursor-pointer" onClick={logout} href={URI}>
            Logout
          </h1>
        )}
      </div>
      <SeveralArtist token={token} />
    </>
  );
}
