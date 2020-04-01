cc.Class({
    extends: cc.Component,

    properties: {

        jumpSpeed: {
            default: 6,
            displayName: '上跳的速度',
        },
        fallSpeed: {
            default: 0.03,
            displayName: '下降速度'
        },

        ySpeed: 0,
    },

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
    },

    start() {

    },

    jump() {
        console.log('我跳')

        this.ySpeed = this.jumpSpeed
    },

    update(dt) {
        if (!this.game.isGameStart()) return

        this.updatePlayer()
    },

    updatePlayer() {
        this.ySpeed -= this.fallSpeed;
        this.node.y += this.ySpeed;

        if (Math.abs(this.node.y) > 256) this.triggerCollide(0)
    },

    onCollisionEnter (other, self) {
        console.log('on collision enter', other, self);
        this.triggerCollide(1)
    },

    triggerCollide(type) {
        if(type === 0 ) {
            console.log('越界')
        } else if(type === 1) {
            console.log('碰撞')
        }
        this.game.gameOver()
    },
});
