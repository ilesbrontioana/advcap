module  Game {
    export class Loader {

        private static pngs: string[] = [
            "cash",
            "level1",
            "level2",
            "level3",
            "manager",
        ];

        private static pixiLoader = new PIXI.loaders.Loader();

        static startLoading(callback: () => void) {
            for (let i = 0; i < this.pngs.length; i++) {
                this.pixiLoader.add(this.pngs[i], "assets/" + this.pngs[i] + ".png");
            }
            this.pixiLoader.onComplete.once((e) => {
                callback();
            });
            this.pixiLoader.load();
        }
    }
}