///<reference path="./GameContainer.ts"/>
module Game {
    export class Businesses extends GameContainer {
        private businesses: Business[];

        protected add() {
            super.add();
            this.businesses = [];
            let businessesVO: BusinessVO[] = Connection.getBusinesses();
            for(let i = 0; i < businessesVO.length; i++) {
                let business = new Business(i);
                business.x = 200 + Math.floor(i / 2) * 350;
                business.y = 350 + (i % 2) * 350;
                this.addChild(business);
                this.businesses.push(business);
            }
        }

        spendCash(id: number) {
            this.businesses[id].spendCash();
        }
        collectCash(id: number) {
            this.businesses[id].collectCash();
        }

        updateTime(id: any) {
            this.businesses[id].updateTime(id);
        }

        updateStats() {
            for(let i = 0; i < this.businesses.length; i++) {
                this.businesses[i].updateStats();
            }
        }
    }
}