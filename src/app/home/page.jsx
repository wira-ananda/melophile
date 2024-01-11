"use client";
import axios from "axios";
import FakeDatabase from "../api/db.json";
import veriviedIcon from "../../img/verivied.svg";
import Image from "next/image";
import TestDatabase from "../api/dbTest.json";
import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableRow,
  TableBody,
  TableCell,
} from "@nextui-org/table";

function TestTugas() {
  const database = TestDatabase.Artist;
  const [data, setData] = useState(null);
  const itemsPerPage = 3;
  let [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const startData = (currentPage - 1) * itemsPerPage;
      const endData = currentPage * itemsPerPage;
      const slicedData = database.slice(startData, endData);
      setData(slicedData);
    };
    fetchData();
  }, [currentPage, itemsPerPage]);

  let index = Math.ceil(database.length / itemsPerPage);
  const array = [];
  for (let i = 1; i <= index; i++) {
    array.push(i);
  }
  console.log(array);

  return (
    <div className="w-full mx-auto mb-[5rem]">
      <h1 className="font-semibold mb-[.5rem] text-[1.2rem]">TOP ARTISTS</h1>
      <div>
        <Table className="bg-blackLight rounded-lg text-center mb-[1rem] py-[.5rem]">
          <TableHeader>
            <TableColumn className="text-greenLight">RANK</TableColumn>
            <TableColumn className="text-greenLight">NAMA</TableColumn>
            <TableColumn className="text-greenLight">GENRE</TableColumn>
            <TableColumn className="text-greenLight">BEST SONG</TableColumn>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow className="text-auto" key={item.popularity}>
                <TableCell>{item.popularity}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.genre}</TableCell>
                <TableCell>{item.best}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="w-[50%] justify-between flex mx-auto">
          {array.map((item, index) => (
            <h1
              key={index}
              onClick={() => setCurrentPage(item)}
              className="cursor-pointer"
            >
              {item}
            </h1>
          ))}
        </div>
      </div>
    </div>
  );
}

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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(
  //         `../api/dbTest.json/Artist?offset=${offset}&limit=${limit}`
  //       );
  //       const jsonData = await res.json();
  //       setData(jsonData);
  //     } catch (error) {
  //       console.error("rusak");
  //     }
  //   };
  //   fetchData();
  // }, [offset]);

  return (
    <>
      <div className="w-[90%] mx-auto">
        <div className="justify-end flex text-[1.5rem] font-medium my-[1rem]">
          {ucapan} Melophile
        </div>
        <div className="w-[70%] h-[10rem] bg-blackLight mx-auto rounded-md">
          <div className="pb-[2rem]">
            {topArtistData && token && (
              <div className="block justify-between">
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
          <TestTugas />
        </div>
      </div>
    </>
  );
}

