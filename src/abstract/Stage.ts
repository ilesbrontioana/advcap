module Game {
    import WebGLRenderer = PIXI.WebGLRenderer;

    export class Stage {
        static get renderer(): PIXI.CanvasRenderer | PIXI.WebGLRenderer {
            return this._renderer;
        }
        private static _renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
        private static application: PIXI.Application;

        public static LANDSCAPE: string = "StageOrientation.Landscape";
        public static PORTRAIT: string = "StageOrientation.Portrait";
        public static orientation: string;

        public static init() {
            let resolution = window.devicePixelRatio || 1;
            this.application = new PIXI.Application({
                width: window.innerWidth,
                height: window.innerHeight,
                resolution: resolution,
                autoResize: true,
                backgroundColor: 0xffffff,
                clearBeforeRender: true,
                antialias: true

            });

            this._renderer = this.application.renderer;

            document.body.appendChild(this.application.view);

            PIXI.settings.MIPMAP_TEXTURES = true;

            this.renderer.view.style.position = 'absolute';
            this.renderer.view.style.left = '0';
            this.renderer.view.style.top = '0';

            this.renderer.plugins.interaction.moveWhenInside = true;


            this.resize();
            window.onresize = () => {
                this.resize();
            };
        }

        protected static resize() {
            let oldOrientation = this.orientation;
            if (window.innerWidth > window.innerHeight) {
                this.orientation = this.LANDSCAPE;
            } else {
                this.orientation = this.PORTRAIT;
            }
            this.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
            EventManager.dispatchEvent(StageEvent.ScreenResize);
        }

        static addChild(child: PIXI.DisplayObject) {
            this.application.stage.addChild(child);
        }

        static getTexture(name: string) {
            let texture: PIXI.Texture;
            try {
                texture = PIXI.Texture.fromFrame(name + '.png');
            } catch {
                try {
                    texture = PIXI.Texture.fromFrame(name + '.jpg');
                } catch {
                    try {
                        texture = PIXI.Texture.fromFrame(name);
                    } catch {
                        console.error("Error, file " + name + " not found");
                        texture = PIXI.Texture.EMPTY;
                    }
                }
            }
            return texture;
        }
    }

    export class StageEvent {
        static ScreenResize: string = "StageEvent.ScreenResize";
    }

}