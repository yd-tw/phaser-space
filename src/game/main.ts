import { Game } from "phaser";
import SpaceScene from "./scenes/Space";
import MainScene from "./scenes/Main";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#000",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: "game-container",
    width: "100%",
    height: "100%",
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [MainScene, SpaceScene],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
