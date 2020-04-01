cc.Class({
    extends: cc.Component,

    properties: {
    },

    // onLoad () {},

    start() {

    },

    update(dt) {
        if (!this.game.isGameStart()) return
        this.node.x -= this.game.mapSpeed
        if (this.node.x < this.game.player.getComponent('Player').x) {
            this.onPassed();
        } else if(this.node.x < -172) {
            this.node.destroy();
        } 
    },

    onPassed() {
        this.node.destroy();
    }
});
