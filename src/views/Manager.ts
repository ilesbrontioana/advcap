module Game {
    export class Manager extends PIXI.Container {
        private price: PIXI.Text;
        private plus: PIXI.Text;
        private circle: PIXI.Graphics;

        constructor() {
            super();

            let grayCircle: PIXI.Graphics = new PIXI.Graphics();
            grayCircle.beginFill(0x999999, 1);
            grayCircle.drawCircle(0, 0, 50);
            this.addChild(grayCircle);

            let manager: PIXI.Sprite = new PIXI.Sprite(Stage.getTexture("manager"));
            manager.scale.set(0.35);
            manager.x = -55;
            manager.y = -55;
            this.addChild(manager);

            let maskCircle: PIXI.Graphics = new PIXI.Graphics();
            maskCircle.beginFill(0xffffff, 1);
            maskCircle.drawCircle(0, 0, 50);
            this.mask = maskCircle;
            this.addChild(maskCircle);


            this.circle = new PIXI.Graphics();
            this.circle.beginFill(0x000000, 0.65);
            this.circle.drawCircle(0, 0, 50);
            this.addChild(this.circle);

            this.plus = new PIXI.Text("+");
            this.plus.anchor.set(0.5);
            this.plus.style.fontFamily = "Modak";
            this.plus.style.fontSize = 70;
            this.plus.style.fill = "#ffc60c";
            this.plus.y = -10;
            this.addChild(this.plus);

            this.price = new PIXI.Text("+");
            this.price.anchor.set(0.5);
            this.price.style.fontFamily = "Bevan";
            this.price.style.fontSize = 20;
            this.price.style.fill = "#000000";
            this.price.y = 30;
            this.addChild(this.price);


            this.interactive = true;
            this.buttonMode = true;

            this.y = 45;
        }

        public disable() {
            this.interactive = false;
            this.buttonMode = false;
            this.price.visible = false;
            this.circle.visible = false;
            this.plus.visible = false;
        }

        public updateState(vo: Game.BusinessVO) {
            this.visible = vo.level !== 0;
            if (vo.hasManager) {
                this.circle.visible = false;
                this.plus.visible = false;
                this.price.visible = false;
                this.plus.scale.set(1);
                TweenMax.killTweensOf(this.plus.scale);
            } else {
                this.price.text = vo.managerPrice.toString();
                if (vo.managerPrice <= Connection.getCash()) {
                    this.buttonMode = true;
                    this.interactive = true;
                    TweenMax.to(this.plus.scale, 0.25, {
                        x: 1.1, y: 1.1, yoyo: true, repeat: -1,
                    });
                    this.plus.style.fill = "#ffc60c";
                } else {
                    this.plus.style.fill = "#CCCCCC";
                    this.buttonMode = false;
                    this.interactive = false;
                    TweenMax.killTweensOf(this.plus.scale);
                    this.plus.scale.set(1);
                }
            }
        }
    }
}