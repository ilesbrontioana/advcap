module Game {
    export class Building extends PIXI.Container {
        private buildingLevel1: PIXI.Sprite;
        private buildingLevel1Name: PIXI.Text;

        private buildingLevel2: PIXI.Sprite;
        private buildingLevel2Name: PIXI.Text;

        private buildingLevel3: PIXI.Sprite;
        private buildingLevel3Name: PIXI.Text;

        constructor() {
            super();
            let grayCircle: PIXI.Graphics = new PIXI.Graphics();
            grayCircle.beginFill(0x999999, 1);
            grayCircle.drawCircle(0, 0, 100);
            this.addChild(grayCircle);

            this.buildingLevel1 = new PIXI.Sprite(Stage.getTexture("level1"));
            this.buildingLevel1.anchor.set(0.5);
            this.buildingLevel1.scale.set(0.8);
            this.buildingLevel2 = new PIXI.Sprite(Stage.getTexture("level2"));
            this.buildingLevel2.anchor.set(0.5);
            this.buildingLevel2.scale.set(0.25);
            this.buildingLevel3 = new PIXI.Sprite(Stage.getTexture("level3"));
            this.buildingLevel3.anchor.set(0.5);
            this.buildingLevel3.scale.set(0.8);

            this.addChild(this.buildingLevel1);
            this.addChild(this.buildingLevel2);
            this.addChild(this.buildingLevel3);

            let circleMask: PIXI.Graphics = new PIXI.Graphics();
            circleMask.beginFill(0xffffff, 1);
            circleMask.drawCircle(0, 0, 100);

            this.mask = circleMask;
            this.addChild(circleMask);

            this.buildingLevel1Name = new PIXI.Text();
            this.buildingLevel1Name.anchor.set(0.5, 0);
            this.buildingLevel1Name.y = -50;
            this.buildingLevel1Name.style.fontFamily = "Modak";
            this.buildingLevel1Name.style.align = "center";
            this.buildingLevel1Name.style.wordWrap = true;
            this.buildingLevel1Name.style.wordWrapWidth = 150;
            this.addChild(this.buildingLevel1Name);

            this.buildingLevel2Name = new PIXI.Text();
            this.buildingLevel2Name.anchor.set(0.5, 0);
            this.buildingLevel2Name.y = -50;
            this.buildingLevel2Name.style.fontFamily = "Modak";
            this.buildingLevel2Name.style.align = "center";
            this.buildingLevel2Name.style.wordWrap = true;
            this.buildingLevel2Name.style.wordWrapWidth = 150;
            this.addChild(this.buildingLevel2Name);

            this.buildingLevel3Name = new PIXI.Text();
            this.buildingLevel3Name.anchor.set(0.5, 0);
            this.buildingLevel3Name.y = -50;
            this.buildingLevel3Name.style.fontFamily = "Modak";
            this.buildingLevel3Name.style.align = "center";
            this.buildingLevel3Name.style.wordWrap = true;
            this.buildingLevel3Name.style.wordWrapWidth = 150;
            this.addChild(this.buildingLevel3Name);
        }

        updateState(vo: Game.BusinessVO) {
            this.buildingLevel1Name.text = vo.level1Name.toLocaleUpperCase();
            this.buildingLevel2Name.text = vo.level2Name.toLocaleUpperCase();
            this.buildingLevel3Name.text = vo.level3Name.toLocaleUpperCase();
            this.buildingLevel1Name.visible = false;
            this.buildingLevel1.visible = false;
            this.buildingLevel2Name.visible = false;
            this.buildingLevel2.visible = false;
            this.buildingLevel3Name.visible = false;
            this.buildingLevel3.visible = false;
            if(vo.level === 2) {
                this.buildingLevel2Name.visible = true;
                this.buildingLevel2.visible = true;
            } else if(vo.level === 3) {
                this.buildingLevel3Name.visible = true;
                this.buildingLevel3.visible = true;
            } else {
                this.buildingLevel1Name.visible = true;
                this.buildingLevel1.visible = true;
            }
        }
    }
}