import Image from "next/image";

export default function WebInfo() {
  return (
    <>
      <Image
        src="/assets/logo.png"
        alt="Logo"
        width={200}
        height={100}
        className="absolute left-1/2 top-5 z-10 -translate-x-1/2 transform"
      />
      <div
        id="developer-info"
        className="absolute bottom-1 right-1 rounded bg-gray-800 p-1.5 text-xs text-white"
      >
        <a
          href="https://www.codecat.tw"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Copyright © 2024 CodeCat team.
        </a>
        | 版本 beta 0.5.0
      </div>
    </>
  );
}
