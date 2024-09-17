"use client"
import { signIn, useSession } from "next-auth/react";
import dynamic from 'next/dynamic';
import UserAuth from "@/components/UserAuth";
import Announcement from "@/components/Announcement";

const PhaserGame = dynamic(() => import('@/App'), { ssr: false });

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <div
        id="game-container">
        <PhaserGame />
      </div>
      <img id="logo" src="assets/logo.png" alt="網站Logo"></img>
      <div id="developer-info">
          <a href="https://www.codecat.tw" target="_blank" rel="noopener noreferrer">Copyright © 2024 CodeCat team.</a>
          | 版本 beta 0.1.0
        </div>
        <UserAuth />
        <Announcement />
    </>
  );
}
