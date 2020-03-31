cc.Class({
    extends: cc.Component,

    properties: {

        speed: 10,
    },


    onLoad () {

    },

    start() {

    },

    update(dt) {

    },

    onClick() {
        console.log('跳一下')

        this.game.player.jump()
    }
});
