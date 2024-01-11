"use client";
import React, { useEffect, useState } from "react";
import Home from "../home/page";
import FakeDatabase from "./db.json";
import axios from "axios";

export default function ApiTest(props) {
  const [apiData, setapiData] = useState(null);
  const token = props.token;
  const endPoint = props.endPoint;

  let getapiData = async () => {
    try {
      const res = await axios.get(endPoint, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application.json",
        },
      });

      const data = await res.data;
      console.log(data);
      setapiData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getapiData();
  }, [token && FakeDatabase]);
  return { apiData };
}
