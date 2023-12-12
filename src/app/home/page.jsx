"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FakeDatabase from "../api/db.json";
import veriviedIcon from "../../img/verivied.svg";
import Image from "next/image";

export default function Home(props) {
  const [topArtistData, settopArtistData] = useState(null);
  const token = props.token;

  let gettopArtistData = async () => {
    const res = await axios.get(FakeDatabase.severalArtists, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application.json",
      },
    });

    const data = await res.data;
    console.log(data);
    settopArtistData(data);
  };

  useEffect(() => {
    gettopArtistData();
  }, [token && FakeDatabase]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomAngka = getRandomInt(topArtistData?.artists.length);

  let ucapan;
  const waktu = new Date();
  let jam = waktu.getHours();

  // console.log(jam);
  if (jam >= 0 || jam <= 12) {
    ucapan = "Good Morning";
  } else if (jam >= 13 || jam <= 18) {
    ucapan = "Good Afternoon";
  } else if (jam >= 19 || jam <= 23) {
    ucapan = "Good Evening";
  }

  return (
    <>
      <div className="w-[90%] mx-auto">
        <div className="justify-end flex text-[1.5rem] font-medium my-[1rem]">
          {ucapan} Melophile
        </div>
        <div className="w-[70%] h-[10rem] bg-blackLight mx-auto rounded-md">
          {topArtistData && token && (
            <div className="flex justify-between">
              <div className="h-full flex my-auto">
                <img
                  className="w-[10rem] h-[10rem] rounded-md"
                  src={topArtistData.artists[randomAngka].images[0].url}
                />
                <div className="block ml-[2rem] my-auto">
                  <div className="flex text-[.7rem] h-[1.2rem]">
                    <Image className="h-[1rem]" src={veriviedIcon} />
                    <div className="my-auto flex">
                      <h1>Verivied Artist</h1>
                    </div>
                  </div>
                  <h1 className="font-bold text-[3rem] text-greenLight top-3">
                    {topArtistData.artists[randomAngka].name}
                  </h1>
                  <h1>
                    {topArtistData.artists[
                      randomAngka
                    ].followers.total.toLocaleString("id-ID")}{" "}
                    Followers
                  </h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
