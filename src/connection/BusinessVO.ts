module Game {
    export class BusinessVO {
        public hasManager: boolean;
        public managerPrice: number;
        public level: number;
        public level1Price: number;
        public level2Price: number;
        public level3Price: number;
        public level1Win: number;
        public level2Win: number;
        public level3Win: number;
        public level1Name: string;
        public level2Name: string;
        public level3Name: string;
        public cashTime: number = -1;
        public upgradeTime: number = -1;
    }
}