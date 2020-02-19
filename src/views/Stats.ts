///<reference path="./GameContainer.ts"/>
module Game {

    export class StatsEvents {
        public static UpdateStats:string = "StatsEvents.UpdateStats";
        public static UpdateCollectingTime:string = "StatsEvents.UpdateCollectingTime";
        public static CollectCash:string = "StatsEvents.CollectCash";
        public static HireManager:string = "StatsEvents.HireManager";
        public static UpgradeBussiness:string = "StatsEvents.UpgradeBussiness";
        public static Buy:string = "StatsEvents.Buy";
    }

    export class Stats  extends  GameContainer {

        private cash: PIXI.Text;
        private title: PIXI.Text;
        private cashIcon: PIXI.Sprite;

        protected add() {
            super.add();
            this.addTitle();
            this.addCash();
        }

        public updateCash() {
            let tweenObj: {x: number} = {x: 0};
            tweenObj.x = parseInt(this.cash.text);
            TweenLite.to(tweenObj, 0.5, {
                x:  Connection.getCash(),
                onUpdate: () => {
                    this.cash.text = tweenObj.x.toFixed(0).toString();
                }
            })
        }

        private addCash() {
            this.cash = new PIXI.Text(Connection.getCash().toString());
            this.cash.style.fontFamily = "Bevan";
            this.cash.style.fontSize = 60;
            this.cash.style.fill = "#000000";
            this.addChild(this.cash);

            this.cashIcon = new PIXI.Sprite(Stage.getTexture("cash"));
            this.cashIcon.anchor.set(0.5);
            this.cashIcon.width = 50;
            this.cashIcon.height = 50;
            this.addChild(this.cashIcon);

            this.cash.x = 440;
            this.cash.y = 30;

            this.cashIcon.x = 410;
            this.cashIcon.y = 75;
        }

        private addTitle() {
            this.title = new PIXI.Text("AdVenture\nCapitalist");
            this.title.anchor.set(0, 0);
            this.title.style.fontFamily = "Modak";
            this.title.style.fontSize = 60;
            this.title.style.align = "center";
            this.title.style.fill = "#000000";
            this.title.style.stroke = "#ffc60c";
            this.title.style.strokeThickness = 10;
            this.title.style.lineHeight = 55;
            this.addChild(this.title);

            this.title.x = 10;
            this.title.y = 10;
        }
    }
}