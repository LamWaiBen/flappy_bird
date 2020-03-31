cc.Class({
    extends: cc.Component,

    properties: {
        startbtn: {
            default: null,
            type: cc.Button,
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

    },

    onLoad() {

    },

    start() {
        this.ground.game = this;
        this.player.game = this;
    },

    isGameInit() { return this.gameStatus === 0},
    isGameStart(){ return this.gameStatus === 1},
    isGameOver() { return this.gameStatus === 2},
    isGamePause() { return this.gameStatus === 3},

    gameStart() {
        if(!this.isGameInit()) return;
        console.log('游戏开始');
        this.startbtn.node.active = false;
        this.mask.node.active = false;

        this.gameStatus = 1
    },

    gameOver() {
        if (!this.isGameStart()) return;

        // show scorebroad
        this.mask.node.active = true;

        this.gameStatus = 2
    },

    gameReset() {
        // close scorebroad

        this.score = 0
        this.second = 0
        this.gameStatus = 0

        this.mask.node.active = false;
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
    }
});
