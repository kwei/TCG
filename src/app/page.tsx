"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Room[]>([]);

  function getTestData() {
    setLoading(true);
    fetch("/api/aiven/pg/connection", {
      method: "POST",
      body: JSON.stringify({
        action: "get",
        RoomID: 123456789,
      } as PGReq),
    })
      .then((res) => res.json())
      .then((res) => {
        setPlayers(res.playerList);
        setLoading(false);
      });
  }

  function setTestData() {
    setLoading(true);
    fetch("/api/aiven/pg/connection", {
      method: "POST",
      body: JSON.stringify({
        action: "set",
        RoomID: 123456789,
        data: {
          RoomID: 123456789,
          UserName: "UserName",
          ICE: "ICE",
          SDP: "SDP",
          Timestamp: new Date().toISOString(),
        },
      } as PGReq),
    }).then(() => {
      setLoading(false);
    });
  }

  function deleteTestData() {
    setLoading(true);
    fetch("/api/aiven/pg/connection", {
      method: "POST",
      body: JSON.stringify({
        action: "delete",
        RoomID: 123456789,
        data: {
          RoomID: 123456789,
          UserName: "UserName",
        },
      } as PGReq),
    }).then(() => {
      setLoading(false);
    });
  }

  return (
    <main className="flex min-h-screen flex-col gap-4">
      <button
        className="cursor-pointer rounded-sm border border-solid border-gray-500 px-2 py-1"
        onClick={getTestData}
        disabled={loading}
      >
        Get All
      </button>
      <button
        className="cursor-pointer rounded-sm border border-solid border-gray-500 px-2 py-1"
        onClick={setTestData}
        disabled={loading}
      >
        Set Test
      </button>
      <button
        className="cursor-pointer rounded-sm border border-solid border-gray-500 px-2 py-1"
        onClick={deleteTestData}
        disabled={loading}
      >
        Delete Test
      </button>

      <ul className="pt-4">
        {players.map((player, index) => (
          <li
            key={`${player.UserName}-${index.toString()}`}
            className="grid grid-cols-5 rounded-sm border border-solid border-gray-500 text-gray-300"
          >
            <span className="col-span-1">{player.RoomID}</span>
            <span className="col-span-1">{player.UserName}</span>
            <span className="col-span-1">{player.ICE}</span>
            <span className="col-span-1">{player.SDP}</span>
            <span className="col-span-1">
              {new Date(player.Timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
