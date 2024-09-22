"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import UserAuth from "@/components/UserAuth";
import Announcement from "@/components/Announcement";
import WebInfo from "@/components/WebInfo";
import LoadingAnimation from "@/components/LoadingAnimation";

const PhaserGame = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div id="game-container" className="relative h-screen w-full">
        <PhaserGame />
      </div>

      {showLoading && <LoadingAnimation />}

      <UserAuth />
      <Announcement />
      <WebInfo />
    </>
  );
}
