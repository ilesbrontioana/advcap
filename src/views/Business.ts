///<reference path="Buy.ts"/>
module Game {
    export class Business extends PIXI.Container {

        private building: Building;
        private manager: Manager;
        private buy: Buy;

        private collectButton: PIXI.Button;
        private collectCircle: CollectingCircle;
        private collectClockText: PIXI.Text;


        private upgradeButton: PIXI.Button;
        private upgradeCircle: UpgradingCircle;
        private upgradeValueText: PIXI.Text;

        private coins: PIXI.Container = new PIXI.Container();

        private id: number;

        constructor(id: number) {
            super();

            this.name = id.toString();
            this.id = id;

            this.addUpgradeCircle();
            this.addCollectCircle();

            this.addBuilding();


            this.addCollectButton();
            this.addUpgradeButton();

            this.addBuyButton();
            this.addManager();

            this.addCoins();
            this.updateStats();
        }

        private addBuilding() {
            this.building = new Building();
            this.addChild(this.building);
        }

        private addBuyButton() {
            this.buy = new Buy();
            this.addChild(this.buy);

            this.buy.on("pointerup", () => {
                this.buy.disable();
                Connection.buy(this.id);
            });
        }

        private addCollectButton() {
            let under: PIXI.Graphics = new PIXI.Graphics();
            under.beginFill(0x000000, 1);
            under.drawRoundedRect(0, 0, 124, 39, 17);
            under.endFill();
            under.y = -2;
            under.x = -2;

            let up: PIXI.Graphics = new PIXI.Graphics();
            up.beginFill(0xffc60c, 1);
            up.drawRoundedRect(0, 0, 120, 35, 15);
            up.endFill();

            let hover: PIXI.Graphics = new PIXI.Graphics();
            hover.beginFill(0xffc60c, 1);
            hover.drawRoundedRect(0, 0, 120, 35, 15);
            hover.endFill();

            let down: PIXI.Graphics = new PIXI.Graphics();
            down.beginFill(0xffc60c, 1);
            down.drawRoundedRect(0, 0, 120, 35, 15);
            down.endFill();

            let disable: PIXI.Graphics = new PIXI.Graphics();
            disable.beginFill(0x999999, 1);
            disable.drawRoundedRect(0, 0, 120, 35, 15);
            disable.endFill();

            this.collectClockText = new PIXI.Text();
            this.collectClockText.anchor.set(0.5);
            this.collectClockText.x = 60;
            this.collectClockText.y = 26;
            this.collectClockText.style.fontFamily = "Bevan";
            this.collectClockText.style.fontSize = 14;
            this.collectClockText.style.fill = "#000000";

            let style = new PIXI.TextStyle({});
            style.fontFamily = "Modak";
            style.fontSize = 25;
            style.fill = "#000000";

            this.collectButton = new PIXI.Button("COLLECT", style);
            this.collectButton.addChildAt(under, 0);
            this.collectButton.upSkin.addChild(up);
            this.collectButton.hoverSkin.addChild(hover);
            this.collectButton.downSkin.addChild(down);
            this.collectButton.offSkin.addChild(disable);
            this.collectButton.setTextPosition(7, 0);
            this.collectButton.x = -60;
            this.collectButton.y = 100;

            this.collectButton.addChild(this.collectClockText);

            this.addChild(this.collectButton);

            this.collectButton.on("pointerup", () => {
                this.collectButton.disable();
                Connection.collectCash(this.id);
            });

        }

        private addCollectCircle() {
            this.collectCircle = new CollectingCircle();
            this.addChild(this.collectCircle);
        }

        private addManager() {
            this.manager = new Manager();
            this.addChild(this.manager);

            this.manager.on("pointerup", () => {
                this.manager.disable();
                Connection.hireManager(this.id);
            });
        }

        private addUpgradeButton() {
            let under: PIXI.Graphics = new PIXI.Graphics();
            under.beginFill(0x000000, 1);
            under.drawRoundedRect(0, 0, 124, 39, 17);
            under.endFill();
            under.y = -2;
            under.x = -2;

            let up: PIXI.Graphics = new PIXI.Graphics();
            up.beginFill(0x8e0cff, 1);
            up.drawRoundedRect(0, 0, 120, 35, 15);
            up.endFill();
            let hover: PIXI.Graphics = new PIXI.Graphics();
            hover.beginFill(0x8e0cff, 1);
            hover.drawRoundedRect(0, 0, 120, 35, 15);
            hover.endFill();
            let down: PIXI.Graphics = new PIXI.Graphics();
            down.beginFill(0x8e0cff, 1);
            down.drawRoundedRect(0, 0, 120, 35, 15);
            down.endFill();

            let disable: PIXI.Graphics = new PIXI.Graphics();
            disable.beginFill(0x999999, 1);
            disable.drawRoundedRect(0, 0, 120, 35, 15);
            disable.endFill();

            let style = new PIXI.TextStyle({});
            style.fontFamily = "Modak";
            style.fontSize = 25;
            style.fill = "#000000";

            this.upgradeButton = new PIXI.Button("UPGRADE", style);
            this.upgradeButton.addChildAt(under, 0);
            this.upgradeButton.upSkin.addChild(up);
            this.upgradeButton.hoverSkin.addChild(hover);
            this.upgradeButton.downSkin.addChild(down);
            this.upgradeButton.offSkin.addChild(disable);
            this.upgradeButton.setTextPosition(5, 0);

            this.upgradeValueText = new PIXI.Text();
            this.upgradeValueText.anchor.set(0.5);
            this.upgradeValueText.x = 60;
            this.upgradeValueText.y = 26;
            this.upgradeValueText.style.fontFamily = "Bevan";
            this.upgradeValueText.style.fontSize = 14;
            this.upgradeValueText.style.fill = "#000000";
            this.upgradeButton.addChild(this.upgradeValueText);

            this.upgradeButton.on("pointerup", () => {
                Connection.upgradeBusiness(this.id);
            });

            this.addChild(this.upgradeButton);
            this.upgradeButton.x = -60;
            this.upgradeButton.y = 137;

        }

