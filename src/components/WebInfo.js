import Image from 'next/image';

export default function WebInfo() {
  return (
    <>
      <Image
        src="/assets/logo.png"
        alt="Logo"
        width={200}
        height={100}
        className="absolute top-5 left-1/2 transform -translate-x-1/2 z-10"
      />
      <div id="developer-info" className="absolute right-1 bottom-1 bg-gray-800 text-white p-1.5 rounded text-xs">
        <a href="https://www.codecat.tw" target="_blank" rel="noopener noreferrer" className="hover:underline">Copyright © 2024 CodeCat team.</a>
        | 版本 beta 0.1.0
      </div>
    </>
  );
}
