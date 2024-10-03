export default class Star {
  constructor(scene, starsGroup) {
    this.scene = scene;
    this.starsGroup = starsGroup;
  }

  createStar() {
    const star = this.starsGroup.create(
      this.scene.scale.width + 50,
      Phaser.Math.Between(0, this.scene.scale.height),
      "star",
    );
    star.setVelocityX(-200);
    star.setCollideWorldBounds(false);
    this.sprite = star;
  }
}