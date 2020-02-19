module Game {
    export class Buy extends PIXI.Container {
        private buyText: PIXI.Text;
        private priceText: PIXI.Text;

        constructor() {
            super();
            let overCircle: PIXI.Graphics = new PIXI.Graphics();
            overCircle.beginFill(0x000000, 0.65);
            overCircle.drawCircle(0, 0, 100);
            this.addChild(overCircle);

            this.buyText = new PIXI.Text("BUY");
            this.buyText.anchor.set(0.5);
            this.addChild(this.buyText);

            this.priceText = new PIXI.Text();
            this.priceText.anchor.set(0.5);
            this.priceText.style.fontFamily = "Bevan";
            this.priceText.style.fontSize = 40;
            this.priceText.style.fill = "#ffffff";
            this.priceText.y = 20;
            this.addChild(this.priceText);
        }

        updateState(vo: BusinessVO) {
            this.priceText.text = vo.level1Price.toString();
            this.visible = vo.level === 0;

            if(vo.level === 0) {
                if(vo.level1Price <= Connection.getCash()) {
                    if(!this.interactive) {
                        this.interactive = true;
                        this.buttonMode = true;
                        this.buyText.text = "BUY";
                        this.buyText.style.fontFamily = "Modak";
                        this.buyText.style.fontSize = 50;
                        this.buyText.style.fill = "#ffc60c";
                        this.buyText.y = -30;
                        TweenMax.to(this.buyText.scale, 0.25, {
                            x: 1.2, y: 1.2, yoyo: true, repeat: -1,
                        });
                    }
                } else {
                    this.interactive = false;
                    this.buttonMode = false;
                    TweenMax.killTweensOf(this.buyText.scale);
                    this.buyText.scale.set(1);
                    this.buyText.text = "NO MONEY";
                    this.buyText.style.fontFamily = "Modak";
                    this.buyText.style.fontSize = 35;
                    this.buyText.style.fill = "#CCCCCC";
                    this.buyText.y = -20;
                }
            }

        }

        disable() {
            this.buyText.visible = false;
            TweenLite.to(this, 0.5, {
                alpha: 0, onComplete: () => {
                    TweenMax.killTweensOf(this.buyText.scale);
                    this.visible = false;
                }
            });
        }
    }
}