"use client";
import React, { useState, useEffect } from "react";
import { headers } from "../../../next.config";
import { data } from "autoprefixer";
import Token from "../api/login";

export default function Home(props) {
  const artistData = props.artistData;
  const token = props.token;
  return (
    <>
      {artistData && token && (
        <div className="w-[100vw] text-center">
          <h2 className="mb-[1rem]">Artist Data:</h2>
          {artistData.artists.map((data) => (
            <div className="w-full text-center items-center" key={data.id}>
              <p>Name: {data.name}</p>
              <p>Genres: {data.genres.join(", ")}</p>
              <p>Followers: {data.followers.total}</p>
              <img src={data.images[1].url} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
