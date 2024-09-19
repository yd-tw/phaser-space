export default class Bullet {
  constructor(scene, bulletsGroup, starSprite) {
    this.scene = scene;
    this.bulletsGroup = bulletsGroup;
    this.starSprite = starSprite;
  }

  shoot() {
    if (this.starSprite.active) {
      const bullet = this.bulletsGroup.create(
        this.starSprite.x,
        this.starSprite.y,
        "bullet",
      );
      bullet.setVelocityX(-300);
      bullet.setCollideWorldBounds(false);
    }
  }
}
