export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  init(data) {
    this.score = data.score;
  }

  preload() {
    this.load.image("background", "assets/background.png");
    this.load.audio("bgMusic", "assets/music.mp3");
  }

  create() {
    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "background")
      .setDisplaySize(this.scale.width, this.scale.height);

    const backgroundMusic = this.sound.add("bgMusic", {
      loop: true,
      volume: 0.5,
    });
    backgroundMusic.play();

    this.add
      .text(
        this.scale.width / 2,
        (this.scale.height / 3) * 2 - 130,
        "早安owo",
        {
          fontSize: "48px",
          fill: "#fff",
        },
      )
      .setOrigin(0.5);
    if (this.score !== undefined) {
      this.add
        .text(
          this.scale.width / 2,
          (this.scale.height / 3) * 2 - 80,
          `Score: ${this.score}`,
          {
            fontSize: "32px",
            fill: "#fff",
          },
        )
        .setOrigin(0.5);
    }

    const playButton = this.add
      .text(this.scale.width / 2, (this.scale.height / 3) * 2, "開始遊戲", {
        fontSize: "32px",
        fill: "#000",
        backgroundColor: "#fff",
        padding: { x: 10, y: 10 },
      })
      .setOrigin(0.5);

    playButton.setInteractive();

    playButton.on("pointerdown", () => {
      backgroundMusic.stop();
      this.scene.start("FightingScene");
    });
  }
}
