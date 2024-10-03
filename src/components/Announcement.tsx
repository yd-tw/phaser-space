import { useState, useEffect } from "react";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export default function UpdateNotification(): JSX.Element | null {
  const latestVersion = "0.4.0";
  const [isNotified, setIsNotified] = useState<boolean>(true);

  useEffect(() => {
    const lastVersionNotified = getCookie("lastVersionNotified");
    if (lastVersionNotified !== latestVersion) {
      setIsNotified(false);
    }
  }, [latestVersion]);

  const handleClose = (): void => {
    setCookie("lastVersionNotified", latestVersion, 365);
    setIsNotified(true);
  };

  if (isNotified) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative rounded-lg bg-yellow-400 p-6 text-xl shadow-lg">
        <button
          id="close-button"
          onClick={handleClose}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-gray-100"
        >
          &#x2715;
        </button>
        <p className="mb-2">0.5.0 「太空更新」正式推出</p>
        <ul className="list-disc pl-5">
          <li>重新設計遊戲運作邏輯</li>
          <li>加入太空遊戲基本要素</li>
          <li>新增原創音效</li>
        </ul>
      </div>
    </div>
  );
}
