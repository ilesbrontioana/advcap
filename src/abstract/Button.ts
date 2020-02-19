module PIXI {
    export class Button extends PIXI.Container {
        /**
        * Checks if the button is pressed down
         */
        private isDown: boolean;

        /**
         * Checks if the button is hovered by the mouse cursor
         */
        private isOver: boolean;

        /**
         * The text of the button
         */
        private text: PIXI.Text;

        /**
         * Up skin of the button
         */
        public upSkin: PIXI.Container;

        /**
         * Hover skin of the button
         */
        public hoverSkin: PIXI.Container;

        /**
         * Down skin of the button
         */
        public downSkin: PIXI.Container;

        /**
         * Off skin of the button
         */
        public offSkin: PIXI.Container;


        constructor(name: string, textStyle: PIXI.TextStyle) {
            super();
            this.name = name;

            this.upSkin = new PIXI.Container();
            this.hoverSkin = new PIXI.Container();
            this.downSkin = new PIXI.Container();
            this.offSkin = new PIXI.Container();

            this.addChild(this.upSkin);
            this.addChild(this.hoverSkin);
            this.addChild(this.downSkin);
            this.addChild(this.offSkin);

            this.upSkin.visible = true;
            this.downSkin.visible = false;
            this.hoverSkin.visible = false;
            this.offSkin.visible = false;

            /**
             * Set button mode and events
             */
            this.buttonMode = true;
            this.interactive = true;
            this.on('pointerdown', this.onButtonDown)
                .on('pointerup', this.onButtonUp)
                .on('pointerupoutside', this.onButtonUp)
                .on('pointerover', this.onButtonOver)
                .on('pointerout', this.onButtonOut);

            /**
             * Add the button text, that is empty for now
             * All text styles are the default text style
             */
            this.text = new PIXI.Text(this.name);
            this.text.anchor.set(0);
            this.text.style = textStyle;
            this.addChild(this.text);
        }

        /**
         * Update the text position
         * @param x
         * @param y
         */
        public setTextPosition(x: number, y: number) {
            this.text.x = x;
            this.text.y = y;
        }


        /**
         * Enable the button
         */
        public enable() {
            if (!this.interactive) {
                this.interactive = true;
                this.offSkin.visible = false;
                this.hoverSkin.visible = false;
                this.downSkin.visible = false;
                this.upSkin.visible = true;
            }
        }

        /**
         * Disable the button
         */
        public disable() {
            if(this.interactive) {
                this.interactive = false;
                this.offSkin.visible = true;
                this.hoverSkin.visible = false;
                this.downSkin.visible = false;
                this.upSkin.visible = false;
            }
        }

        /**
         * Show the button
         */
        public show(){
            if(!this.visible) {
                this.visible = true;
            }
        }

        /**
         * Hide the button
         */
        public hide(){
            if(this.visible) {
                this.visible = false;
            }
        }

        /**
         * Update the skin when button is down
         */
        public onButtonDown() {
            this.isDown = true;
            this.upSkin.visible = false;
            this.hoverSkin.visible = false;
            this.downSkin.visible = true;
        }

        /**
         * Update the skin when button is up
         */
        public onButtonUp() {
            this.isDown = false;
            if (this.isOver) {
                this.upSkin.visible = false;
                this.hoverSkin.visible = true;
                this.downSkin.visible = false;
            } else {
                this.upSkin.visible = true;
                this.hoverSkin.visible = false;
                this.downSkin.visible = false;
            }
        }

        /**
         * Update the skin when button is hovered
         */
        public onButtonOver() {
            this.isOver = true;
            if (this.isDown) {
                return;
            }
            this.upSkin.visible = false;
            this.hoverSkin.visible = true;
            this.downSkin.visible = false;
        }

        /**
         * Update the skin when button is not hovered anymore
         */
        public onButtonOut() {
            this.isOver = false;
            if (this.isDown) {
                return;
            }
            this.upSkin.visible = true;
            this.hoverSkin.visible = false;
            this.downSkin.visible = false;
        }
    }
}