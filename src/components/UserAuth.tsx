"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function UserAuth() {
  const { data: session, status } = useSession();

  // 處理加載狀態
  if (status === "loading") {
    return <p>正在加載...</p>;
  }

  // 如果用戶已登入，顯示用戶信息和登出按鈕
  if (session) {
    return (
      <div
        className="absolute top-5 right-5 bg-[#f6b056] p-2 rounded-lg flex items-center cursor-pointer text-lg z-10"
        onClick={() => signOut()}
      >
        <Image
          src={session.user?.image || "/assets/default-avatar.png"}
          alt="使用者頭像"
          width={40}
          height={40}
          className="rounded-full mr-2"
        />
        <span className="font-bold text-gray-900">{session.user?.name || session.user?.email}</span>
      </div>
    );
  }

  // 如果用戶未登入，顯示登入按鈕
  return (
    <div
      className="absolute top-5 right-5 bg-[#f6b056] p-2 rounded-lg flex items-center cursor-pointer text-lg z-10"
      onClick={() => signIn("google")}
    >
      <Image
        src="/assets/google-icon.png"
        alt="使用者頭像"
        width={40}
        height={40}
        className="rounded-full mr-2"
      />
      <span className="font-bold text-gray-900">使用 Google 登入</span>
    </div>
  );
}
