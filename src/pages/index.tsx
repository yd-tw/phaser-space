import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>中核高中</title>
        <meta name="description" content="A Phaser 3 Next.js project template that demonstrates Next.js with React communication and uses Vite for bundling." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <AppWithoutSSR />
        <img id="logo" src="assets/logo.png" alt="網站Logo"></img>
        <div id="developer-info">
          <a href="https://www.codecat.tw" target="_blank" rel="noopener noreferrer">Copyright © 2024 CodeCat team.</a>
          | 版本 beta 0.1.0
        </div>
        <button id="user-button">
          <img src="assets/default-avatar.png" alt="使用者頭像"></img>
            <span>未登入</span>
        </button>
      </main>
    </>
  );
}