        private addUpgradeCircle() {

            this.upgradeCircle = new UpgradingCircle();
            this.addChild(this.upgradeCircle);
        }

        public updateStats() {
            let vo = Connection.getBusinesses()[this.id];

            this.building.updateState(vo);
            this.buy.updateState(vo);
            this.manager.updateState(vo);
            this.collectCircle.updateState(vo);
            this.upgradeCircle.updateState(vo);
            this.updateButtons(vo);
        }

        private addCoins() {
            for (let i = 0; i < 5; i++) {
                let coin: PIXI.Sprite = new PIXI.Sprite(Stage.getTexture("cash"));
                coin.anchor.set(0.5);
                coin.width = 50;
                coin.height = 50;
                coin.visible = false;
                this.coins.addChild(coin);
            }
            this.addChild(this.coins);
        }

        public spendCash() {
            let cashPos = this.toLocal(new PIXI.Point(410, 75));
            for (let i = 0; i < this.coins.children.length; i++) {
                this.coins.children[i].visible = true;
                this.coins.children[i].scale.set(0.3);
                TweenLite.to(this.coins.children[i].scale, 0.25, {delay: 0.1 * i, x: 0.5, y: 0.5});
                TweenLite.to(this.coins.children[i].scale, 0.25, {delay: 0.1 * i + 0.25, x: 0, y: 0});
                TweenLite.fromTo(this.coins.children[i], 0.5, {x: cashPos.x, y: cashPos.y}, {
                    delay: 0.1 * i, x: 0, y: 0,
                    onComplete: () => {
                        this.coins.children[i].visible = false;
                    }
                });
            }

        }

        public collectCash() {
            let cashPos = this.toLocal(new PIXI.Point(410, 75));
            for (let i = 0; i < this.coins.children.length; i++) {
                this.coins.children[i].visible = true;
                this.coins.children[i].scale.set(0);
                TweenLite.to(this.coins.children[i].scale, 0.25, {delay: 0.1 * i, x: 0.5, y: 0.5});
                TweenLite.to(this.coins.children[i].scale, 0.25, {delay: 0.1 * i + 0.25, x: 0.3, y: 0.3});
                TweenLite.fromTo(this.coins.children[i], 0.5, {x: 0, y: 0,}, {
                    delay: 0.1 * i, x: cashPos.x, y: cashPos.y,
                    onComplete: () => {
                        this.coins.children[i].visible = false;
                    }
                });
            }
        }

        private updateButtons(vo: BusinessVO) {
            if (vo.level === 0) {
                this.collectButton.visible = false;
                this.upgradeButton.visible = false;
            } else {
                this.collectButton.visible = true;
                this.collectButton.disable();
                if (vo.hasManager) {
                    this.upgradeButton.visible = true;
                    this.upgradeButton.disable();
                    if (vo.level === 1) {
                        this.upgradeValueText.text = vo.level2Price.toString();
                    } else if (vo.level === 2) {
                        this.upgradeValueText.text = vo.level3Price.toString();
                    }
                    if (vo.upgradeTime === 0) {
                        if (vo.level === 1 && Connection.getCash() >= vo.level2Price) {
                            this.upgradeButton.enable();
                        } else if (vo.level === 2 && Connection.getCash() >= vo.level3Price) {
                            this.upgradeButton.enable();
                        }
                    }
                } else {
                    if (vo.cashTime === 0) {
                        this.collectButton.enable();
                    }
                }

            }
        }

        public updateTime(id: number) {
            if (this.name === id.toString()) {
                let cashTime = Connection.getBusinesses()[id].cashTime;
                if (cashTime < 10) {
                    this.collectClockText.text = "00:0" + cashTime.toString();
                } else if (cashTime < 60) {
                    this.collectClockText.text = "00:" + cashTime.toString();
                } else {
                    this.collectClockText.text = (cashTime / 60).toString() + ":" + (cashTime % 60).toString();
                }

                if (cashTime === 0) {
                    this.collectClockText.text = "00:00";
                    this.collectButton.enable();
                } else {
                    this.collectButton.disable();
                }
            }
        }
    }
}