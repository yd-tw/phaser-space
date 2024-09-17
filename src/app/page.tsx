"use client"
import dynamic from 'next/dynamic';

const PhaserGame = dynamic(() => import('@/App'), { ssr: false });

export default function Home() {
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
        <button id="user-button">
          <img src="assets/default-avatar.png" alt="使用者頭像"></img>
            <span>未登入</span>
        </button>
    </>
  );
}
