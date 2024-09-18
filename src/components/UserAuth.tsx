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
        className="absolute right-5 top-5 z-10 flex cursor-pointer items-center rounded-lg bg-[#f6b056] p-2 text-lg"
        onClick={() => signOut()}
      >
        <Image
          src={session.user?.image || "/assets/default-avatar.png"}
          alt="使用者頭像"
          width={40}
          height={40}
          className="mr-2 rounded-full"
        />
        <span className="font-bold text-gray-900">
          {session.user?.name || session.user?.email}
        </span>
      </div>
    );
  }

  // 如果用戶未登入，顯示登入按鈕
  return (
    <div
      className="absolute right-5 top-5 z-10 flex cursor-pointer items-center rounded-lg bg-[#f6b056] p-2 text-lg"
      onClick={() => signIn("google")}
    >
      <Image
        src="/assets/google-icon.png"
        alt="使用者頭像"
        width={40}
        height={40}
        className="mr-2 rounded-full"
      />
      <span className="font-bold text-gray-900">使用 Google 登入</span>
    </div>
  );
}
