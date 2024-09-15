import { forwardRef, useLayoutEffect, useRef } from 'react';
import StartGame from './main'; // 假設 StartGame 是用來初始化 Phaser 遊戲的函式

export interface IRefPhaserGame {
    game: Phaser.Game | null;
}

export const PhaserGame = forwardRef<IRefPhaserGame>(function PhaserGame(props, ref) {
    const game = useRef<Phaser.Game | null>(null);

    useLayoutEffect(() => {
        // 初始化 Phaser 遊戲
        if (game.current === null) {
            game.current = StartGame("game-container");

            // 將 game 參考傳給父層的 ref
            if (typeof ref === 'function') {
                ref({ game: game.current });
            } else if (ref) {
                ref.current = { game: game.current };
            }
        }

        // 清理：在元件卸載時銷毀遊戲實例
        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = null;
            }
        };
    }, [ref]);

    return <div id="game-container"></div>;
});
