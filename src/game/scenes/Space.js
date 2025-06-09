export default class SpaceScene extends Phaser.Scene {
  constructor() {
    super("SpaceScene");
    this.playerPosition = { x: 0, y: 0 }; // 固定玩家虛擬位置為(0, 0)
    this.enemies = [];
    this.bullets = null; // 子彈群組
    this.positionText = null; // 文字標籤
  }

  preload() {
    // 載入玩家、敵方、子彈的資源
    this.load.image("player", "assets/player.png");
    this.load.image("enemy", "assets/enemy.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.audio("shootSound", "assets/shoot.mp3");
  }

  create() {
    // 玩家靜止在畫面中央，固定在(0, 0)
    this.player = this.add.sprite(0, 0, "player").setOrigin(0.5, 0.5);
    this.player.setPosition(this.scale.width / 2, this.scale.height / 2);

    // 創建隨機數量的敵方太空船
    const enemyCount = Phaser.Math.Between(1, 5);
    for (let i = 0; i < enemyCount; i++) {
      this.spawnEnemy();
    }

    // 建立子彈群組，並啟用物理屬性
    this.bullets = this.physics.add.group({
      defaultKey: "bullet",
      maxSize: 10,
    });

    // 在左下角顯示玩家的虛擬座標
    this.positionText = this.add
      .text(10, this.scale.height - 30, "", {
        fontSize: "16px",
        fill: "#ffffff",
      })
      .setScrollFactor(0); // 保持文字標籤不隨場景滾動

    // 設定滑鼠點擊發射子彈
    this.input.on("pointerdown", this.shootBullet, this);

    this.shootSound = this.sound.add("shootSound");
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    let speed = 5; // 移動速度

    // 虛擬玩家位置保持不動，改變場景元素位置
    if (cursors.left.isDown) {
      this.playerPosition.x -= speed;
    } else if (cursors.right.isDown) {
      this.playerPosition.x += speed;
    }

    if (cursors.up.isDown) {
      this.playerPosition.y -= speed;
    } else if (cursors.down.isDown) {
      this.playerPosition.y += speed;
    }

    // 根據玩家虛擬位置更新敵方太空船的相對位置，並讓敵人朝玩家方向移動
    this.enemies.forEach((enemy) => {
      const offsetX = enemy.initialPosition.x - this.playerPosition.x;
      const offsetY = enemy.initialPosition.y - this.playerPosition.y;

      // 計算敵人與玩家之間的角度
      const angle = Phaser.Math.Angle.Between(
        enemy.initialPosition.x,
        enemy.initialPosition.y,
        this.playerPosition.x,
        this.playerPosition.y,
      );

      // 計算速度，讓敵人朝玩家方向移動
      const enemySpeed = 1;
      enemy.initialPosition.x += Math.cos(angle) * enemySpeed;
      enemy.initialPosition.y += Math.sin(angle) * enemySpeed;

      enemy.setPosition(
        this.scale.width / 2 + offsetX,
        this.scale.height / 2 + offsetY,
      );
    });

    // 更新左下角的文字標籤顯示玩家的虛擬座標
    this.positionText.setText(
      `Player Position: (${this.playerPosition.x}, ${this.playerPosition.y})`,
    );

    // 子彈邏輯
    this.bullets.getChildren().forEach((bullet) => {
      if (bullet.active) {
        // 如果子彈超出邊界就將其銷毀
        if (
          bullet.x < -2000 ||
          bullet.x > 2000 ||
          bullet.y < -2000 ||
          bullet.y > 2000
        ) {
          bullet.setActive(false);
          bullet.setVisible(false);
        }
      }
    });

    // 檢查子彈與敵人的碰撞
    this.physics.overlap(this.bullets, this.enemies, this.hitEnemy, null, this);
  }

  shootBullet(pointer) {
    // 發射子彈的邏輯
    const bullet = this.bullets.get();
    if (bullet) {
      this.shootSound.play();

      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.setPosition(this.scale.width / 2, this.scale.height / 2);

      // 計算子彈的方向
      const angle = Phaser.Math.Angle.Between(
        this.scale.width / 2,
        this.scale.height / 2,
        pointer.x,
        pointer.y,
      );

      const bulletSpeed = 500;
      this.physics.velocityFromRotation(
        angle,
        bulletSpeed,
        bullet.body.velocity,
      );
    }
  }

  hitEnemy(bullet, enemy) {
    // 子彈擊中敵人的邏輯
    bullet.setActive(false);
    bullet.setVisible(false);

    // 銷毀被擊中的敵人並生成新敵人
    enemy.destroy();
  }

  spawnEnemy() {
    // 在隨機位置生成敵人
    const enemy = this.add.sprite(
      Phaser.Math.Between(-1000, 1000),
      Phaser.Math.Between(-1000, 1000),
      "enemy",
    );
    enemy.initialPosition = { x: enemy.x, y: enemy.y }; // 儲存敵人的初始位置
    this.enemies.push(enemy);

    // 啟用物理系統
    this.physics.add.existing(enemy);
  }
}
