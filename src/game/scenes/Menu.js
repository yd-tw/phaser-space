export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  init(data) {
    // 接收從 MainScene 傳遞來的數據
    this.score = data.score;
  }

  preload() {
    // 載入需要的資源，例如按鈕圖案（如果有的話）
  }

  create() {
    // 顯示 "Game Over" 的文字
    this.add
      .text(this.scale.width / 2, this.scale.height / 2 - 150, "Game Over", {
        fontSize: "64px",
        fill: "#000",
      })
      .setOrigin(0.5);

    // 顯示分數
    this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2 - 80,
        `Score: ${this.score}`,
        {
          fontSize: "32px",
          fill: "#000",
        },
      )
      .setOrigin(0.5);

    // 顯示 "再玩一次" 的按鈕
    const playButton = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "再玩一次", {
        fontSize: "32px",
        fill: "#000",
        backgroundColor: "#fff",
        padding: { x: 10, y: 10 },
      })
      .setOrigin(0.5);

    // 讓按鈕變得可點擊
    playButton.setInteractive();

    playButton.on("pointerdown", () => {
      this.scene.start("MainScene"); // 點擊按鈕後重新開始遊戲
    });
  }
}
