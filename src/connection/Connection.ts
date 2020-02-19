module Game {
    export class Connection {

        static set cash(value: number) {
            this._cash = value;
            EventManager.dispatchEvent(StatsEvents.UpdateStats);
        }

        private static _cash: number;
        private static _businesses: BusinessVO[];

        static init() {
            this._cash = 10;
            this._businesses = [];

            let businessesNames = [
                ["apple cart", "store", "supermarket"],
                ["coffee cart", "bar", "club"],
                ["hot dog cart", "pizzeria", "restaurant"],
                ["flower cart", "flower shop", "flower greenhouse"],
                ["ice cream cart", "cookie store", "cake store"],
                ["newspaper delivery", "newspaper store", "news company"],
                ["car wash", "car repair shop", "car dealer"],
                ["slot machine", "betting agency", "casino"],
                ["gas station", "electric charging station", "solar power plant"],
                ["photo booth", "photo studio", "movie studio"],
            ];

            for (let id = 0; id < 10; id++) {
                let business: BusinessVO = new BusinessVO();
                business.level = 0;
                business.hasManager = false;
                business.level1Name = businessesNames[id][0];
                business.level2Name = businessesNames[id][1];
                business.level3Name = businessesNames[id][2];
                business.level1Price = (id + 1) * 10;
                business.level2Price = (id + 1) * 10;
                business.level3Price = (id + 1) * 10;
                business.level1Win = (id + 1) * 20;
                business.level2Win = (id + 1) * 40;
                business.level3Win = (id + 1) * 60;
                business.managerPrice = (id + 1) * 5;
                this._businesses.push(business);
            }
        }

        static getCash(): number {
            return this._cash;
        }

        static getBusinesses(): BusinessVO[] {
            return this._businesses;
        }

        static buy(id) {
            this._businesses[id].level++;
            this.cash = this._cash - this._businesses[id].level1Price;
            this._businesses[id].cashTime = (id + 1) * 5;
            this.startCollectTimer(id);
            EventManager.dispatchEvent(StatsEvents.Buy, {id: id});

        }

        static collectCash(id: number) {
            if(this._businesses[id].level === 1) {
                this.cash = this._cash + this._businesses[id].level1Win;
            } else if(this._businesses[id].level === 2) {
                this.cash = this._cash + this._businesses[id].level2Win;
            } else {
                this.cash = this._cash + this._businesses[id].level2Win;
            }
            this._businesses[id].cashTime = (id + 1) * 5;
            this.startCollectTimer(id);
            EventManager.dispatchEvent(StatsEvents.CollectCash, {id: id});
        }

        static upgradeBusiness(id: number) {
            this._businesses[id].upgradeTime = 0;
            this._businesses[id].level++;
            if (this._businesses[id].level === 2) {
                this.cash = this._cash - this._businesses[id].level2Price;
            }
            if (this._businesses[id].level === 3) {
                this.cash = this._cash - this._businesses[id].level3Price;
            }
            EventManager.dispatchEvent(StatsEvents.UpgradeBussiness, {id: id});
        }

        private static startCollectTimer(id: any) {
            if (this._businesses[id].cashTime > 0) {
                TweenLite.delayedCall(1, () => {
                    this._businesses[id].cashTime--;
                    EventManager.dispatchEvent(StatsEvents.UpdateCollectingTime, {id: id});
                    this.startCollectTimer(id);
                });
            } else {
                if (this._businesses[id].hasManager) {
                    this.collectCash(id);
                }
            }
        }

        static hireManager(id: number) {
            this._businesses[id].upgradeTime = 0;
            this._businesses[id].hasManager = true;
            this.cash = this._cash - this._businesses[id].managerPrice;
            EventManager.dispatchEvent(StatsEvents.HireManager, {id: id});
        }
    }
}