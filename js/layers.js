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
            effectDisplay() { return format(tmp.p.upgrades[11].effect)+"/s" },
        },
        12: {
            description: "Producers boost production",
            cost: new Decimal(10),

            effect() {
               eff = new Decimal(1.1).pow(player.p.points).add(1);
               return eff
            },
            effectDisplay() { return format(tmp.p.upgrades[12].effect)+"x" },
        },

        13: {
            description: "Gain a static boost",
            cost: new Decimal(25),

            effect() {
               eff = new Decimal(2);
               return eff
            },
            effectDisplay() { return format(tmp.p.upgrades[13].effect)+"x" },
        },

        14: {
            description: "Boost string gain based on strings",
            cost: new Decimal(34),

            effect() {
                eff = player.points.plus(1).log(5).pow(1.5);
                return eff
            },
            effectDisplay() { return format(tmp.p.upgrades[14].effect)+"x" },
        },

        21: {
            description: "Unlock Achievements",
            cost: new Decimal(25),

            effect() {
               eff = new Decimal(2);
               return eff
            },
        },
        },
        buyables: {
            rows: 1,
            cols: 1,
            11: {
                title: "Particle Accererators",
                total(){
                    let total = getBuyableAmount("p",11)
                    return total
                },
                base(){
                    base = new Decimal(1.1)
                    return base
                },
                effect(){
                    let x = tmp[this.layer].buyables[this.id].total
                    let base = tmp[this.layer].buyables[this.id].base
                    let eff = Decimal.pow(base, x)
                    return eff
                },
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(2, x)
                    return cost.floor()},
                    canAfford() {
                        return player.points.gte(tmp[this.layer].buyables[this.id].cost)},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
                    if (this.canAfford()) {
                        player.points = player.points.sub(cost).max(0)
                        player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1).max(1)
                    }
                },
            }
        }
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
    row: "side",
    layerShown() {return true},
    effbase(){
        eff = new Decimal(2)
        return eff
    },
    effect(){
        let eff = this.effbase()
        eff = Decimal.pow(eff,player.a.points)
        return eff
    },
    effectDescription() {
        return "which boosts string gain by " + format(tmp.a.effect)
    },
    achievements:{
        rows: 1,
        cols: 2,
        11: {
            name: "A Start",
            tooltip: "1 AP: Have 20,000 strings",
            done(){
                return player.points.gte(20000)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        12: {
            name: "Dimension Collection",
            tooltip: "1 AP: Own 32 producers",
            done(){
                return player.p.points.gte(32)
            },
            onComplete() {
                addPoints("a",1)
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
