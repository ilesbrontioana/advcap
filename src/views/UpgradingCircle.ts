module Game {
    export class UpgradingCircle extends PIXI.Container {
        private fillCircle: PIXI.Graphics;

        constructor() {
            super();

            this.fillCircle = new PIXI.Graphics();
            this.fillCircle.beginFill(0x8e0cff, 1);
            this.fillCircle.drawCircle(0, 0, 170);

            let emptyCircle: PIXI.Graphics = new PIXI.Graphics();
            emptyCircle.beginFill(0x999999, 1);
            emptyCircle.drawCircle(0, 0, 170);

            this.addChild(emptyCircle);
            this.addChild(this.fillCircle);
        }

        updateState(vo: Game.BusinessVO) {
            this.visible = false;
            this.fillCircle.visible = false;

            if (vo.hasManager) {
                this.visible = true;
                this.fillCircle.visible = false;
                if (vo.upgradeTime === 0) {
                    if (vo.level === 1 && Connection.getCash() >= vo.level2Price) {
                        this.fillCircle.visible = true;
                    } else if (vo.level === 2 && Connection.getCash() >= vo.level3Price) {
                        this.fillCircle.visible = true;
                    } else if (vo.level === 3) {
                        this.fillCircle.visible = true;
                    }
                }
            }
        }
    }
}