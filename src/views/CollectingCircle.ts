module Game {
    export class CollectingCircle extends PIXI.Container {

        private fillCircle: PIXI.Graphics;

        constructor() {
            super();
            this.fillCircle = new PIXI.Graphics();
            this.fillCircle.beginFill(0xffc60c, 1);
            this.fillCircle.drawCircle(0, 0, 135);

            let emptyCircle: PIXI.Graphics = new PIXI.Graphics();
            emptyCircle.beginFill(0x999999, 1);
            emptyCircle.drawCircle(0, 0, 135);

            this.addChild(emptyCircle);
            this.addChild(this.fillCircle);
        }

        updateState(vo: Game.BusinessVO) {

            this.fillCircle.visible = false;

            if (vo.level === 1) {
                this.visible = true;
                this.fillCircle.visible = true;
            } else if (vo.level === 2) {
                this.visible = true;
                this.fillCircle.visible = true;
            } else if (vo.level === 3) {
                this.visible = true;
                this.fillCircle.visible = true;
            } else {
                this.visible = false;
            }
        }
    }
}