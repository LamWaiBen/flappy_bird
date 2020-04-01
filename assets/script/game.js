cc.Class({
    extends: cc.Component,

    properties: {
        startTitle: {
            default: null,
            type: cc.Node,
        },

        failTitle: {
            default: null,
            type: cc.Node,
        },

        mask: {
            default: null,
            type: cc.Sprite,
        },

        ground: {
            default: null,
            type: cc.Node,

        },

        player: {
            default: null,
            type: cc.Node,
        },

        score: 0,
        second: 0,
        gameStatus: 0,      // 0: 未开始, 1: 游戏中,  2:游戏结束,  3: 游戏暂停
        
        mapSpeed: {
            default: 3,
            displayName: '地图移动速度',
        },

    },

    onLoad() {
        this.ground.getComponent('Ground').game = this;
        this.player.getComponent('Player').game = this;

    },

    start() {
    },

    isGameInit() { return this.gameStatus === 0 },
    isGameStart() { return this.gameStatus === 1 },
    isGameOver() { return this.gameStatus === 2 },
    isGamePause() { return this.gameStatus === 3 },

    gameStart() {
        if (!this.isGameInit()) return;
        console.log('游戏开始');
        this.startTitle.active = false;
        this.mask.node.active = false;

        this.gameStatus = 1
    },

    gameOver() {
        if (!this.isGameStart()) return;

        // show scorebroad
        this.failTitle.active = true;
        this.mask.node.active = true;

        this.gameStatus = 2
    },

    gameReset() {
        // close scorebroad

        this.score = 0
        this.second = 0
        this.gameStatus = 0

        this.startTitle.active = true;
        this.failTitle.active = false;
        this.mask.node.active = false;

        this.player.stopAllActions();
        this.ground.stopAllActions();
        cc.director.loadScene('game');
    },

    // update() {

    // }

    onClickMask() {
        if (this.isGameInit()) {
            this.gameStart()
        } else if (this.isGameOver()) {
            this.gameReset()
        } else if (this.isGamePause()) {
            this.gameStart()
        }
    },

    passSewer() {
        // this.player.getComponent('Player')
    },
});
