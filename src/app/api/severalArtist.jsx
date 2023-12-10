"use client";
import React, { useEffect, useState } from "react";
import Home from "../home/page";
import FakeDatabase from "./db.json";
import axios from "axios";

export default function SeveralArtist(props) {
  const [artistData, setArtistData] = useState(null);
  const token = props.token;

  let getArtistData = async () => {
    const res = await axios.get(FakeDatabase.severalArtists, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application.json",
      },
    });

    const data = await res.data;
    console.log(data);
    setArtistData(data);
  };

  useEffect(() => {
    getArtistData();
  }, [token && FakeDatabase]);

  return (
    <>
      <Home artistData={artistData} token={token} />
    </>
  );
}
