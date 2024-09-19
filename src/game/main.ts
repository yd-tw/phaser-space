import { Game } from "phaser";
import MainScene from "./scenes/Main";
import Menu from "./scenes/Menu";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: "#F3ECE0",
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
  scene: [MainScene, Menu],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
