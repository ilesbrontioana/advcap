var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game) {
    var AdVentureCapitalist = (function (_super) {
        __extends(AdVentureCapitalist, _super);
        function AdVentureCapitalist() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdVentureCapitalist.start = function () {
            var _this = this;
            Game.Stage.init();
            Game.Connection.init();
            Game.Loader.startLoading(function () {
                _this.addGameElements();
                _this.addListeners();
            });
        };
        AdVentureCapitalist.addListeners = function () {
            var _this = this;
            Game.EventManager.addEventListener(Game.StatsEvents.HireManager, function (e) {
                var id = e.params.id;
                _this.businesses.spendCash(id);
            });
            Game.EventManager.addEventListener(Game.StatsEvents.Buy, function (e) {
                var id = e.params.id;
                _this.businesses.spendCash(id);
            });
            Game.EventManager.addEventListener(Game.StatsEvents.CollectCash, function (e) {
                var id = e.params.id;
                _this.businesses.collectCash(id);
            });
            Game.EventManager.addEventListener(Game.StatsEvents.UpgradeBussiness, function (e) {
                var id = e.params.id;
                _this.businesses.collectCash(id);
            });
            Game.EventManager.addEventListener(Game.StatsEvents.UpdateStats, function () {
                _this.businesses.updateStats();
                _this.stats.updateCash();
            });
            Game.EventManager.addEventListener(Game.StatsEvents.UpdateCollectingTime, function (e) {
                _this.businesses.updateTime(e.params.id);
            });
        };
        AdVentureCapitalist.addGameElements = function () {
            this.businesses = new Game.Businesses();
            this.stats = new Game.Stats();
        };
        return AdVentureCapitalist;
    }(PIXI.Container));
    Game.AdVentureCapitalist = AdVentureCapitalist;
})(Game || (Game = {}));
var PIXI;
(function (PIXI) {
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(name, textStyle) {
            var _this = _super.call(this) || this;
            _this.name = name;
            _this.upSkin = new PIXI.Container();
            _this.hoverSkin = new PIXI.Container();
            _this.downSkin = new PIXI.Container();
            _this.offSkin = new PIXI.Container();
            _this.addChild(_this.upSkin);
            _this.addChild(_this.hoverSkin);
            _this.addChild(_this.downSkin);
            _this.addChild(_this.offSkin);
            _this.upSkin.visible = true;
            _this.downSkin.visible = false;
            _this.hoverSkin.visible = false;
            _this.offSkin.visible = false;
            _this.buttonMode = true;
            _this.interactive = true;
            _this.on('pointerdown', _this.onButtonDown)
                .on('pointerup', _this.onButtonUp)
                .on('pointerupoutside', _this.onButtonUp)
                .on('pointerover', _this.onButtonOver)
                .on('pointerout', _this.onButtonOut);
            _this.text = new PIXI.Text(_this.name);
            _this.text.anchor.set(0);
            _this.text.style = textStyle;
            _this.addChild(_this.text);
            return _this;
        }
        Button.prototype.setTextPosition = function (x, y) {
            this.text.x = x;
            this.text.y = y;
        };
        Button.prototype.enable = function () {
            if (!this.interactive) {
                this.interactive = true;
                this.offSkin.visible = false;
                this.hoverSkin.visible = false;
                this.downSkin.visible = false;
                this.upSkin.visible = true;
            }
        };
        Button.prototype.disable = function () {
            if (this.interactive) {
                this.interactive = false;
                this.offSkin.visible = true;
                this.hoverSkin.visible = false;
                this.downSkin.visible = false;
                this.upSkin.visible = false;
            }
        };
        Button.prototype.show = function () {
            if (!this.visible) {
                this.visible = true;
            }
        };
        Button.prototype.hide = function () {
            if (this.visible) {
                this.visible = false;
            }
        };
        Button.prototype.onButtonDown = function () {
            this.isDown = true;
            this.upSkin.visible = false;
            this.hoverSkin.visible = false;
            this.downSkin.visible = true;
        };
        Button.prototype.onButtonUp = function () {
            this.isDown = false;
            if (this.isOver) {
                this.upSkin.visible = false;
                this.hoverSkin.visible = true;
                this.downSkin.visible = false;
            }
            else {
                this.upSkin.visible = true;
                this.hoverSkin.visible = false;
                this.downSkin.visible = false;
            }
        };
        Button.prototype.onButtonOver = function () {
            this.isOver = true;
            if (this.isDown) {
                return;
            }
            this.upSkin.visible = false;
            this.hoverSkin.visible = true;
            this.downSkin.visible = false;
        };
        Button.prototype.onButtonOut = function () {
            this.isOver = false;
            if (this.isDown) {
                return;
            }
            this.upSkin.visible = true;
            this.hoverSkin.visible = false;
            this.downSkin.visible = false;
        };
        return Button;
    }(PIXI.Container));
    PIXI.Button = Button;
})(PIXI || (PIXI = {}));
var Game;
(function (Game) {
    var EventManager = (function () {
        function EventManager() {
        }
        EventManager.addEventListener = function (eventName, callback) {
            window.addEventListener(eventName, callback);
        };
        EventManager.removeEventListener = function (eventName, callback) {
            window.removeEventListener(eventName, callback);
        };
        EventManager.dispatchEvent = function (eventName, params) {
            if (params === void 0) { params = null; }
            var event = this.getEvent(eventName, params);
            event["params"] = params;
            window.dispatchEvent(event);
        };
        EventManager.getEvent = function (eventName, params) {
            if (params === void 0) { params = null; }
            var event;
            if (typeof (Event) === 'function') {
                event = new Event(eventName, params);
            }
            else {
                event = document.createEvent('Event');
                event.initEvent(eventName, true, true);
            }
            return event;
        };
        return EventManager;
    }());
    Game.EventManager = EventManager;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Loader = (function () {
        function Loader() {
        }
        Loader.startLoading = function (callback) {
            for (var i = 0; i < this.pngs.length; i++) {
                this.pixiLoader.add(this.pngs[i], "assets/" + this.pngs[i] + ".png");
            }
            this.pixiLoader.onComplete.once(function (e) {
                callback();
            });
            this.pixiLoader.load();
        };
        Loader.pngs = [
            "cash",
            "level1",
            "level2",
            "level3",
            "manager",
        ];
        Loader.pixiLoader = new PIXI.loaders.Loader();
        return Loader;
    }());
    Game.Loader = Loader;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Stage = (function () {
        function Stage() {
        }
        Object.defineProperty(Stage, "renderer", {
            get: function () {
                return this._renderer;
            },
            enumerable: true,
            configurable: true
        });
        Stage.init = function () {
            var _this = this;
            var resolution = window.devicePixelRatio || 1;
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
            window.onresize = function () {
                _this.resize();
            };
        };
        Stage.resize = function () {
            var oldOrientation = this.orientation;
            if (window.innerWidth > window.innerHeight) {
                this.orientation = this.LANDSCAPE;
            }
            else {
                this.orientation = this.PORTRAIT;
            }
            this.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
            Game.EventManager.dispatchEvent(StageEvent.ScreenResize);
        };
        Stage.addChild = function (child) {
            this.application.stage.addChild(child);
        };
        Stage.getTexture = function (name) {
            var texture;
            try {
                texture = PIXI.Texture.fromFrame(name + '.png');
            }
            catch (_a) {
                try {
                    texture = PIXI.Texture.fromFrame(name + '.jpg');
                }
                catch (_b) {
                    try {
                        texture = PIXI.Texture.fromFrame(name);
                    }
                    catch (_c) {
                        console.error("Error, file " + name + " not found");
                        texture = PIXI.Texture.EMPTY;
                    }
                }
            }
            return texture;
        };
        Stage.LANDSCAPE = "StageOrientation.Landscape";
        Stage.PORTRAIT = "StageOrientation.Portrait";
        return Stage;
    }());
    Game.Stage = Stage;
    var StageEvent = (function () {
        function StageEvent() {
        }
        StageEvent.ScreenResize = "StageEvent.ScreenResize";
        return StageEvent;
    }());
    Game.StageEvent = StageEvent;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var BusinessVO = (function () {
        function BusinessVO() {
            this.cashTime = -1;
            this.upgradeTime = -1;
        }
        return BusinessVO;
    }());
    Game.BusinessVO = BusinessVO;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Connection = (function () {
        function Connection() {
        }
        Object.defineProperty(Connection, "cash", {
            set: function (value) {
                this._cash = value;
                Game.EventManager.dispatchEvent(Game.StatsEvents.UpdateStats);
            },
            enumerable: true,
            configurable: true
        });
        Connection.init = function () {
            this._cash = 10;
            this._businesses = [];
            var businessesNames = [
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
            for (var id = 0; id < 10; id++) {
                var business = new Game.BusinessVO();
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
        };
        Connection.getCash = function () {
            return this._cash;
        };
        Connection.getBusinesses = function () {
            return this._businesses;
        };
        Connection.buy = function (id) {
            this._businesses[id].level++;
            this.cash = this._cash - this._businesses[id].level1Price;
            this._businesses[id].cashTime = (id + 1) * 5;
            this.startCollectTimer(id);
            Game.EventManager.dispatchEvent(Game.StatsEvents.Buy, { id: id });
        };
        Connection.collectCash = function (id) {
            if (this._businesses[id].level === 1) {
                this.cash = this._cash + this._businesses[id].level1Win;
            }
            else if (this._businesses[id].level === 2) {
                this.cash = this._cash + this._businesses[id].level2Win;
            }
            else {
                this.cash = this._cash + this._businesses[id].level2Win;
            }
            this._businesses[id].cashTime = (id + 1) * 5;
            this.startCollectTimer(id);
            Game.EventManager.dispatchEvent(Game.StatsEvents.CollectCash, { id: id });
        };
        Connection.upgradeBusiness = function (id) {
            this._businesses[id].upgradeTime = 0;
            this._businesses[id].level++;
            if (this._businesses[id].level === 2) {
                this.cash = this._cash - this._businesses[id].level2Price;
            }
            if (this._businesses[id].level === 3) {
                this.cash = this._cash - this._businesses[id].level3Price;
            }
            Game.EventManager.dispatchEvent(Game.StatsEvents.UpgradeBussiness, { id: id });
        };
        Connection.startCollectTimer = function (id) {
            var _this = this;
            if (this._businesses[id].cashTime > 0) {
                TweenLite.delayedCall(1, function () {
                    _this._businesses[id].cashTime--;
                    Game.EventManager.dispatchEvent(Game.StatsEvents.UpdateCollectingTime, { id: id });
                    _this.startCollectTimer(id);
                });
            }
            else {
                if (this._businesses[id].hasManager) {
                    this.collectCash(id);
                }
            }
        };
        Connection.hireManager = function (id) {
            this._businesses[id].upgradeTime = 0;
            this._businesses[id].hasManager = true;
            this.cash = this._cash - this._businesses[id].managerPrice;
            Game.EventManager.dispatchEvent(Game.StatsEvents.HireManager, { id: id });
        };
        return Connection;
    }());
    Game.Connection = Connection;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Building = (function (_super) {
        __extends(Building, _super);
        function Building() {
            var _this = _super.call(this) || this;
            var grayCircle = new PIXI.Graphics();
            grayCircle.beginFill(0x999999, 1);
            grayCircle.drawCircle(0, 0, 100);
            _this.addChild(grayCircle);
            _this.buildingLevel1 = new PIXI.Sprite(Game.Stage.getTexture("level1"));
            _this.buildingLevel1.anchor.set(0.5);
            _this.buildingLevel1.scale.set(0.8);
            _this.buildingLevel2 = new PIXI.Sprite(Game.Stage.getTexture("level2"));
            _this.buildingLevel2.anchor.set(0.5);
            _this.buildingLevel2.scale.set(0.25);
            _this.buildingLevel3 = new PIXI.Sprite(Game.Stage.getTexture("level3"));
            _this.buildingLevel3.anchor.set(0.5);
            _this.buildingLevel3.scale.set(0.8);
            _this.addChild(_this.buildingLevel1);
            _this.addChild(_this.buildingLevel2);
            _this.addChild(_this.buildingLevel3);
            var circleMask = new PIXI.Graphics();
            circleMask.beginFill(0xffffff, 1);
            circleMask.drawCircle(0, 0, 100);
            _this.mask = circleMask;
            _this.addChild(circleMask);
            _this.buildingLevel1Name = new PIXI.Text();
            _this.buildingLevel1Name.anchor.set(0.5, 0);
            _this.buildingLevel1Name.y = -50;
            _this.buildingLevel1Name.style.fontFamily = "Modak";
            _this.buildingLevel1Name.style.align = "center";
            _this.buildingLevel1Name.style.wordWrap = true;
            _this.buildingLevel1Name.style.wordWrapWidth = 150;
            _this.addChild(_this.buildingLevel1Name);
            _this.buildingLevel2Name = new PIXI.Text();
            _this.buildingLevel2Name.anchor.set(0.5, 0);
            _this.buildingLevel2Name.y = -50;
            _this.buildingLevel2Name.style.fontFamily = "Modak";
            _this.buildingLevel2Name.style.align = "center";
            _this.buildingLevel2Name.style.wordWrap = true;
            _this.buildingLevel2Name.style.wordWrapWidth = 150;
            _this.addChild(_this.buildingLevel2Name);
            _this.buildingLevel3Name = new PIXI.Text();
            _this.buildingLevel3Name.anchor.set(0.5, 0);
            _this.buildingLevel3Name.y = -50;
            _this.buildingLevel3Name.style.fontFamily = "Modak";
            _this.buildingLevel3Name.style.align = "center";
            _this.buildingLevel3Name.style.wordWrap = true;
            _this.buildingLevel3Name.style.wordWrapWidth = 150;
            _this.addChild(_this.buildingLevel3Name);
            return _this;
        }
        Building.prototype.updateState = function (vo) {
            this.buildingLevel1Name.text = vo.level1Name.toLocaleUpperCase();
            this.buildingLevel2Name.text = vo.level2Name.toLocaleUpperCase();
            this.buildingLevel3Name.text = vo.level3Name.toLocaleUpperCase();
            this.buildingLevel1Name.visible = false;
            this.buildingLevel1.visible = false;
            this.buildingLevel2Name.visible = false;
            this.buildingLevel2.visible = false;
            this.buildingLevel3Name.visible = false;
            this.buildingLevel3.visible = false;
            if (vo.level === 2) {
                this.buildingLevel2Name.visible = true;
                this.buildingLevel2.visible = true;
            }
            else if (vo.level === 3) {
                this.buildingLevel3Name.visible = true;
                this.buildingLevel3.visible = true;
            }
            else {
                this.buildingLevel1Name.visible = true;
                this.buildingLevel1.visible = true;
            }
        };
        return Building;
    }(PIXI.Container));
    Game.Building = Building;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Buy = (function (_super) {
        __extends(Buy, _super);
        function Buy() {
            var _this = _super.call(this) || this;
            var overCircle = new PIXI.Graphics();
            overCircle.beginFill(0x000000, 0.65);
            overCircle.drawCircle(0, 0, 100);
            _this.addChild(overCircle);
            _this.buyText = new PIXI.Text("BUY");
            _this.buyText.anchor.set(0.5);
            _this.addChild(_this.buyText);
            _this.priceText = new PIXI.Text();
            _this.priceText.anchor.set(0.5);
            _this.priceText.style.fontFamily = "Bevan";
            _this.priceText.style.fontSize = 40;
            _this.priceText.style.fill = "#ffffff";
            _this.priceText.y = 20;
            _this.addChild(_this.priceText);
            return _this;
        }
        Buy.prototype.updateState = function (vo) {
            this.priceText.text = vo.level1Price.toString();
            this.visible = vo.level === 0;
            if (vo.level === 0) {
                if (vo.level1Price <= Game.Connection.getCash()) {
                    if (!this.interactive) {
                        this.interactive = true;
                        this.buttonMode = true;
                        this.buyText.text = "BUY";
                        this.buyText.style.fontFamily = "Modak";
                        this.buyText.style.fontSize = 50;
                        this.buyText.style.fill = "#ffc60c";
                        this.buyText.y = -30;
                        TweenMax.to(this.buyText.scale, 0.25, {
                            x: 1.2, y: 1.2, yoyo: true, repeat: -1,
                        });
                    }
                }
                else {
                    this.interactive = false;
                    this.buttonMode = false;
                    TweenMax.killTweensOf(this.buyText.scale);
                    this.buyText.scale.set(1);
                    this.buyText.text = "NO MONEY";
                    this.buyText.style.fontFamily = "Modak";
                    this.buyText.style.fontSize = 35;
                    this.buyText.style.fill = "#CCCCCC";
                    this.buyText.y = -20;
                }
            }
        };
        Buy.prototype.disable = function () {
            var _this = this;
            this.buyText.visible = false;
            TweenLite.to(this, 0.5, {
                alpha: 0, onComplete: function () {
                    TweenMax.killTweensOf(_this.buyText.scale);
                    _this.visible = false;
                }
            });
        };
        return Buy;
    }(PIXI.Container));
    Game.Buy = Buy;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Business = (function (_super) {
        __extends(Business, _super);
        function Business(id) {
            var _this = _super.call(this) || this;
            _this.coins = new PIXI.Container();
            _this.name = id.toString();
            _this.id = id;
            _this.addUpgradeCircle();
            _this.addCollectCircle();
            _this.addBuilding();
            _this.addCollectButton();
            _this.addUpgradeButton();
            _this.addBuyButton();
            _this.addManager();
            _this.addCoins();
            _this.updateStats();
            return _this;
        }
        Business.prototype.addBuilding = function () {
            this.building = new Game.Building();
            this.addChild(this.building);
        };
        Business.prototype.addBuyButton = function () {
            var _this = this;
            this.buy = new Game.Buy();
            this.addChild(this.buy);
            this.buy.on("pointerup", function () {
                _this.buy.disable();
                Game.Connection.buy(_this.id);
            });
        };
        Business.prototype.addCollectButton = function () {
            var _this = this;
            var under = new PIXI.Graphics();
            under.beginFill(0x000000, 1);
            under.drawRoundedRect(0, 0, 124, 39, 17);
            under.endFill();
            under.y = -2;
            under.x = -2;
            var up = new PIXI.Graphics();
            up.beginFill(0xffc60c, 1);
            up.drawRoundedRect(0, 0, 120, 35, 15);
            up.endFill();
            var hover = new PIXI.Graphics();
            hover.beginFill(0xffc60c, 1);
            hover.drawRoundedRect(0, 0, 120, 35, 15);
            hover.endFill();
            var down = new PIXI.Graphics();
            down.beginFill(0xffc60c, 1);
            down.drawRoundedRect(0, 0, 120, 35, 15);
            down.endFill();
            var disable = new PIXI.Graphics();
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
            var style = new PIXI.TextStyle({});
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
            this.collectButton.on("pointerup", function () {
                _this.collectButton.disable();
                Game.Connection.collectCash(_this.id);
            });
        };
        Business.prototype.addCollectCircle = function () {
            this.collectCircle = new Game.CollectingCircle();
            this.addChild(this.collectCircle);
        };
        Business.prototype.addManager = function () {
            var _this = this;
            this.manager = new Game.Manager();
            this.addChild(this.manager);
            this.manager.on("pointerup", function () {
                _this.manager.disable();
                Game.Connection.hireManager(_this.id);
            });
        };
        Business.prototype.addUpgradeButton = function () {
            var _this = this;
            var under = new PIXI.Graphics();
            under.beginFill(0x000000, 1);
            under.drawRoundedRect(0, 0, 124, 39, 17);
            under.endFill();
            under.y = -2;
            under.x = -2;
            var up = new PIXI.Graphics();
            up.beginFill(0x8e0cff, 1);
            up.drawRoundedRect(0, 0, 120, 35, 15);
            up.endFill();
            var hover = new PIXI.Graphics();
            hover.beginFill(0x8e0cff, 1);
            hover.drawRoundedRect(0, 0, 120, 35, 15);
            hover.endFill();
            var down = new PIXI.Graphics();
            down.beginFill(0x8e0cff, 1);
            down.drawRoundedRect(0, 0, 120, 35, 15);
            down.endFill();
            var disable = new PIXI.Graphics();
            disable.beginFill(0x999999, 1);
            disable.drawRoundedRect(0, 0, 120, 35, 15);
            disable.endFill();
            var style = new PIXI.TextStyle({});
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
            this.upgradeButton.on("pointerup", function () {
                Game.Connection.upgradeBusiness(_this.id);
            });
            this.addChild(this.upgradeButton);
            this.upgradeButton.x = -60;
            this.upgradeButton.y = 137;
        };
        Business.prototype.addUpgradeCircle = function () {
            this.upgradeCircle = new Game.UpgradingCircle();
            this.addChild(this.upgradeCircle);
        };
        Business.prototype.updateStats = function () {
            var vo = Game.Connection.getBusinesses()[this.id];
            this.building.updateState(vo);
            this.buy.updateState(vo);
            this.manager.updateState(vo);
            this.collectCircle.updateState(vo);
            this.upgradeCircle.updateState(vo);
            this.updateButtons(vo);
        };
        Business.prototype.addCoins = function () {
            for (var i = 0; i < 5; i++) {
                var coin = new PIXI.Sprite(Game.Stage.getTexture("cash"));
                coin.anchor.set(0.5);
                coin.width = 50;
                coin.height = 50;
                coin.visible = false;
                this.coins.addChild(coin);
            }
            this.addChild(this.coins);
        };
        Business.prototype.spendCash = function () {
            var _this = this;
            var cashPos = this.toLocal(new PIXI.Point(410, 75));
            var _loop_1 = function (i) {
                this_1.coins.children[i].visible = true;
                this_1.coins.children[i].scale.set(0.3);
                TweenLite.to(this_1.coins.children[i].scale, 0.25, { delay: 0.1 * i, x: 0.5, y: 0.5 });
                TweenLite.to(this_1.coins.children[i].scale, 0.25, { delay: 0.1 * i + 0.25, x: 0, y: 0 });
                TweenLite.fromTo(this_1.coins.children[i], 0.5, { x: cashPos.x, y: cashPos.y }, {
                    delay: 0.1 * i, x: 0, y: 0,
                    onComplete: function () {
                        _this.coins.children[i].visible = false;
                    }
                });
            };
            var this_1 = this;
            for (var i = 0; i < this.coins.children.length; i++) {
                _loop_1(i);
            }
        };
        Business.prototype.collectCash = function () {
            var _this = this;
            var cashPos = this.toLocal(new PIXI.Point(410, 75));
            var _loop_2 = function (i) {
                this_2.coins.children[i].visible = true;
                this_2.coins.children[i].scale.set(0);
                TweenLite.to(this_2.coins.children[i].scale, 0.25, { delay: 0.1 * i, x: 0.5, y: 0.5 });
                TweenLite.to(this_2.coins.children[i].scale, 0.25, { delay: 0.1 * i + 0.25, x: 0.3, y: 0.3 });
                TweenLite.fromTo(this_2.coins.children[i], 0.5, { x: 0, y: 0, }, {
                    delay: 0.1 * i, x: cashPos.x, y: cashPos.y,
                    onComplete: function () {
                        _this.coins.children[i].visible = false;
                    }
                });
            };
            var this_2 = this;
            for (var i = 0; i < this.coins.children.length; i++) {
                _loop_2(i);
            }
        };
        Business.prototype.updateButtons = function (vo) {
            if (vo.level === 0) {
                this.collectButton.visible = false;
                this.upgradeButton.visible = false;
            }
            else {
                this.collectButton.visible = true;
                this.collectButton.disable();
                if (vo.hasManager) {
                    this.upgradeButton.visible = true;
                    this.upgradeButton.disable();
                    if (vo.level === 1) {
                        this.upgradeValueText.text = vo.level2Price.toString();
                    }
                    else if (vo.level === 2) {
                        this.upgradeValueText.text = vo.level3Price.toString();
                    }
                    if (vo.upgradeTime === 0) {
                        if (vo.level === 1 && Game.Connection.getCash() >= vo.level2Price) {
                            this.upgradeButton.enable();
                        }
                        else if (vo.level === 2 && Game.Connection.getCash() >= vo.level3Price) {
                            this.upgradeButton.enable();
                        }
                    }
                }
                else {
                    if (vo.cashTime === 0) {
                        this.collectButton.enable();
                    }
                }
            }
        };
        Business.prototype.updateTime = function (id) {
            if (this.name === id.toString()) {
                var cashTime = Game.Connection.getBusinesses()[id].cashTime;
                if (cashTime < 10) {
                    this.collectClockText.text = "00:0" + cashTime.toString();
                }
                else if (cashTime < 60) {
                    this.collectClockText.text = "00:" + cashTime.toString();
                }
                else {
                    this.collectClockText.text = (cashTime / 60).toString() + ":" + (cashTime % 60).toString();
                }
                if (cashTime === 0) {
                    this.collectClockText.text = "00:00";
                    this.collectButton.enable();
                }
                else {
                    this.collectButton.disable();
                }
            }
        };
        return Business;
    }(PIXI.Container));
    Game.Business = Business;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            var _this = _super.call(this) || this;
            _this.add();
            Game.Stage.addChild(_this);
            return _this;
        }
        GameContainer.prototype.add = function () {
        };
        return GameContainer;
    }(PIXI.Container));
    Game.GameContainer = GameContainer;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Businesses = (function (_super) {
        __extends(Businesses, _super);
        function Businesses() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Businesses.prototype.add = function () {
            _super.prototype.add.call(this);
            this.businesses = [];
            var businessesVO = Game.Connection.getBusinesses();
            for (var i = 0; i < businessesVO.length; i++) {
                var business = new Game.Business(i);
                business.x = 200 + Math.floor(i / 2) * 350;
                business.y = 350 + (i % 2) * 350;
                this.addChild(business);
                this.businesses.push(business);
            }
        };
        Businesses.prototype.spendCash = function (id) {
            this.businesses[id].spendCash();
        };
        Businesses.prototype.collectCash = function (id) {
            this.businesses[id].collectCash();
        };
        Businesses.prototype.updateTime = function (id) {
            this.businesses[id].updateTime(id);
        };
        Businesses.prototype.updateStats = function () {
            for (var i = 0; i < this.businesses.length; i++) {
                this.businesses[i].updateStats();
            }
        };
        return Businesses;
    }(Game.GameContainer));
    Game.Businesses = Businesses;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var CollectingCircle = (function (_super) {
        __extends(CollectingCircle, _super);
        function CollectingCircle() {
            var _this = _super.call(this) || this;
            _this.fillCircle = new PIXI.Graphics();
            _this.fillCircle.beginFill(0xffc60c, 1);
            _this.fillCircle.drawCircle(0, 0, 135);
            var emptyCircle = new PIXI.Graphics();
            emptyCircle.beginFill(0x999999, 1);
            emptyCircle.drawCircle(0, 0, 135);
            _this.addChild(emptyCircle);
            _this.addChild(_this.fillCircle);
            return _this;
        }
        CollectingCircle.prototype.updateState = function (vo) {
            this.fillCircle.visible = false;
            if (vo.level === 1) {
                this.visible = true;
                this.fillCircle.visible = true;
            }
            else if (vo.level === 2) {
                this.visible = true;
                this.fillCircle.visible = true;
            }
            else if (vo.level === 3) {
                this.visible = true;
                this.fillCircle.visible = true;
            }
            else {
                this.visible = false;
            }
        };
        return CollectingCircle;
    }(PIXI.Container));
    Game.CollectingCircle = CollectingCircle;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Manager = (function (_super) {
        __extends(Manager, _super);
        function Manager() {
            var _this = _super.call(this) || this;
            var grayCircle = new PIXI.Graphics();
            grayCircle.beginFill(0x999999, 1);
            grayCircle.drawCircle(0, 0, 50);
            _this.addChild(grayCircle);
            var manager = new PIXI.Sprite(Game.Stage.getTexture("manager"));
            manager.scale.set(0.35);
            manager.x = -55;
            manager.y = -55;
            _this.addChild(manager);
            var maskCircle = new PIXI.Graphics();
            maskCircle.beginFill(0xffffff, 1);
            maskCircle.drawCircle(0, 0, 50);
            _this.mask = maskCircle;
            _this.addChild(maskCircle);
            _this.circle = new PIXI.Graphics();
            _this.circle.beginFill(0x000000, 0.65);
            _this.circle.drawCircle(0, 0, 50);
            _this.addChild(_this.circle);
            _this.plus = new PIXI.Text("+");
            _this.plus.anchor.set(0.5);
            _this.plus.style.fontFamily = "Modak";
            _this.plus.style.fontSize = 70;
            _this.plus.style.fill = "#ffc60c";
            _this.plus.y = -10;
            _this.addChild(_this.plus);
            _this.price = new PIXI.Text("+");
            _this.price.anchor.set(0.5);
            _this.price.style.fontFamily = "Bevan";
            _this.price.style.fontSize = 20;
            _this.price.style.fill = "#000000";
            _this.price.y = 30;
            _this.addChild(_this.price);
            _this.interactive = true;
            _this.buttonMode = true;
            _this.y = 45;
            return _this;
        }
        Manager.prototype.disable = function () {
            this.interactive = false;
            this.buttonMode = false;
            this.price.visible = false;
            this.circle.visible = false;
            this.plus.visible = false;
        };
        Manager.prototype.updateState = function (vo) {
            this.visible = vo.level !== 0;
            if (vo.hasManager) {
                this.circle.visible = false;
                this.plus.visible = false;
                this.price.visible = false;
                this.plus.scale.set(1);
                TweenMax.killTweensOf(this.plus.scale);
            }
            else {
                this.price.text = vo.managerPrice.toString();
                if (vo.managerPrice <= Game.Connection.getCash()) {
                    this.buttonMode = true;
                    this.interactive = true;
                    TweenMax.to(this.plus.scale, 0.25, {
                        x: 1.1, y: 1.1, yoyo: true, repeat: -1,
                    });
                    this.plus.style.fill = "#ffc60c";
                }
                else {
                    this.plus.style.fill = "#CCCCCC";
                    this.buttonMode = false;
                    this.interactive = false;
                    TweenMax.killTweensOf(this.plus.scale);
                    this.plus.scale.set(1);
                }
            }
        };
        return Manager;
    }(PIXI.Container));
    Game.Manager = Manager;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var StatsEvents = (function () {
        function StatsEvents() {
        }
        StatsEvents.UpdateStats = "StatsEvents.UpdateStats";
        StatsEvents.UpdateCollectingTime = "StatsEvents.UpdateCollectingTime";
        StatsEvents.CollectCash = "StatsEvents.CollectCash";
        StatsEvents.HireManager = "StatsEvents.HireManager";
        StatsEvents.UpgradeBussiness = "StatsEvents.UpgradeBussiness";
        StatsEvents.Buy = "StatsEvents.Buy";
        return StatsEvents;
    }());
    Game.StatsEvents = StatsEvents;
    var Stats = (function (_super) {
        __extends(Stats, _super);
        function Stats() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Stats.prototype.add = function () {
            _super.prototype.add.call(this);
            this.addTitle();
            this.addCash();
        };
        Stats.prototype.updateCash = function () {
            var _this = this;
            var tweenObj = { x: 0 };
            tweenObj.x = parseInt(this.cash.text);
            TweenLite.to(tweenObj, 0.5, {
                x: Game.Connection.getCash(),
                onUpdate: function () {
                    _this.cash.text = tweenObj.x.toFixed(0).toString();
                }
            });
        };
        Stats.prototype.addCash = function () {
            this.cash = new PIXI.Text(Game.Connection.getCash().toString());
            this.cash.style.fontFamily = "Bevan";
            this.cash.style.fontSize = 60;
            this.cash.style.fill = "#000000";
            this.addChild(this.cash);
            this.cashIcon = new PIXI.Sprite(Game.Stage.getTexture("cash"));
            this.cashIcon.anchor.set(0.5);
            this.cashIcon.width = 50;
            this.cashIcon.height = 50;
            this.addChild(this.cashIcon);
            this.cash.x = 440;
            this.cash.y = 30;
            this.cashIcon.x = 410;
            this.cashIcon.y = 75;
        };
        Stats.prototype.addTitle = function () {
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
        };
        return Stats;
    }(Game.GameContainer));
    Game.Stats = Stats;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var UpgradingCircle = (function (_super) {
        __extends(UpgradingCircle, _super);
        function UpgradingCircle() {
            var _this = _super.call(this) || this;
            _this.fillCircle = new PIXI.Graphics();
            _this.fillCircle.beginFill(0x8e0cff, 1);
            _this.fillCircle.drawCircle(0, 0, 170);
            var emptyCircle = new PIXI.Graphics();
            emptyCircle.beginFill(0x999999, 1);
            emptyCircle.drawCircle(0, 0, 170);
            _this.addChild(emptyCircle);
            _this.addChild(_this.fillCircle);
            return _this;
        }
        UpgradingCircle.prototype.updateState = function (vo) {
            this.visible = false;
            this.fillCircle.visible = false;
            if (vo.hasManager) {
                this.visible = true;
                this.fillCircle.visible = false;
                if (vo.upgradeTime === 0) {
                    if (vo.level === 1 && Game.Connection.getCash() >= vo.level2Price) {
                        this.fillCircle.visible = true;
                    }
                    else if (vo.level === 2 && Game.Connection.getCash() >= vo.level3Price) {
                        this.fillCircle.visible = true;
                    }
                    else if (vo.level === 3) {
                        this.fillCircle.visible = true;
                    }
                }
            }
        };
        return UpgradingCircle;
    }(PIXI.Container));
    Game.UpgradingCircle = UpgradingCircle;
})(Game || (Game = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiJEOi9nYW1lc19kZXYvZ2FtZV9jbG9zdXJlL2FkdmNhcC8iLCJzb3VyY2VzIjpbInNyYy9BZFZlbnR1cmVDYXBpdGFsaXN0LnRzIiwic3JjL2Fic3RyYWN0L0J1dHRvbi50cyIsInNyYy9hYnN0cmFjdC9FdmVudE1hbmFnZXIudHMiLCJzcmMvYWJzdHJhY3QvTG9hZGVyLnRzIiwic3JjL2Fic3RyYWN0L1N0YWdlLnRzIiwic3JjL2Nvbm5lY3Rpb24vQnVzaW5lc3NWTy50cyIsInNyYy9jb25uZWN0aW9uL0Nvbm5lY3Rpb24udHMiLCJzcmMvdmlld3MvQnVpbGRpbmcudHMiLCJzcmMvdmlld3MvQnV5LnRzIiwic3JjL3ZpZXdzL0J1c2luZXNzLnRzIiwic3JjL3ZpZXdzL0dhbWVDb250YWluZXIudHMiLCJzcmMvdmlld3MvQnVzaW5lc3Nlcy50cyIsInNyYy92aWV3cy9Db2xsZWN0aW5nQ2lyY2xlLnRzIiwic3JjL3ZpZXdzL01hbmFnZXIudHMiLCJzcmMvdmlld3MvU3RhdHMudHMiLCJzcmMvdmlld3MvVXBncmFkaW5nQ2lyY2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxJQUFPLElBQUksQ0E2Q1Y7QUE3Q0QsV0FBTyxJQUFJO0lBQ1A7UUFBeUMsdUNBQWM7UUFBdkQ7O1FBMkNBLENBQUM7UUF4Q2lCLHlCQUFLLEdBQW5CO1lBQUEsaUJBT0M7WUFORyxLQUFBLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNiLEtBQUEsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLEtBQUEsTUFBTSxDQUFDLFlBQVksQ0FBQztnQkFDaEIsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN2QixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRWMsZ0NBQVksR0FBM0I7WUFBQSxpQkF5QkM7WUF2QkcsS0FBQSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBQSxXQUFXLENBQUMsV0FBVyxFQUFFLFVBQUMsQ0FBQztnQkFDckQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBQSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBQSxXQUFXLENBQUMsR0FBRyxFQUFFLFVBQUMsQ0FBQztnQkFDN0MsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBQSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBQSxXQUFXLENBQUMsV0FBVyxFQUFFLFVBQUMsQ0FBQztnQkFDckQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsS0FBQSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsS0FBQSxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxDQUFDO2dCQUMxRCxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDckIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxLQUFBLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFBLFdBQVcsQ0FBQyxXQUFXLEVBQUU7Z0JBQ25ELEtBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzlCLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsQ0FBQyxD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QUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDbkMsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDLElBQUksS0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ2xFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDbkMsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ25DLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQUFDLEFBcENELENBQXFDLElBQUksQ0FBQyxTQUFTLEdBb0NsRDtJQXBDWSxvQkFBZSxrQkFvQzNCLENBQUE7QUFDTCxDQUFDLEVBdENNLElBQUksS0FBSixJQUFJLFFBc0NWIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIEdhbWUge1xyXG4gICAgZXhwb3J0IGNsYXNzIEFkVmVudHVyZUNhcGl0YWxpc3QgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYnVzaW5lc3NlczogR2FtZS5CdXNpbmVzc2VzO1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHN0YXRzOiBHYW1lLlN0YXRzO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc3RhcnQoKSB7XHJcbiAgICAgICAgICAgIFN0YWdlLmluaXQoKTtcclxuICAgICAgICAgICAgQ29ubmVjdGlvbi5pbml0KCk7XHJcbiAgICAgICAgICAgIExvYWRlci5zdGFydExvYWRpbmcoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRHYW1lRWxlbWVudHMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYWRkTGlzdGVuZXJzKCkge1xyXG5cclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoU3RhdHNFdmVudHMuSGlyZU1hbmFnZXIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBlLnBhcmFtcy5pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVzaW5lc3Nlcy5zcGVuZENhc2goaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoU3RhdHNFdmVudHMuQnV5LCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gZS5wYXJhbXMuaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzZXMuc3BlbmRDYXNoKGlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFN0YXRzRXZlbnRzLkNvbGxlY3RDYXNoLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlkID0gZS5wYXJhbXMuaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzZXMuY29sbGVjdENhc2goaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoU3RhdHNFdmVudHMuVXBncmFkZUJ1c3NpbmVzcywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBpZCA9IGUucGFyYW1zLmlkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzc2VzLmNvbGxlY3RDYXNoKGlkKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5hZGRFdmVudExpc3RlbmVyKFN0YXRzRXZlbnRzLlVwZGF0ZVN0YXRzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzZXMudXBkYXRlU3RhdHMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHMudXBkYXRlQ2FzaCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoU3RhdHNFdmVudHMuVXBkYXRlQ29sbGVjdGluZ1RpbWUsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzZXMudXBkYXRlVGltZShlLnBhcmFtcy5pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgYWRkR2FtZUVsZW1lbnRzKCkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzZXMgPSBuZXcgQnVzaW5lc3NlcygpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRzID0gbmV3IFN0YXRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIFBJWEkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAqIENoZWNrcyBpZiB0aGUgYnV0dG9uIGlzIHByZXNzZWQgZG93blxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgaXNEb3duOiBib29sZWFuO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDaGVja3MgaWYgdGhlIGJ1dHRvbiBpcyBob3ZlcmVkIGJ5IHRoZSBtb3VzZSBjdXJzb3JcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIGlzT3ZlcjogYm9vbGVhbjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhlIHRleHQgb2YgdGhlIGJ1dHRvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgdGV4dDogUElYSS5UZXh0O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVcCBza2luIG9mIHRoZSBidXR0b25cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgdXBTa2luOiBQSVhJLkNvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSG92ZXIgc2tpbiBvZiB0aGUgYnV0dG9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGhvdmVyU2tpbjogUElYSS5Db250YWluZXI7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERvd24gc2tpbiBvZiB0aGUgYnV0dG9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGRvd25Ta2luOiBQSVhJLkNvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT2ZmIHNraW4gb2YgdGhlIGJ1dHRvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvZmZTa2luOiBQSVhJLkNvbnRhaW5lcjtcclxuXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdGV4dFN0eWxlOiBQSVhJLlRleHRTdHlsZSkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cFNraW4gPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5ob3ZlclNraW4gPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5kb3duU2tpbiA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gICAgICAgICAgICB0aGlzLm9mZlNraW4gPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy51cFNraW4pO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuaG92ZXJTa2luKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmRvd25Ta2luKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLm9mZlNraW4pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cFNraW4udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZG93blNraW4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmhvdmVyU2tpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMub2ZmU2tpbi52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogU2V0IGJ1dHRvbiBtb2RlIGFuZCBldmVudHNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uTW9kZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9uKCdwb2ludGVyZG93bicsIHRoaXMub25CdXR0b25Eb3duKVxyXG4gICAgICAgICAgICAgICAgLm9uKCdwb2ludGVydXAnLCB0aGlzLm9uQnV0dG9uVXApXHJcbiAgICAgICAgICAgICAgICAub24oJ3BvaW50ZXJ1cG91dHNpZGUnLCB0aGlzLm9uQnV0dG9uVXApXHJcbiAgICAgICAgICAgICAgICAub24oJ3BvaW50ZXJvdmVyJywgdGhpcy5vbkJ1dHRvbk92ZXIpXHJcbiAgICAgICAgICAgICAgICAub24oJ3BvaW50ZXJvdXQnLCB0aGlzLm9uQnV0dG9uT3V0KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBBZGQgdGhlIGJ1dHRvbiB0ZXh0LCB0aGF0IGlzIGVtcHR5IGZvciBub3dcclxuICAgICAgICAgICAgICogQWxsIHRleHQgc3R5bGVzIGFyZSB0aGUgZGVmYXVsdCB0ZXh0IHN0eWxlXHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgPSBuZXcgUElYSS5UZXh0KHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dC5hbmNob3Iuc2V0KDApO1xyXG4gICAgICAgICAgICB0aGlzLnRleHQuc3R5bGUgPSB0ZXh0U3R5bGU7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy50ZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwZGF0ZSB0aGUgdGV4dCBwb3NpdGlvblxyXG4gICAgICAgICAqIEBwYXJhbSB4XHJcbiAgICAgICAgICogQHBhcmFtIHlcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc2V0VGV4dFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dC54ID0geDtcclxuICAgICAgICAgICAgdGhpcy50ZXh0LnkgPSB5O1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVuYWJsZSB0aGUgYnV0dG9uXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIGVuYWJsZSgpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmludGVyYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmludGVyYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMub2ZmU2tpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhvdmVyU2tpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvd25Ta2luLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBTa2luLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEaXNhYmxlIHRoZSBidXR0b25cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgZGlzYWJsZSgpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5pbnRlcmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vZmZTa2luLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3ZlclNraW4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duU2tpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwU2tpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNob3cgdGhlIGJ1dHRvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzaG93KCl7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhpZGUgdGhlIGJ1dHRvblxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBoaWRlKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMudmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwZGF0ZSB0aGUgc2tpbiB3aGVuIGJ1dHRvbiBpcyBkb3duXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIG9uQnV0dG9uRG93bigpIHtcclxuICAgICAgICAgICAgdGhpcy5pc0Rvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnVwU2tpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaG92ZXJTa2luLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kb3duU2tpbi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwZGF0ZSB0aGUgc2tpbiB3aGVuIGJ1dHRvbiBpcyB1cFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkJ1dHRvblVwKCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzRG93biA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc092ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBTa2luLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJTa2luLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb3duU2tpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwU2tpbi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaG92ZXJTa2luLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZG93blNraW4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVcGRhdGUgdGhlIHNraW4gd2hlbiBidXR0b24gaXMgaG92ZXJlZFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkJ1dHRvbk92ZXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNPdmVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNEb3duKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51cFNraW4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmhvdmVyU2tpbi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5kb3duU2tpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBVcGRhdGUgdGhlIHNraW4gd2hlbiBidXR0b24gaXMgbm90IGhvdmVyZWQgYW55bW9yZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBvbkJ1dHRvbk91dCgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc092ZXIgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNEb3duKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51cFNraW4udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuaG92ZXJTa2luLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5kb3duU2tpbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIEdhbWUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2xhc3MgdXNlZCB0byBoYW5kbGUgdGhlIGdhbWUgZXZlbnRzXHJcbiAgICAgKiBBbGwgZ2FtZSBldmVudHMgc2hvdWxkIGJlIHNlbnQgb3IgcmVjZWl2ZWQgdXNpbmcgdGhpcyBjbGFzc1xyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgRXZlbnRNYW5hZ2VyIHtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogYW55KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogYW55KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBkaXNwYXRjaEV2ZW50KGV2ZW50TmFtZTogc3RyaW5nLCBwYXJhbXM6IGFueSA9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IGV2ZW50ID0gdGhpcy5nZXRFdmVudChldmVudE5hbWUsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIGV2ZW50W1wicGFyYW1zXCJdID0gcGFyYW1zO1xyXG4gICAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBnZXRFdmVudChldmVudE5hbWU6IHN0cmluZywgcGFyYW1zOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKEV2ZW50KSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IEV2ZW50KGV2ZW50TmFtZSwgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5pbml0RXZlbnQoZXZlbnROYW1lLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlICBHYW1lIHtcclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkZXIge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBwbmdzOiBzdHJpbmdbXSA9IFtcclxuICAgICAgICAgICAgXCJjYXNoXCIsXHJcbiAgICAgICAgICAgIFwibGV2ZWwxXCIsXHJcbiAgICAgICAgICAgIFwibGV2ZWwyXCIsXHJcbiAgICAgICAgICAgIFwibGV2ZWwzXCIsXHJcbiAgICAgICAgICAgIFwibWFuYWdlclwiLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHBpeGlMb2FkZXIgPSBuZXcgUElYSS5sb2FkZXJzLkxvYWRlcigpO1xyXG5cclxuICAgICAgICBzdGF0aWMgc3RhcnRMb2FkaW5nKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wbmdzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBpeGlMb2FkZXIuYWRkKHRoaXMucG5nc1tpXSwgXCJhc3NldHMvXCIgKyB0aGlzLnBuZ3NbaV0gKyBcIi5wbmdcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5waXhpTG9hZGVyLm9uQ29tcGxldGUub25jZSgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGl4aUxvYWRlci5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIEdhbWUge1xyXG4gICAgaW1wb3J0IFdlYkdMUmVuZGVyZXIgPSBQSVhJLldlYkdMUmVuZGVyZXI7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN0YWdlIHtcclxuICAgICAgICBzdGF0aWMgZ2V0IHJlbmRlcmVyKCk6IFBJWEkuQ2FudmFzUmVuZGVyZXIgfCBQSVhJLldlYkdMUmVuZGVyZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVuZGVyZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9yZW5kZXJlcjogUElYSS5DYW52YXNSZW5kZXJlciB8IFBJWEkuV2ViR0xSZW5kZXJlcjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBhcHBsaWNhdGlvbjogUElYSS5BcHBsaWNhdGlvbjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBMQU5EU0NBUEU6IHN0cmluZyA9IFwiU3RhZ2VPcmllbnRhdGlvbi5MYW5kc2NhcGVcIjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBPUlRSQUlUOiBzdHJpbmcgPSBcIlN0YWdlT3JpZW50YXRpb24uUG9ydHJhaXRcIjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIG9yaWVudGF0aW9uOiBzdHJpbmc7XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICAgICAgbGV0IHJlc29sdXRpb24gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xyXG4gICAgICAgICAgICB0aGlzLmFwcGxpY2F0aW9uID0gbmV3IFBJWEkuQXBwbGljYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICByZXNvbHV0aW9uOiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICAgICAgYXV0b1Jlc2l6ZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogMHhmZmZmZmYsXHJcbiAgICAgICAgICAgICAgICBjbGVhckJlZm9yZVJlbmRlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGFudGlhbGlhczogdHJ1ZVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlciA9IHRoaXMuYXBwbGljYXRpb24ucmVuZGVyZXI7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYXBwbGljYXRpb24udmlldyk7XHJcblxyXG4gICAgICAgICAgICBQSVhJLnNldHRpbmdzLk1JUE1BUF9URVhUVVJFUyA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnZpZXcuc3R5bGUubGVmdCA9ICcwJztcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci52aWV3LnN0eWxlLnRvcCA9ICcwJztcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucGx1Z2lucy5pbnRlcmFjdGlvbi5tb3ZlV2hlbkluc2lkZSA9IHRydWU7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcclxuICAgICAgICAgICAgd2luZG93Lm9ucmVzaXplID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemUoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBzdGF0aWMgcmVzaXplKCkge1xyXG4gICAgICAgICAgICBsZXQgb2xkT3JpZW50YXRpb24gPSB0aGlzLm9yaWVudGF0aW9uO1xyXG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLkxBTkRTQ0FQRTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSB0aGlzLlBPUlRSQUlUO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVzaXplKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCk7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KFN0YWdlRXZlbnQuU2NyZWVuUmVzaXplKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBhZGRDaGlsZChjaGlsZDogUElYSS5EaXNwbGF5T2JqZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXBwbGljYXRpb24uc3RhZ2UuYWRkQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldFRleHR1cmUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGxldCB0ZXh0dXJlOiBQSVhJLlRleHR1cmU7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21GcmFtZShuYW1lICsgJy5wbmcnKTtcclxuICAgICAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmUgPSBQSVhJLlRleHR1cmUuZnJvbUZyYW1lKG5hbWUgKyAnLmpwZycpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tRnJhbWUobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciwgZmlsZSBcIiArIG5hbWUgKyBcIiBub3QgZm91bmRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHR1cmUgPSBQSVhJLlRleHR1cmUuRU1QVFk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0dXJlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3RhZ2VFdmVudCB7XHJcbiAgICAgICAgc3RhdGljIFNjcmVlblJlc2l6ZTogc3RyaW5nID0gXCJTdGFnZUV2ZW50LlNjcmVlblJlc2l6ZVwiO1xyXG4gICAgfVxyXG5cclxufSIsIm1vZHVsZSBHYW1lIHtcclxuICAgIGV4cG9ydCBjbGFzcyBCdXNpbmVzc1ZPIHtcclxuICAgICAgICBwdWJsaWMgaGFzTWFuYWdlcjogYm9vbGVhbjtcclxuICAgICAgICBwdWJsaWMgbWFuYWdlclByaWNlOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGxldmVsOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGxldmVsMVByaWNlOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGxldmVsMlByaWNlOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGxldmVsM1ByaWNlOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGxldmVsMVdpbjogbnVtYmVyO1xyXG4gICAgICAgIHB1YmxpYyBsZXZlbDJXaW46IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgbGV2ZWwzV2luOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGxldmVsMU5hbWU6IHN0cmluZztcclxuICAgICAgICBwdWJsaWMgbGV2ZWwyTmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBsZXZlbDNOYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGNhc2hUaW1lOiBudW1iZXIgPSAtMTtcclxuICAgICAgICBwdWJsaWMgdXBncmFkZVRpbWU6IG51bWJlciA9IC0xO1xyXG4gICAgfVxyXG59IiwibW9kdWxlIEdhbWUge1xyXG4gICAgZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24ge1xyXG5cclxuICAgICAgICBzdGF0aWMgc2V0IGNhc2godmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9jYXNoID0gdmFsdWU7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KFN0YXRzRXZlbnRzLlVwZGF0ZVN0YXRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9jYXNoOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2J1c2luZXNzZXM6IEJ1c2luZXNzVk9bXTtcclxuXHJcbiAgICAgICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Nhc2ggPSAxMDtcclxuICAgICAgICAgICAgdGhpcy5fYnVzaW5lc3NlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgbGV0IGJ1c2luZXNzZXNOYW1lcyA9IFtcclxuICAgICAgICAgICAgICAgIFtcImFwcGxlIGNhcnRcIiwgXCJzdG9yZVwiLCBcInN1cGVybWFya2V0XCJdLFxyXG4gICAgICAgICAgICAgICAgW1wiY29mZmVlIGNhcnRcIiwgXCJiYXJcIiwgXCJjbHViXCJdLFxyXG4gICAgICAgICAgICAgICAgW1wiaG90IGRvZyBjYXJ0XCIsIFwicGl6emVyaWFcIiwgXCJyZXN0YXVyYW50XCJdLFxyXG4gICAgICAgICAgICAgICAgW1wiZmxvd2VyIGNhcnRcIiwgXCJmbG93ZXIgc2hvcFwiLCBcImZsb3dlciBncmVlbmhvdXNlXCJdLFxyXG4gICAgICAgICAgICAgICAgW1wiaWNlIGNyZWFtIGNhcnRcIiwgXCJjb29raWUgc3RvcmVcIiwgXCJjYWtlIHN0b3JlXCJdLFxyXG4gICAgICAgICAgICAgICAgW1wibmV3c3BhcGVyIGRlbGl2ZXJ5XCIsIFwibmV3c3BhcGVyIHN0b3JlXCIsIFwibmV3cyBjb21wYW55XCJdLFxyXG4gICAgICAgICAgICAgICAgW1wiY2FyIHdhc2hcIiwgXCJjYXIgcmVwYWlyIHNob3BcIiwgXCJjYXIgZGVhbGVyXCJdLFxyXG4gICAgICAgICAgICAgICAgW1wic2xvdCBtYWNoaW5lXCIsIFwiYmV0dGluZyBhZ2VuY3lcIiwgXCJjYXNpbm9cIl0sXHJcbiAgICAgICAgICAgICAgICBbXCJnYXMgc3RhdGlvblwiLCBcImVsZWN0cmljIGNoYXJnaW5nIHN0YXRpb25cIiwgXCJzb2xhciBwb3dlciBwbGFudFwiXSxcclxuICAgICAgICAgICAgICAgIFtcInBob3RvIGJvb3RoXCIsIFwicGhvdG8gc3R1ZGlvXCIsIFwibW92aWUgc3R1ZGlvXCJdLFxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaWQgPSAwOyBpZCA8IDEwOyBpZCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVzaW5lc3M6IEJ1c2luZXNzVk8gPSBuZXcgQnVzaW5lc3NWTygpO1xyXG4gICAgICAgICAgICAgICAgYnVzaW5lc3MubGV2ZWwgPSAwO1xyXG4gICAgICAgICAgICAgICAgYnVzaW5lc3MuaGFzTWFuYWdlciA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnVzaW5lc3MubGV2ZWwxTmFtZSA9IGJ1c2luZXNzZXNOYW1lc1tpZF1bMF07XHJcbiAgICAgICAgICAgICAgICBidXNpbmVzcy5sZXZlbDJOYW1lID0gYnVzaW5lc3Nlc05hbWVzW2lkXVsxXTtcclxuICAgICAgICAgICAgICAgIGJ1c2luZXNzLmxldmVsM05hbWUgPSBidXNpbmVzc2VzTmFtZXNbaWRdWzJdO1xyXG4gICAgICAgICAgICAgICAgYnVzaW5lc3MubGV2ZWwxUHJpY2UgPSAoaWQgKyAxKSAqIDEwO1xyXG4gICAgICAgICAgICAgICAgYnVzaW5lc3MubGV2ZWwyUHJpY2UgPSAoaWQgKyAxKSAqIDEwO1xyXG4gICAgICAgICAgICAgICAgYnVzaW5lc3MubGV2ZWwzUHJpY2UgPSAoaWQgKyAxKSAqIDEwO1xyXG4gICAgICAgICAgICAgICAgYnVzaW5lc3MubGV2ZWwxV2luID0gKGlkICsgMSkgKiAyMDtcclxuICAgICAgICAgICAgICAgIGJ1c2luZXNzLmxldmVsMldpbiA9IChpZCArIDEpICogNDA7XHJcbiAgICAgICAgICAgICAgICBidXNpbmVzcy5sZXZlbDNXaW4gPSAoaWQgKyAxKSAqIDYwO1xyXG4gICAgICAgICAgICAgICAgYnVzaW5lc3MubWFuYWdlclByaWNlID0gKGlkICsgMSkgKiA1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnVzaW5lc3Nlcy5wdXNoKGJ1c2luZXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3RhdGljIGdldENhc2goKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Nhc2g7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0QnVzaW5lc3NlcygpOiBCdXNpbmVzc1ZPW10ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYnVzaW5lc3NlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBidXkoaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVzaW5lc3Nlc1tpZF0ubGV2ZWwrKztcclxuICAgICAgICAgICAgdGhpcy5jYXNoID0gdGhpcy5fY2FzaCAtIHRoaXMuX2J1c2luZXNzZXNbaWRdLmxldmVsMVByaWNlO1xyXG4gICAgICAgICAgICB0aGlzLl9idXNpbmVzc2VzW2lkXS5jYXNoVGltZSA9IChpZCArIDEpICogNTtcclxuICAgICAgICAgICAgdGhpcy5zdGFydENvbGxlY3RUaW1lcihpZCk7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KFN0YXRzRXZlbnRzLkJ1eSwge2lkOiBpZH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBjb2xsZWN0Q2FzaChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2J1c2luZXNzZXNbaWRdLmxldmVsID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhc2ggPSB0aGlzLl9jYXNoICsgdGhpcy5fYnVzaW5lc3Nlc1tpZF0ubGV2ZWwxV2luO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5fYnVzaW5lc3Nlc1tpZF0ubGV2ZWwgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FzaCA9IHRoaXMuX2Nhc2ggKyB0aGlzLl9idXNpbmVzc2VzW2lkXS5sZXZlbDJXaW47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhc2ggPSB0aGlzLl9jYXNoICsgdGhpcy5fYnVzaW5lc3Nlc1tpZF0ubGV2ZWwyV2luO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2J1c2luZXNzZXNbaWRdLmNhc2hUaW1lID0gKGlkICsgMSkgKiA1O1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q29sbGVjdFRpbWVyKGlkKTtcclxuICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmRpc3BhdGNoRXZlbnQoU3RhdHNFdmVudHMuQ29sbGVjdENhc2gsIHtpZDogaWR9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyB1cGdyYWRlQnVzaW5lc3MoaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9idXNpbmVzc2VzW2lkXS51cGdyYWRlVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1c2luZXNzZXNbaWRdLmxldmVsKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc2VzW2lkXS5sZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXNoID0gdGhpcy5fY2FzaCAtIHRoaXMuX2J1c2luZXNzZXNbaWRdLmxldmVsMlByaWNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc2VzW2lkXS5sZXZlbCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYXNoID0gdGhpcy5fY2FzaCAtIHRoaXMuX2J1c2luZXNzZXNbaWRdLmxldmVsM1ByaWNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KFN0YXRzRXZlbnRzLlVwZ3JhZGVCdXNzaW5lc3MsIHtpZDogaWR9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHN0YXJ0Q29sbGVjdFRpbWVyKGlkOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1c2luZXNzZXNbaWRdLmNhc2hUaW1lID4gMCkge1xyXG4gICAgICAgICAgICAgICAgVHdlZW5MaXRlLmRlbGF5ZWRDYWxsKDEsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idXNpbmVzc2VzW2lkXS5jYXNoVGltZS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KFN0YXRzRXZlbnRzLlVwZGF0ZUNvbGxlY3RpbmdUaW1lLCB7aWQ6IGlkfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydENvbGxlY3RUaW1lcihpZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9idXNpbmVzc2VzW2lkXS5oYXNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0Q2FzaChpZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBoaXJlTWFuYWdlcihpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1c2luZXNzZXNbaWRdLnVwZ3JhZGVUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fYnVzaW5lc3Nlc1tpZF0uaGFzTWFuYWdlciA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuY2FzaCA9IHRoaXMuX2Nhc2ggLSB0aGlzLl9idXNpbmVzc2VzW2lkXS5tYW5hZ2VyUHJpY2U7XHJcbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5kaXNwYXRjaEV2ZW50KFN0YXRzRXZlbnRzLkhpcmVNYW5hZ2VyLCB7aWQ6IGlkfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIEdhbWUge1xyXG4gICAgZXhwb3J0IGNsYXNzIEJ1aWxkaW5nIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG4gICAgICAgIHByaXZhdGUgYnVpbGRpbmdMZXZlbDE6IFBJWEkuU3ByaXRlO1xyXG4gICAgICAgIHByaXZhdGUgYnVpbGRpbmdMZXZlbDFOYW1lOiBQSVhJLlRleHQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYnVpbGRpbmdMZXZlbDI6IFBJWEkuU3ByaXRlO1xyXG4gICAgICAgIHByaXZhdGUgYnVpbGRpbmdMZXZlbDJOYW1lOiBQSVhJLlRleHQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgYnVpbGRpbmdMZXZlbDM6IFBJWEkuU3ByaXRlO1xyXG4gICAgICAgIHByaXZhdGUgYnVpbGRpbmdMZXZlbDNOYW1lOiBQSVhJLlRleHQ7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICBsZXQgZ3JheUNpcmNsZTogUElYSS5HcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIGdyYXlDaXJjbGUuYmVnaW5GaWxsKDB4OTk5OTk5LCAxKTtcclxuICAgICAgICAgICAgZ3JheUNpcmNsZS5kcmF3Q2lyY2xlKDAsIDAsIDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoZ3JheUNpcmNsZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwxID0gbmV3IFBJWEkuU3ByaXRlKFN0YWdlLmdldFRleHR1cmUoXCJsZXZlbDFcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwxLmFuY2hvci5zZXQoMC41KTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMS5zY2FsZS5zZXQoMC44KTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMiA9IG5ldyBQSVhJLlNwcml0ZShTdGFnZS5nZXRUZXh0dXJlKFwibGV2ZWwyXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMi5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDIuc2NhbGUuc2V0KDAuMjUpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwzID0gbmV3IFBJWEkuU3ByaXRlKFN0YWdlLmdldFRleHR1cmUoXCJsZXZlbDNcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwzLmFuY2hvci5zZXQoMC41KTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMy5zY2FsZS5zZXQoMC44KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5idWlsZGluZ0xldmVsMSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5idWlsZGluZ0xldmVsMik7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5idWlsZGluZ0xldmVsMyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2lyY2xlTWFzazogUElYSS5HcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIGNpcmNsZU1hc2suYmVnaW5GaWxsKDB4ZmZmZmZmLCAxKTtcclxuICAgICAgICAgICAgY2lyY2xlTWFzay5kcmF3Q2lyY2xlKDAsIDAsIDEwMCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1hc2sgPSBjaXJjbGVNYXNrO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGNpcmNsZU1hc2spO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMU5hbWUgPSBuZXcgUElYSS5UZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDFOYW1lLmFuY2hvci5zZXQoMC41LCAwKTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMU5hbWUueSA9IC01MDtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMU5hbWUuc3R5bGUuZm9udEZhbWlseSA9IFwiTW9kYWtcIjtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMU5hbWUuc3R5bGUuYWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwxTmFtZS5zdHlsZS53b3JkV3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDFOYW1lLnN0eWxlLndvcmRXcmFwV2lkdGggPSAxNTA7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5idWlsZGluZ0xldmVsMU5hbWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMk5hbWUgPSBuZXcgUElYSS5UZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDJOYW1lLmFuY2hvci5zZXQoMC41LCAwKTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMk5hbWUueSA9IC01MDtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMk5hbWUuc3R5bGUuZm9udEZhbWlseSA9IFwiTW9kYWtcIjtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMk5hbWUuc3R5bGUuYWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwyTmFtZS5zdHlsZS53b3JkV3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDJOYW1lLnN0eWxlLndvcmRXcmFwV2lkdGggPSAxNTA7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5idWlsZGluZ0xldmVsMk5hbWUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsM05hbWUgPSBuZXcgUElYSS5UZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDNOYW1lLmFuY2hvci5zZXQoMC41LCAwKTtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsM05hbWUueSA9IC01MDtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsM05hbWUuc3R5bGUuZm9udEZhbWlseSA9IFwiTW9kYWtcIjtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsM05hbWUuc3R5bGUuYWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwzTmFtZS5zdHlsZS53b3JkV3JhcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDNOYW1lLnN0eWxlLndvcmRXcmFwV2lkdGggPSAxNTA7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5idWlsZGluZ0xldmVsM05hbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlU3RhdGUodm86IEdhbWUuQnVzaW5lc3NWTykge1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwxTmFtZS50ZXh0ID0gdm8ubGV2ZWwxTmFtZS50b0xvY2FsZVVwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwyTmFtZS50ZXh0ID0gdm8ubGV2ZWwyTmFtZS50b0xvY2FsZVVwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwzTmFtZS50ZXh0ID0gdm8ubGV2ZWwzTmFtZS50b0xvY2FsZVVwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwxTmFtZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDEudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwyTmFtZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDIudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwzTmFtZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZih2by5sZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMk5hbWUudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkaW5nTGV2ZWwyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodm8ubGV2ZWwgPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDNOYW1lLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRpbmdMZXZlbDFOYW1lLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZGluZ0xldmVsMS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBHYW1lIHtcclxuICAgIGV4cG9ydCBjbGFzcyBCdXkgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICAgICAgcHJpdmF0ZSBidXlUZXh0OiBQSVhJLlRleHQ7XHJcbiAgICAgICAgcHJpdmF0ZSBwcmljZVRleHQ6IFBJWEkuVGV4dDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIGxldCBvdmVyQ2lyY2xlOiBQSVhJLkdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgb3ZlckNpcmNsZS5iZWdpbkZpbGwoMHgwMDAwMDAsIDAuNjUpO1xyXG4gICAgICAgICAgICBvdmVyQ2lyY2xlLmRyYXdDaXJjbGUoMCwgMCwgMTAwKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChvdmVyQ2lyY2xlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYnV5VGV4dCA9IG5ldyBQSVhJLlRleHQoXCJCVVlcIik7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5VGV4dC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5idXlUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucHJpY2VUZXh0ID0gbmV3IFBJWEkuVGV4dCgpO1xyXG4gICAgICAgICAgICB0aGlzLnByaWNlVGV4dC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJpY2VUZXh0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIkJldmFuXCI7XHJcbiAgICAgICAgICAgIHRoaXMucHJpY2VUZXh0LnN0eWxlLmZvbnRTaXplID0gNDA7XHJcbiAgICAgICAgICAgIHRoaXMucHJpY2VUZXh0LnN0eWxlLmZpbGwgPSBcIiNmZmZmZmZcIjtcclxuICAgICAgICAgICAgdGhpcy5wcmljZVRleHQueSA9IDIwO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMucHJpY2VUZXh0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZVN0YXRlKHZvOiBCdXNpbmVzc1ZPKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJpY2VUZXh0LnRleHQgPSB2by5sZXZlbDFQcmljZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB2by5sZXZlbCA9PT0gMDtcclxuXHJcbiAgICAgICAgICAgIGlmKHZvLmxldmVsID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZih2by5sZXZlbDFQcmljZSA8PSBDb25uZWN0aW9uLmdldENhc2goKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLmludGVyYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvbk1vZGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eVRleHQudGV4dCA9IFwiQlVZXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5VGV4dC5zdHlsZS5mb250RmFtaWx5ID0gXCJNb2Rha1wiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eVRleHQuc3R5bGUuZm9udFNpemUgPSA1MDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlUZXh0LnN0eWxlLmZpbGwgPSBcIiNmZmM2MGNcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlUZXh0LnkgPSAtMzA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRoaXMuYnV5VGV4dC5zY2FsZSwgMC4yNSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogMS4yLCB5OiAxLjIsIHlveW86IHRydWUsIHJlcGVhdDogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uTW9kZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIFR3ZWVuTWF4LmtpbGxUd2VlbnNPZih0aGlzLmJ1eVRleHQuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5VGV4dC5zY2FsZS5zZXQoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlUZXh0LnRleHQgPSBcIk5PIE1PTkVZXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlUZXh0LnN0eWxlLmZvbnRGYW1pbHkgPSBcIk1vZGFrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlUZXh0LnN0eWxlLmZvbnRTaXplID0gMzU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXlUZXh0LnN0eWxlLmZpbGwgPSBcIiNDQ0NDQ0NcIjtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJ1eVRleHQueSA9IC0yMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRpc2FibGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5VGV4dC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLCAwLjUsIHtcclxuICAgICAgICAgICAgICAgIGFscGhhOiAwLCBvbkNvbXBsZXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgVHdlZW5NYXgua2lsbFR3ZWVuc09mKHRoaXMuYnV5VGV4dC5zY2FsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIkJ1eS50c1wiLz5cclxubW9kdWxlIEdhbWUge1xyXG4gICAgZXhwb3J0IGNsYXNzIEJ1c2luZXNzIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG5cclxuICAgICAgICBwcml2YXRlIGJ1aWxkaW5nOiBCdWlsZGluZztcclxuICAgICAgICBwcml2YXRlIG1hbmFnZXI6IE1hbmFnZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBidXk6IEJ1eTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBjb2xsZWN0QnV0dG9uOiBQSVhJLkJ1dHRvbjtcclxuICAgICAgICBwcml2YXRlIGNvbGxlY3RDaXJjbGU6IENvbGxlY3RpbmdDaXJjbGU7XHJcbiAgICAgICAgcHJpdmF0ZSBjb2xsZWN0Q2xvY2tUZXh0OiBQSVhJLlRleHQ7XHJcblxyXG5cclxuICAgICAgICBwcml2YXRlIHVwZ3JhZGVCdXR0b246IFBJWEkuQnV0dG9uO1xyXG4gICAgICAgIHByaXZhdGUgdXBncmFkZUNpcmNsZTogVXBncmFkaW5nQ2lyY2xlO1xyXG4gICAgICAgIHByaXZhdGUgdXBncmFkZVZhbHVlVGV4dDogUElYSS5UZXh0O1xyXG5cclxuICAgICAgICBwcml2YXRlIGNvaW5zOiBQSVhJLkNvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgICBwcml2YXRlIGlkOiBudW1iZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IGlkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaWQgPSBpZDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkVXBncmFkZUNpcmNsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENvbGxlY3RDaXJjbGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQnVpbGRpbmcoKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENvbGxlY3RCdXR0b24oKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRVcGdyYWRlQnV0dG9uKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZEJ1eUJ1dHRvbigpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZE1hbmFnZXIoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ29pbnMoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0cygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhZGRCdWlsZGluZygpIHtcclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZyA9IG5ldyBCdWlsZGluZygpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuYnVpbGRpbmcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhZGRCdXlCdXR0b24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5ID0gbmV3IEJ1eSgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuYnV5KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYnV5Lm9uKFwicG9pbnRlcnVwXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnV5LmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgIENvbm5lY3Rpb24uYnV5KHRoaXMuaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWRkQ29sbGVjdEJ1dHRvbigpIHtcclxuICAgICAgICAgICAgbGV0IHVuZGVyOiBQSVhJLkdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgdW5kZXIuYmVnaW5GaWxsKDB4MDAwMDAwLCAxKTtcclxuICAgICAgICAgICAgdW5kZXIuZHJhd1JvdW5kZWRSZWN0KDAsIDAsIDEyNCwgMzksIDE3KTtcclxuICAgICAgICAgICAgdW5kZXIuZW5kRmlsbCgpO1xyXG4gICAgICAgICAgICB1bmRlci55ID0gLTI7XHJcbiAgICAgICAgICAgIHVuZGVyLnggPSAtMjtcclxuXHJcbiAgICAgICAgICAgIGxldCB1cDogUElYSS5HcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIHVwLmJlZ2luRmlsbCgweGZmYzYwYywgMSk7XHJcbiAgICAgICAgICAgIHVwLmRyYXdSb3VuZGVkUmVjdCgwLCAwLCAxMjAsIDM1LCAxNSk7XHJcbiAgICAgICAgICAgIHVwLmVuZEZpbGwoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBob3ZlcjogUElYSS5HcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIGhvdmVyLmJlZ2luRmlsbCgweGZmYzYwYywgMSk7XHJcbiAgICAgICAgICAgIGhvdmVyLmRyYXdSb3VuZGVkUmVjdCgwLCAwLCAxMjAsIDM1LCAxNSk7XHJcbiAgICAgICAgICAgIGhvdmVyLmVuZEZpbGwoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkb3duOiBQSVhJLkdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgZG93bi5iZWdpbkZpbGwoMHhmZmM2MGMsIDEpO1xyXG4gICAgICAgICAgICBkb3duLmRyYXdSb3VuZGVkUmVjdCgwLCAwLCAxMjAsIDM1LCAxNSk7XHJcbiAgICAgICAgICAgIGRvd24uZW5kRmlsbCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRpc2FibGU6IFBJWEkuR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICBkaXNhYmxlLmJlZ2luRmlsbCgweDk5OTk5OSwgMSk7XHJcbiAgICAgICAgICAgIGRpc2FibGUuZHJhd1JvdW5kZWRSZWN0KDAsIDAsIDEyMCwgMzUsIDE1KTtcclxuICAgICAgICAgICAgZGlzYWJsZS5lbmRGaWxsKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RDbG9ja1RleHQgPSBuZXcgUElYSS5UZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdENsb2NrVGV4dC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdENsb2NrVGV4dC54ID0gNjA7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdENsb2NrVGV4dC55ID0gMjY7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdENsb2NrVGV4dC5zdHlsZS5mb250RmFtaWx5ID0gXCJCZXZhblwiO1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RDbG9ja1RleHQuc3R5bGUuZm9udFNpemUgPSAxNDtcclxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0Q2xvY2tUZXh0LnN0eWxlLmZpbGwgPSBcIiMwMDAwMDBcIjtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdHlsZSA9IG5ldyBQSVhJLlRleHRTdHlsZSh7fSk7XHJcbiAgICAgICAgICAgIHN0eWxlLmZvbnRGYW1pbHkgPSBcIk1vZGFrXCI7XHJcbiAgICAgICAgICAgIHN0eWxlLmZvbnRTaXplID0gMjU7XHJcbiAgICAgICAgICAgIHN0eWxlLmZpbGwgPSBcIiMwMDAwMDBcIjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdEJ1dHRvbiA9IG5ldyBQSVhJLkJ1dHRvbihcIkNPTExFQ1RcIiwgc3R5bGUpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RCdXR0b24uYWRkQ2hpbGRBdCh1bmRlciwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdEJ1dHRvbi51cFNraW4uYWRkQ2hpbGQodXApO1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RCdXR0b24uaG92ZXJTa2luLmFkZENoaWxkKGhvdmVyKTtcclxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0QnV0dG9uLmRvd25Ta2luLmFkZENoaWxkKGRvd24pO1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RCdXR0b24ub2ZmU2tpbi5hZGRDaGlsZChkaXNhYmxlKTtcclxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0QnV0dG9uLnNldFRleHRQb3NpdGlvbig3LCAwKTtcclxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0QnV0dG9uLnggPSAtNjA7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdEJ1dHRvbi55ID0gMTAwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0QnV0dG9uLmFkZENoaWxkKHRoaXMuY29sbGVjdENsb2NrVGV4dCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuY29sbGVjdEJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbGxlY3RCdXR0b24ub24oXCJwb2ludGVydXBcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0QnV0dG9uLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgIENvbm5lY3Rpb24uY29sbGVjdENhc2godGhpcy5pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWRkQ29sbGVjdENpcmNsZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0Q2lyY2xlID0gbmV3IENvbGxlY3RpbmdDaXJjbGUoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmNvbGxlY3RDaXJjbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhZGRNYW5hZ2VyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIgPSBuZXcgTWFuYWdlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMubWFuYWdlcik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm1hbmFnZXIub24oXCJwb2ludGVydXBcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgIENvbm5lY3Rpb24uaGlyZU1hbmFnZXIodGhpcy5pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhZGRVcGdyYWRlQnV0dG9uKCkge1xyXG4gICAgICAgICAgICBsZXQgdW5kZXI6IFBJWEkuR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICB1bmRlci5iZWdpbkZpbGwoMHgwMDAwMDAsIDEpO1xyXG4gICAgICAgICAgICB1bmRlci5kcmF3Um91bmRlZFJlY3QoMCwgMCwgMTI0LCAzOSwgMTcpO1xyXG4gICAgICAgICAgICB1bmRlci5lbmRGaWxsKCk7XHJcbiAgICAgICAgICAgIHVuZGVyLnkgPSAtMjtcclxuICAgICAgICAgICAgdW5kZXIueCA9IC0yO1xyXG5cclxuICAgICAgICAgICAgbGV0IHVwOiBQSVhJLkdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgdXAuYmVnaW5GaWxsKDB4OGUwY2ZmLCAxKTtcclxuICAgICAgICAgICAgdXAuZHJhd1JvdW5kZWRSZWN0KDAsIDAsIDEyMCwgMzUsIDE1KTtcclxuICAgICAgICAgICAgdXAuZW5kRmlsbCgpO1xyXG4gICAgICAgICAgICBsZXQgaG92ZXI6IFBJWEkuR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICBob3Zlci5iZWdpbkZpbGwoMHg4ZTBjZmYsIDEpO1xyXG4gICAgICAgICAgICBob3Zlci5kcmF3Um91bmRlZFJlY3QoMCwgMCwgMTIwLCAzNSwgMTUpO1xyXG4gICAgICAgICAgICBob3Zlci5lbmRGaWxsKCk7XHJcbiAgICAgICAgICAgIGxldCBkb3duOiBQSVhJLkdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgZG93bi5iZWdpbkZpbGwoMHg4ZTBjZmYsIDEpO1xyXG4gICAgICAgICAgICBkb3duLmRyYXdSb3VuZGVkUmVjdCgwLCAwLCAxMjAsIDM1LCAxNSk7XHJcbiAgICAgICAgICAgIGRvd24uZW5kRmlsbCgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRpc2FibGU6IFBJWEkuR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICBkaXNhYmxlLmJlZ2luRmlsbCgweDk5OTk5OSwgMSk7XHJcbiAgICAgICAgICAgIGRpc2FibGUuZHJhd1JvdW5kZWRSZWN0KDAsIDAsIDEyMCwgMzUsIDE1KTtcclxuICAgICAgICAgICAgZGlzYWJsZS5lbmRGaWxsKCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3R5bGUgPSBuZXcgUElYSS5UZXh0U3R5bGUoe30pO1xyXG4gICAgICAgICAgICBzdHlsZS5mb250RmFtaWx5ID0gXCJNb2Rha1wiO1xyXG4gICAgICAgICAgICBzdHlsZS5mb250U2l6ZSA9IDI1O1xyXG4gICAgICAgICAgICBzdHlsZS5maWxsID0gXCIjMDAwMDAwXCI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVCdXR0b24gPSBuZXcgUElYSS5CdXR0b24oXCJVUEdSQURFXCIsIHN0eWxlKTtcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlQnV0dG9uLmFkZENoaWxkQXQodW5kZXIsIDApO1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVCdXR0b24udXBTa2luLmFkZENoaWxkKHVwKTtcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlQnV0dG9uLmhvdmVyU2tpbi5hZGRDaGlsZChob3Zlcik7XHJcbiAgICAgICAgICAgIHRoaXMudXBncmFkZUJ1dHRvbi5kb3duU2tpbi5hZGRDaGlsZChkb3duKTtcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlQnV0dG9uLm9mZlNraW4uYWRkQ2hpbGQoZGlzYWJsZSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBncmFkZUJ1dHRvbi5zZXRUZXh0UG9zaXRpb24oNSwgMCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVWYWx1ZVRleHQgPSBuZXcgUElYSS5UZXh0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBncmFkZVZhbHVlVGV4dC5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBncmFkZVZhbHVlVGV4dC54ID0gNjA7XHJcbiAgICAgICAgICAgIHRoaXMudXBncmFkZVZhbHVlVGV4dC55ID0gMjY7XHJcbiAgICAgICAgICAgIHRoaXMudXBncmFkZVZhbHVlVGV4dC5zdHlsZS5mb250RmFtaWx5ID0gXCJCZXZhblwiO1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVWYWx1ZVRleHQuc3R5bGUuZm9udFNpemUgPSAxNDtcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlVmFsdWVUZXh0LnN0eWxlLmZpbGwgPSBcIiMwMDAwMDBcIjtcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlQnV0dG9uLmFkZENoaWxkKHRoaXMudXBncmFkZVZhbHVlVGV4dCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVCdXR0b24ub24oXCJwb2ludGVydXBcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgQ29ubmVjdGlvbi51cGdyYWRlQnVzaW5lc3ModGhpcy5pZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnVwZ3JhZGVCdXR0b24pO1xyXG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGVCdXR0b24ueCA9IC02MDtcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlQnV0dG9uLnkgPSAxMzc7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBhZGRVcGdyYWRlQ2lyY2xlKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlQ2lyY2xlID0gbmV3IFVwZ3JhZGluZ0NpcmNsZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMudXBncmFkZUNpcmNsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlU3RhdHMoKSB7XHJcbiAgICAgICAgICAgIGxldCB2byA9IENvbm5lY3Rpb24uZ2V0QnVzaW5lc3NlcygpW3RoaXMuaWRdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5idWlsZGluZy51cGRhdGVTdGF0ZSh2byk7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5LnVwZGF0ZVN0YXRlKHZvKTtcclxuICAgICAgICAgICAgdGhpcy5tYW5hZ2VyLnVwZGF0ZVN0YXRlKHZvKTtcclxuICAgICAgICAgICAgdGhpcy5jb2xsZWN0Q2lyY2xlLnVwZGF0ZVN0YXRlKHZvKTtcclxuICAgICAgICAgICAgdGhpcy51cGdyYWRlQ2lyY2xlLnVwZGF0ZVN0YXRlKHZvKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVCdXR0b25zKHZvKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWRkQ29pbnMoKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29pbjogUElYSS5TcHJpdGUgPSBuZXcgUElYSS5TcHJpdGUoU3RhZ2UuZ2V0VGV4dHVyZShcImNhc2hcIikpO1xyXG4gICAgICAgICAgICAgICAgY29pbi5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgICAgICAgICAgICBjb2luLndpZHRoID0gNTA7XHJcbiAgICAgICAgICAgICAgICBjb2luLmhlaWdodCA9IDUwO1xyXG4gICAgICAgICAgICAgICAgY29pbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW5zLmFkZENoaWxkKGNvaW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5jb2lucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3BlbmRDYXNoKCkge1xyXG4gICAgICAgICAgICBsZXQgY2FzaFBvcyA9IHRoaXMudG9Mb2NhbChuZXcgUElYSS5Qb2ludCg0MTAsIDc1KSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2lucy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2lucy5jaGlsZHJlbltpXS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29pbnMuY2hpbGRyZW5baV0uc2NhbGUuc2V0KDAuMyk7XHJcbiAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8odGhpcy5jb2lucy5jaGlsZHJlbltpXS5zY2FsZSwgMC4yNSwge2RlbGF5OiAwLjEgKiBpLCB4OiAwLjUsIHk6IDAuNX0pO1xyXG4gICAgICAgICAgICAgICAgVHdlZW5MaXRlLnRvKHRoaXMuY29pbnMuY2hpbGRyZW5baV0uc2NhbGUsIDAuMjUsIHtkZWxheTogMC4xICogaSArIDAuMjUsIHg6IDAsIHk6IDB9KTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS5mcm9tVG8odGhpcy5jb2lucy5jaGlsZHJlbltpXSwgMC41LCB7eDogY2FzaFBvcy54LCB5OiBjYXNoUG9zLnl9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDAuMSAqIGksIHg6IDAsIHk6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvaW5zLmNoaWxkcmVuW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjb2xsZWN0Q2FzaCgpIHtcclxuICAgICAgICAgICAgbGV0IGNhc2hQb3MgPSB0aGlzLnRvTG9jYWwobmV3IFBJWEkuUG9pbnQoNDEwLCA3NSkpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29pbnMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29pbnMuY2hpbGRyZW5baV0udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvaW5zLmNoaWxkcmVuW2ldLnNjYWxlLnNldCgwKTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS50byh0aGlzLmNvaW5zLmNoaWxkcmVuW2ldLnNjYWxlLCAwLjI1LCB7ZGVsYXk6IDAuMSAqIGksIHg6IDAuNSwgeTogMC41fSk7XHJcbiAgICAgICAgICAgICAgICBUd2VlbkxpdGUudG8odGhpcy5jb2lucy5jaGlsZHJlbltpXS5zY2FsZSwgMC4yNSwge2RlbGF5OiAwLjEgKiBpICsgMC4yNSwgeDogMC4zLCB5OiAwLjN9KTtcclxuICAgICAgICAgICAgICAgIFR3ZWVuTGl0ZS5mcm9tVG8odGhpcy5jb2lucy5jaGlsZHJlbltpXSwgMC41LCB7eDogMCwgeTogMCx9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDAuMSAqIGksIHg6IGNhc2hQb3MueCwgeTogY2FzaFBvcy55LFxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2lucy5jaGlsZHJlbltpXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlQnV0dG9ucyh2bzogQnVzaW5lc3NWTykge1xyXG4gICAgICAgICAgICBpZiAodm8ubGV2ZWwgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdEJ1dHRvbi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVCdXR0b24udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0QnV0dG9uLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0QnV0dG9uLmRpc2FibGUoKTtcclxuICAgICAgICAgICAgICAgIGlmICh2by5oYXNNYW5hZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlQnV0dG9uLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZUJ1dHRvbi5kaXNhYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvLmxldmVsID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZVZhbHVlVGV4dC50ZXh0ID0gdm8ubGV2ZWwyUHJpY2UudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZvLmxldmVsID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkZVZhbHVlVGV4dC50ZXh0ID0gdm8ubGV2ZWwzUHJpY2UudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvLnVwZ3JhZGVUaW1lID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2by5sZXZlbCA9PT0gMSAmJiBDb25uZWN0aW9uLmdldENhc2goKSA+PSB2by5sZXZlbDJQcmljZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlQnV0dG9uLmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZvLmxldmVsID09PSAyICYmIENvbm5lY3Rpb24uZ2V0Q2FzaCgpID49IHZvLmxldmVsM1ByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGVCdXR0b24uZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2by5jYXNoVGltZSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RCdXR0b24uZW5hYmxlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHVwZGF0ZVRpbWUoaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5uYW1lID09PSBpZC50b1N0cmluZygpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2FzaFRpbWUgPSBDb25uZWN0aW9uLmdldEJ1c2luZXNzZXMoKVtpZF0uY2FzaFRpbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FzaFRpbWUgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGVjdENsb2NrVGV4dC50ZXh0ID0gXCIwMDowXCIgKyBjYXNoVGltZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjYXNoVGltZSA8IDYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0Q2xvY2tUZXh0LnRleHQgPSBcIjAwOlwiICsgY2FzaFRpbWUudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0Q2xvY2tUZXh0LnRleHQgPSAoY2FzaFRpbWUgLyA2MCkudG9TdHJpbmcoKSArIFwiOlwiICsgKGNhc2hUaW1lICUgNjApLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNhc2hUaW1lID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0Q2xvY2tUZXh0LnRleHQgPSBcIjAwOjAwXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsZWN0QnV0dG9uLmVuYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxlY3RCdXR0b24uZGlzYWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIEdhbWUge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVDb250YWluZXIgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZCgpO1xyXG4gICAgICAgICAgICBTdGFnZS5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhZGQoKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4vR2FtZUNvbnRhaW5lci50c1wiLz5cclxubW9kdWxlIEdhbWUge1xyXG4gICAgZXhwb3J0IGNsYXNzIEJ1c2luZXNzZXMgZXh0ZW5kcyBHYW1lQ29udGFpbmVyIHtcclxuICAgICAgICBwcml2YXRlIGJ1c2luZXNzZXM6IEJ1c2luZXNzW107XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhZGQoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLmFkZCgpO1xyXG4gICAgICAgICAgICB0aGlzLmJ1c2luZXNzZXMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGJ1c2luZXNzZXNWTzogQnVzaW5lc3NWT1tdID0gQ29ubmVjdGlvbi5nZXRCdXNpbmVzc2VzKCk7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBidXNpbmVzc2VzVk8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBidXNpbmVzcyA9IG5ldyBCdXNpbmVzcyhpKTtcclxuICAgICAgICAgICAgICAgIGJ1c2luZXNzLnggPSAyMDAgKyBNYXRoLmZsb29yKGkgLyAyKSAqIDM1MDtcclxuICAgICAgICAgICAgICAgIGJ1c2luZXNzLnkgPSAzNTAgKyAoaSAlIDIpICogMzUwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChidXNpbmVzcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJ1c2luZXNzZXMucHVzaChidXNpbmVzcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNwZW5kQ2FzaChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzaW5lc3Nlc1tpZF0uc3BlbmRDYXNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbGxlY3RDYXNoKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5idXNpbmVzc2VzW2lkXS5jb2xsZWN0Q2FzaCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlVGltZShpZDogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnVzaW5lc3Nlc1tpZF0udXBkYXRlVGltZShpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVTdGF0cygpIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuYnVzaW5lc3Nlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXNpbmVzc2VzW2ldLnVwZGF0ZVN0YXRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgR2FtZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgQ29sbGVjdGluZ0NpcmNsZSBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBmaWxsQ2lyY2xlOiBQSVhJLkdyYXBoaWNzO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5maWxsQ2lyY2xlID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgdGhpcy5maWxsQ2lyY2xlLmJlZ2luRmlsbCgweGZmYzYwYywgMSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsbENpcmNsZS5kcmF3Q2lyY2xlKDAsIDAsIDEzNSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZW1wdHlDaXJjbGU6IFBJWEkuR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICBlbXB0eUNpcmNsZS5iZWdpbkZpbGwoMHg5OTk5OTksIDEpO1xyXG4gICAgICAgICAgICBlbXB0eUNpcmNsZS5kcmF3Q2lyY2xlKDAsIDAsIDEzNSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGVtcHR5Q2lyY2xlKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmZpbGxDaXJjbGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlU3RhdGUodm86IEdhbWUuQnVzaW5lc3NWTykge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5maWxsQ2lyY2xlLnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2by5sZXZlbCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsbENpcmNsZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2by5sZXZlbCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsbENpcmNsZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh2by5sZXZlbCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmlsbENpcmNsZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIEdhbWUge1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICAgICAgcHJpdmF0ZSBwcmljZTogUElYSS5UZXh0O1xyXG4gICAgICAgIHByaXZhdGUgcGx1czogUElYSS5UZXh0O1xyXG4gICAgICAgIHByaXZhdGUgY2lyY2xlOiBQSVhJLkdyYXBoaWNzO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBncmF5Q2lyY2xlOiBQSVhJLkdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgZ3JheUNpcmNsZS5iZWdpbkZpbGwoMHg5OTk5OTksIDEpO1xyXG4gICAgICAgICAgICBncmF5Q2lyY2xlLmRyYXdDaXJjbGUoMCwgMCwgNTApO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGdyYXlDaXJjbGUpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1hbmFnZXI6IFBJWEkuU3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKFN0YWdlLmdldFRleHR1cmUoXCJtYW5hZ2VyXCIpKTtcclxuICAgICAgICAgICAgbWFuYWdlci5zY2FsZS5zZXQoMC4zNSk7XHJcbiAgICAgICAgICAgIG1hbmFnZXIueCA9IC01NTtcclxuICAgICAgICAgICAgbWFuYWdlci55ID0gLTU1O1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG1hbmFnZXIpO1xyXG5cclxuICAgICAgICAgICAgbGV0IG1hc2tDaXJjbGU6IFBJWEkuR3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICBtYXNrQ2lyY2xlLmJlZ2luRmlsbCgweGZmZmZmZiwgMSk7XHJcbiAgICAgICAgICAgIG1hc2tDaXJjbGUuZHJhd0NpcmNsZSgwLCAwLCA1MCk7XHJcbiAgICAgICAgICAgIHRoaXMubWFzayA9IG1hc2tDaXJjbGU7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobWFza0NpcmNsZSk7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5jaXJjbGUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICB0aGlzLmNpcmNsZS5iZWdpbkZpbGwoMHgwMDAwMDAsIDAuNjUpO1xyXG4gICAgICAgICAgICB0aGlzLmNpcmNsZS5kcmF3Q2lyY2xlKDAsIDAsIDUwKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmNpcmNsZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBsdXMgPSBuZXcgUElYSS5UZXh0KFwiK1wiKTtcclxuICAgICAgICAgICAgdGhpcy5wbHVzLmFuY2hvci5zZXQoMC41KTtcclxuICAgICAgICAgICAgdGhpcy5wbHVzLnN0eWxlLmZvbnRGYW1pbHkgPSBcIk1vZGFrXCI7XHJcbiAgICAgICAgICAgIHRoaXMucGx1cy5zdHlsZS5mb250U2l6ZSA9IDcwO1xyXG4gICAgICAgICAgICB0aGlzLnBsdXMuc3R5bGUuZmlsbCA9IFwiI2ZmYzYwY1wiO1xyXG4gICAgICAgICAgICB0aGlzLnBsdXMueSA9IC0xMDtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnBsdXMpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wcmljZSA9IG5ldyBQSVhJLlRleHQoXCIrXCIpO1xyXG4gICAgICAgICAgICB0aGlzLnByaWNlLmFuY2hvci5zZXQoMC41KTtcclxuICAgICAgICAgICAgdGhpcy5wcmljZS5zdHlsZS5mb250RmFtaWx5ID0gXCJCZXZhblwiO1xyXG4gICAgICAgICAgICB0aGlzLnByaWNlLnN0eWxlLmZvbnRTaXplID0gMjA7XHJcbiAgICAgICAgICAgIHRoaXMucHJpY2Uuc3R5bGUuZmlsbCA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgICAgICB0aGlzLnByaWNlLnkgPSAzMDtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnByaWNlKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLmludGVyYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25Nb2RlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMueSA9IDQ1O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGRpc2FibGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5idXR0b25Nb2RlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucHJpY2UudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNpcmNsZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucGx1cy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlU3RhdGUodm86IEdhbWUuQnVzaW5lc3NWTykge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGUgPSB2by5sZXZlbCAhPT0gMDtcclxuICAgICAgICAgICAgaWYgKHZvLmhhc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2lyY2xlLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGx1cy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaWNlLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGx1cy5zY2FsZS5zZXQoMSk7XHJcbiAgICAgICAgICAgICAgICBUd2Vlbk1heC5raWxsVHdlZW5zT2YodGhpcy5wbHVzLnNjYWxlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJpY2UudGV4dCA9IHZvLm1hbmFnZXJQcmljZS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZvLm1hbmFnZXJQcmljZSA8PSBDb25uZWN0aW9uLmdldENhc2goKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uTW9kZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgVHdlZW5NYXgudG8odGhpcy5wbHVzLnNjYWxlLCAwLjI1LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IDEuMSwgeTogMS4xLCB5b3lvOiB0cnVlLCByZXBlYXQ6IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1cy5zdHlsZS5maWxsID0gXCIjZmZjNjBjXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1cy5zdHlsZS5maWxsID0gXCIjQ0NDQ0NDXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5idXR0b25Nb2RlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIFR3ZWVuTWF4LmtpbGxUd2VlbnNPZih0aGlzLnBsdXMuc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1cy5zY2FsZS5zZXQoMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvLy88cmVmZXJlbmNlIHBhdGg9XCIuL0dhbWVDb250YWluZXIudHNcIi8+XHJcbm1vZHVsZSBHYW1lIHtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3RhdHNFdmVudHMge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVXBkYXRlU3RhdHM6c3RyaW5nID0gXCJTdGF0c0V2ZW50cy5VcGRhdGVTdGF0c1wiO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVXBkYXRlQ29sbGVjdGluZ1RpbWU6c3RyaW5nID0gXCJTdGF0c0V2ZW50cy5VcGRhdGVDb2xsZWN0aW5nVGltZVwiO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgQ29sbGVjdENhc2g6c3RyaW5nID0gXCJTdGF0c0V2ZW50cy5Db2xsZWN0Q2FzaFwiO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgSGlyZU1hbmFnZXI6c3RyaW5nID0gXCJTdGF0c0V2ZW50cy5IaXJlTWFuYWdlclwiO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVXBncmFkZUJ1c3NpbmVzczpzdHJpbmcgPSBcIlN0YXRzRXZlbnRzLlVwZ3JhZGVCdXNzaW5lc3NcIjtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIEJ1eTpzdHJpbmcgPSBcIlN0YXRzRXZlbnRzLkJ1eVwiO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTdGF0cyAgZXh0ZW5kcyAgR2FtZUNvbnRhaW5lciB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgY2FzaDogUElYSS5UZXh0O1xyXG4gICAgICAgIHByaXZhdGUgdGl0bGU6IFBJWEkuVGV4dDtcclxuICAgICAgICBwcml2YXRlIGNhc2hJY29uOiBQSVhJLlNwcml0ZTtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFkZCgpIHtcclxuICAgICAgICAgICAgc3VwZXIuYWRkKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkVGl0bGUoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDYXNoKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdXBkYXRlQ2FzaCgpIHtcclxuICAgICAgICAgICAgbGV0IHR3ZWVuT2JqOiB7eDogbnVtYmVyfSA9IHt4OiAwfTtcclxuICAgICAgICAgICAgdHdlZW5PYmoueCA9IHBhcnNlSW50KHRoaXMuY2FzaC50ZXh0KTtcclxuICAgICAgICAgICAgVHdlZW5MaXRlLnRvKHR3ZWVuT2JqLCAwLjUsIHtcclxuICAgICAgICAgICAgICAgIHg6ICBDb25uZWN0aW9uLmdldENhc2goKSxcclxuICAgICAgICAgICAgICAgIG9uVXBkYXRlOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXNoLnRleHQgPSB0d2Vlbk9iai54LnRvRml4ZWQoMCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWRkQ2FzaCgpIHtcclxuICAgICAgICAgICAgdGhpcy5jYXNoID0gbmV3IFBJWEkuVGV4dChDb25uZWN0aW9uLmdldENhc2goKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgdGhpcy5jYXNoLnN0eWxlLmZvbnRGYW1pbHkgPSBcIkJldmFuXCI7XHJcbiAgICAgICAgICAgIHRoaXMuY2FzaC5zdHlsZS5mb250U2l6ZSA9IDYwO1xyXG4gICAgICAgICAgICB0aGlzLmNhc2guc3R5bGUuZmlsbCA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuY2FzaCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNhc2hJY29uID0gbmV3IFBJWEkuU3ByaXRlKFN0YWdlLmdldFRleHR1cmUoXCJjYXNoXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5jYXNoSWNvbi5hbmNob3Iuc2V0KDAuNSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FzaEljb24ud2lkdGggPSA1MDtcclxuICAgICAgICAgICAgdGhpcy5jYXNoSWNvbi5oZWlnaHQgPSA1MDtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmNhc2hJY29uKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2FzaC54ID0gNDQwO1xyXG4gICAgICAgICAgICB0aGlzLmNhc2gueSA9IDMwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jYXNoSWNvbi54ID0gNDEwO1xyXG4gICAgICAgICAgICB0aGlzLmNhc2hJY29uLnkgPSA3NTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgYWRkVGl0bGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSBuZXcgUElYSS5UZXh0KFwiQWRWZW50dXJlXFxuQ2FwaXRhbGlzdFwiKTtcclxuICAgICAgICAgICAgdGhpcy50aXRsZS5hbmNob3Iuc2V0KDAsIDApO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlLnN0eWxlLmZvbnRGYW1pbHkgPSBcIk1vZGFrXCI7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUuc3R5bGUuZm9udFNpemUgPSA2MDtcclxuICAgICAgICAgICAgdGhpcy50aXRsZS5zdHlsZS5hbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUuc3R5bGUuZmlsbCA9IFwiIzAwMDAwMFwiO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlLnN0eWxlLnN0cm9rZSA9IFwiI2ZmYzYwY1wiO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlLnN0eWxlLnN0cm9rZVRoaWNrbmVzcyA9IDEwO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlLnN0eWxlLmxpbmVIZWlnaHQgPSA1NTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudGl0bGUueCA9IDEwO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlLnkgPSAxMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgR2FtZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgVXBncmFkaW5nQ2lyY2xlIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG4gICAgICAgIHByaXZhdGUgZmlsbENpcmNsZTogUElYSS5HcmFwaGljcztcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpbGxDaXJjbGUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGxDaXJjbGUuYmVnaW5GaWxsKDB4OGUwY2ZmLCAxKTtcclxuICAgICAgICAgICAgdGhpcy5maWxsQ2lyY2xlLmRyYXdDaXJjbGUoMCwgMCwgMTcwKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBlbXB0eUNpcmNsZTogUElYSS5HcmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgICAgIGVtcHR5Q2lyY2xlLmJlZ2luRmlsbCgweDk5OTk5OSwgMSk7XHJcbiAgICAgICAgICAgIGVtcHR5Q2lyY2xlLmRyYXdDaXJjbGUoMCwgMCwgMTcwKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoZW1wdHlDaXJjbGUpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuZmlsbENpcmNsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVTdGF0ZSh2bzogR2FtZS5CdXNpbmVzc1ZPKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGxDaXJjbGUudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZvLmhhc01hbmFnZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZpbGxDaXJjbGUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZvLnVwZ3JhZGVUaW1lID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZvLmxldmVsID09PSAxICYmIENvbm5lY3Rpb24uZ2V0Q2FzaCgpID49IHZvLmxldmVsMlByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsbENpcmNsZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZvLmxldmVsID09PSAyICYmIENvbm5lY3Rpb24uZ2V0Q2FzaCgpID49IHZvLmxldmVsM1ByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsbENpcmNsZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZvLmxldmVsID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsbENpcmNsZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=