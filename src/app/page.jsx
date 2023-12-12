"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import homeIcon from "../img/home.svg";
import searchIcon from "../img/search.svg";
import libraryIcon from "../img/library.svg";
import Home from "./home/page";
import axios from "axios";
import FakeDatabase from "./api/db.json";

export default function App(props) {
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
    <main className="w-[100vw] h-[100vh] bg-blackDark block">
      {!token ? (
        <div className="w-full h-full flex">
          <div className="m-auto text-center">
            <div className="text-[3rem] mx-auto">
              <span className="text-greenLight">w</span>
              <span className="text-white ">Music</span>
            </div>
            <a
              className="font-semibold bg-greenLight text-blackDark px-[.7rem] py-[.3rem] rounded-md"
              href={AUTH_LINK}
            >
              LOGIN
            </a>
            <a>WIRA</a>
          </div>
        </div>
      ) : (
        <>
          <Main onClick={logout} token={token} />
        </>
      )}
    </main>
  );
}

function Main(props) {
  const token = props.token;
  return (
    <>
      <div className="flex w-full h-[90%]">
        <div className="H-full w-[5%] h-full bg-blackDark z-40">
          <Navbar />
        </div>
        <div className="H-full w-[80%]">
          <Home token={token} />
        </div>
        <div className="H-full w-[15%] bg-greenDark z-40">
          <Profil token={token} />
        </div>
      </div>

      <div className="w-full h-[10%] bg-blackLight rounded-xl border border-stone-900"></div>
    </>
  );
}

function Profil(props) {
  const [profil, setProfil] = useState(null);
  const token = props.token;

  let getProfil = async () => {
    const res = await axios.get(FakeDatabase.currentProfil, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application.json",
      },
    });

    const data = await res.data;
    console.log(data);
    setProfil(data);
  };

  useEffect(() => {
    getProfil();
  }, [token && FakeDatabase]);

  return (
    <>
      {profil && token && (
        <>
          <div className="w-full h-[10vh] flex bg-blackLight">
            <div className="flex text-[1.5rem] gap-[.5rem] m-auto ">
              <img
                className="w-[3rem] h-[3rem] rounded-full"
                src={profil.images[0].url}
              />
              <h1 className="my-auto">{profil.display_name}</h1>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Navbar() {
  const iconStyle =
    "mb-[1rem] block cursor-pointer mx-auto w-[3.5rem] h-[3.5rem] md:w-[2.1rem] md:h-[2.1rem]";
  return (
    <div className="w-full ">
      <div className="w-full mb-[1rem] ml-[1.65rem] mt-[1rem] text-[2rem] font-medium">
        <span className="text-greenLight">w</span>
        <span className="text-white ">Music</span>
      </div>
      <div className="mx-auto w-full mb-[1.5rem]">
        <Image className={iconStyle} src={homeIcon} />
        <Image className={iconStyle} src={searchIcon} />
        <Image className={iconStyle} src={libraryIcon} />
      </div>
    </div>
  );
}
