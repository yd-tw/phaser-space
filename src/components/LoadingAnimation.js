export default function LoadingAnimation() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <div className="loader mb-4"></div>
        <div className="mb-2 text-2xl font-bold text-white">遊戲載入中...</div>
        <div className="text-lg text-gray-200">本專案由程式貓社群技術支持</div>
      </div>

      <style jsx>{`
        .loader {
          width: 80px;
          height: 80px;
          border: 8px solid #f3f3f3;
          border-top: 8px solid #3498db;
          border-radius: 50%;
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
