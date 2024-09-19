export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  init(data) {
    this.score = data.score;
  }

  preload() {
    //
  }

  create() {
    this.add
      .text(this.scale.width / 2, this.scale.height / 2 - 150, "Game Over", {
        fontSize: "64px",
        fill: "#000",
      })
      .setOrigin(0.5);

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

    const playButton = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "再玩一次", {
        fontSize: "32px",
        fill: "#000",
        backgroundColor: "#fff",
        padding: { x: 10, y: 10 },
      })
      .setOrigin(0.5);

    playButton.setInteractive();

    playButton.on("pointerdown", () => {
      this.scene.start("MainScene");
    });
  }
}
