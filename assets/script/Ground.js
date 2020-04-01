cc.Class({
    extends: cc.Component,

    properties: {
        sewerPrefab: {
            default: null,
            type: cc.Prefab,
        },
        maps: {
            default: null,
            type: cc.Node,
        },
    },


    onLoad() {
        this.lastCenter = 256;
        this.nextSpawnTime = 1;
    },

    start() {

    },

    update(dt) {
        if (!this.game.isGameStart()) return
        this.updateMap();

        if (this.nextSpawnTime > 0) {
            this.nextSpawnTime -= dt
        } else {
            this.spawnNewSewers()
            this.nextSpawnTime = 2
        }
    },

    updateMap() {
        let maps = this.maps.children;
        let frontMap;
        for (let map of maps) {
            map.x -= this.game.mapSpeed;
            if (!frontMap) frontMap = map;
            else if (map.x < frontMap.x) frontMap = map;
        }

        if (frontMap.x <= -this.maps.children[0].width) {
            let deltaX = frontMap.x + this.maps.children[0].width;
            frontMap.setPosition(this.maps.children[0].width + deltaX, 0);
        }

    },

    onClick() {
        console.log('跳一下')

        this.game.player.getComponent('Player').jump()
    },


    getSewerCoordinates() {
        let arr = [];
        // 可以看做把两个水管连起来, 在中间掏去一段
        // 单水管高度 320, 屏幕高度 512,  
        let INTERVAL = 80;
        // let lastCenter = 256;

        let MIN_LENGTH = 512 - 320 - INTERVAL; // 112

        let FULL_HEIGHT = 512;
        let FULL_LENGTH = 320;
        let CENTER = FULL_HEIGHT / 2;
        let HALF_LENGTH = FULL_LENGTH / 2;
        
        let TOP = ~~(FULL_LENGTH * Math.random())
        TOP = Math.max(TOP, MIN_LENGTH)
        
        arr.push({
            // type: 'top',
            rotation: 180,
            y: CENTER + HALF_LENGTH - TOP,  // [112, 416]

        })
        arr.push( {
            // type: 'bottom',
            rotation: 0,
            y: -(CENTER + HALF_LENGTH) + (FULL_HEIGHT - TOP - INTERVAL),            // [-416,-112]
        })
        return arr
    },

    spawnNewSewers() {
        let sewers = this.getSewerCoordinates().map(info => this.sewerFactory(info))
        
        for(let sewer of sewers) {
            this.node.addChild(sewer)
        }

    },

    sewerFactory({ y, rotation }) {
        // 根据prefab创建节点
        const sewer = cc.instantiate(this.sewerPrefab);
        sewer.getComponent('SewerItem').game = this.game;

        sewer.rotation = rotation;
        sewer.setPosition(cc.v2(144, y))
        return sewer;
    }
});
