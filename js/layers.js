addLayer("p", {
    name: "producers", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Producers", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {
         rows: 2,
         cols: 5,
            11: {
            
             description: "Producers produce strings!",
             cost: new Decimal(0),
             effect() { 
				eff = new Decimal(player.p.points)
                return eff
            },
        },
        12: {
            description: "Producers boost production",
            cost: new Decimal(10),

            effect() {
               eff = player.p.points.add(1).log(5).add(5).pow(2).div(4);
               return eff
            },
        },

        13: {
            description: "Gain a static boost",
            cost: new Decimal(25),

            effect() {
               eff = new Decimal(2);
               return eff
            },
        },

        21: {
            description: "Unlock Particle Accelerators",
            cost: new Decimal(25),

            effect() {
               eff = new Decimal(2);
               return eff
            },
        },
        },
    }
)

addLayer("a", {
    name: "Acheivements",
    symbol: "A",
    position: 0,
    startData(){ return {
        points: new Decimal(0),
    }},
    requires: new Decimal(0),
    resource: "AP",
    type: "none",
    exponent: 0.5,
    layerShown() {return true},
    achievements:{
        rows: 1,
        cols: 2,
        11: {
            name: "A Start",
            tooltip: "1 AP: Have 20,000 strings",
            done(){
                return player.points.gte(20000)
            }
        },
        12: {
            name: "Dimension Collection",
            tooltip: "1 AP: Own 32 producers",
            done(){
                return player.p.points(32)
            }
        },
    }

})




addLayer("t", {
    name: "test", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#5E33FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "test", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "t: Reset for test", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
