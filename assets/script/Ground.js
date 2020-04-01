cc.Class({
    extends: cc.Component,

    properties: {
        maps: {
            default: null,
            type: cc.Node,
        },

        sewers: {
            default: null,
            type: cc.Node,
        },

        mapSpeed: {
            default: 3,
            displayName: '地图移动速度'
        }
    },


    onLoad() {

    },

    start() {

    },

    update(dt) {
        if (!this.game.isGameStart()) return
        this.updateMap();
        this.updateSewer();
    },

    updateMap() {
        let maps = this.maps.children;
        let frontMap;
        for (let map of maps) {
            map.x -= this.mapSpeed;
            if (!frontMap) frontMap = map;
            else if (map.x < frontMap.x) frontMap = map;
        }

        if (frontMap.x <= -this.maps.children[0].width) {
            let deltaX = frontMap.x + this.maps.children[0].width;
            frontMap.setPosition(this.maps.children[0].width + deltaX, 0)
        }

    },

    updateSewer() {
        for (let sewer of this.sewers.children) {
            sewer.x -= this.mapSpeed
            if (sewer.x < -144) sewer.x = 144
        }
    },
    

    onClick() {
        console.log('跳一下')

        this.game.player.getComponent('Player').jump()
    }
});
