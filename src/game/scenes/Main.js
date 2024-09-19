import Star from "./Star";
import Bullet from "./Bullet";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("starship", "assets/player.jpg");
    this.load.image("star", "assets/house.png");
    this.load.image("bullet", "assets/bullet.png");
  }

  create() {
    this.score = 0;
    this.lives = 3;
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });
    this.livesText = this.add.text(16, 50, "Lives: 3", {
      fontSize: "32px",
      fill: "#000",
    });

    this.starship = this.physics.add.sprite(100, 300, "starship");
    this.starship.setCollideWorldBounds(true);

    this.stars = this.physics.add.group();
    this.bullets = this.physics.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: () => this.spawnStar(),
      loop: true,
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    // 新增子彈與玩家的碰撞檢測
    this.physics.add.overlap(
      this.starship,
      this.stars,
      this.collectStar,
      null,
      this,
    );
    this.physics.add.overlap(
      this.starship,
      this.bullets,
      this.hitByBullet,
      null,
      this,
    );
  }

  update() {
    if (this.cursors.up.isDown) {
      this.starship.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.starship.setVelocityY(200);
    } else {
      this.starship.setVelocityY(0);
    }

    // 清除超出範圍的星星
    this.stars.children.iterate((star) => {
      if (star && star.x < 0) {
        star.destroy();
      }
    });

    // 清除超出範圍的子彈
    this.bullets.children.iterate((bullet) => {
      if (bullet && bullet.x < 0) {
        bullet.destroy();
      }
    });
  }

  spawnStar() {
    const star = new Star(this, this.stars);
    star.createStar();

    // 隨機產生星星攻擊的子彈
    this.time.addEvent({
      delay: Phaser.Math.Between(1, 3000),
      callback: () => {
        const bullet = new Bullet(this, this.bullets, star.sprite);
        bullet.shoot();
      },
      loop: true,
    });
  }

  collectStar(starship, star) {
    star.destroy();
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
  }

  hitByBullet(starship, bullet) {
    bullet.destroy();
    this.lives -= 1;
    this.livesText.setText("Lives: " + this.lives);

    if (this.lives <= 0) {
      this.scene.start("MenuScene", { score: this.score });
    }
  }
}