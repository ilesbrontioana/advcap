module Game {
    export class AdVentureCapitalist extends PIXI.Container {
        private static businesses: Game.Businesses;
        private static stats: Game.Stats;
        public static start() {
            Stage.init();
            Connection.init();
            Loader.startLoading(() => {
                this.addGameElements();
                this.addListeners();
            });
        }

        private static addListeners() {

            EventManager.addEventListener(StatsEvents.HireManager, (e) => {
                let id = e.params.id;
                this.businesses.spendCash(id);
            });
            EventManager.addEventListener(StatsEvents.Buy, (e) => {
                let id = e.params.id;
                this.businesses.spendCash(id);
            });
            EventManager.addEventListener(StatsEvents.CollectCash, (e) => {
                let id = e.params.id;
                this.businesses.collectCash(id);
            });
            EventManager.addEventListener(StatsEvents.UpgradeBussiness, (e) => {
                let id = e.params.id;
                this.businesses.collectCash(id);
            });
            EventManager.addEventListener(StatsEvents.UpdateStats, () => {
                this.businesses.updateStats();
                this.stats.updateCash();
            });
            EventManager.addEventListener(StatsEvents.UpdateCollectingTime, (e) => {
                this.businesses.updateTime(e.params.id);
            });
        }

        private static addGameElements() {
            this.businesses = new Businesses();
            this.stats = new Stats();
        }
    }
}