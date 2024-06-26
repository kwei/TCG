"use client";

export default function Home() {
  fetch("/api/aiven/pg/connection", {
    method: "POST",
    body: JSON.stringify({
      data: "data",
    }),
  }).then();
  return <main className="min-h-screen"></main>;
}
