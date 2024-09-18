"use client";

import dynamic from "next/dynamic";
import UserAuth from "@/components/UserAuth";
import Announcement from "@/components/Announcement";
import WebInfo from "@/components/WebInfo";

const PhaserGame = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
  return (
    <>
      <div id="game-container">
        <PhaserGame />
      </div>
      <UserAuth />
      <Announcement />
      <WebInfo />
    </>
  );
}
