module Game {
    export class GameContainer extends PIXI.Container {

        constructor() {
            super();
            this.add();
            Stage.addChild(this);
        }

        protected add() {

        }
    }
}