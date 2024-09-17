import { useState, useEffect } from 'react';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

const UpdateNotification = () => {
  const latestVersion = 'beta 0.3.0';
  const [isNotified, setIsNotified] = useState(true);

  useEffect(() => {
    const lastVersionNotified = getCookie('lastVersionNotified');
    if (lastVersionNotified !== latestVersion) {
      setIsNotified(false);
    }
  }, []);

  const handleClose = () => {
    setCookie('lastVersionNotified', latestVersion, 365);
    setIsNotified(true);
  };

  if (isNotified) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="relative bg-yellow-400 p-6 rounded-lg text-xl shadow-lg">
        <button
          id="close-button"
          onClick={handleClose}
          className="absolute top-2 right-2 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100"
        >
          &#x2715;
        </button>
        <p className="mb-2">beta 0.3.0 「架構更新」正式推出</p>
        <ul className="list-disc pl-5">
          <li>伺服器已由 live-server 遷移至 nextjs</li>
          <li>現在支援 Google 帳戶登入</li>
          <li>變更公告顯示邏輯與介面</li>
          <li>切換場景前向玩家再次確認</li>
        </ul>
      </div>
    </div>
  );
};

export default UpdateNotification;
