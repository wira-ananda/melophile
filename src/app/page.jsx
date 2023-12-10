import Image from "next/image";
import React from "react";
import Login from "./api/login";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center block">
        <div className="mb-[1rem]">
          <h1>Spotify Test</h1>
          <Login />
        </div>
      </div>
    </main>
  );
}
