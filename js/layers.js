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
        {key: "p", description: "P: Reset for Producers", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    canBuyMax(){
        return hasMilestone("s", 0)
    },

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
               affProd = player.p.points.sub(308)
               if (player.p.points.gte(308)) {eff = new Decimal(1.05).pow(affProd).mul(6e12)}
               return eff
            },
            effectDisplay() { return format(tmp.p.upgrades[12].effect)+"x" },
        },

        13: {
            description: "Gain a static boost",
            cost: new Decimal(25),
            
            
            effect() {
               eff = Decimal.pow(2, tmp.s.effect)
               return eff
            },
            effectDisplay() { return format(tmp.p.upgrades[13].effect)+"x" },
        },

        14: {
            description: "Boost string gain based on strings",
            cost: new Decimal(28),
            
            base(){
                base = player.points.plus(7).log(7).pow(2);
                return base
            },
            effect() {
                let eff = this.base()
                //let upg15eff = player.points.add(10).log(10).pow(0.5)
                //if(hasUpgrade("p",15)) eff = eff.pow(upg15eff)
                return eff
            },
            effectDisplay() { return format(tmp.p.upgrades[14].effect)+"x" },
        },

        /* 15: {
            description: "Raise the last upgrade based on strings",
            cost: new Decimal(36),

            effect(){
                eff = player.points.add(10).log(10).pow(0.25)
                return eff
            },
            effectDisplay() { return format(tmp.p.upgrades[15].effect)+"x" },
        }  

        21: {
            description: "Unlock Achievements",
            cost: new Decimal(25),

            effect() {
               eff = new Decimal(2);
               return eff
            },
        },*/
        },
        buyables: {
            rows: 1,
            cols: 2,
            11: {
                title: "Particle Accererators",
                total(){
                    let total = getBuyableAmount("p",11)
                    return total
                },
                base(){
                    let base = new Decimal(1.1)
                    base = base.add(tmp.m.effect)
                    return base
                },
                effect(){
                    let x = tmp[this.layer].buyables[this.id].total
                    let base = tmp[this.layer].buyables[this.id].base
                    let eff = Decimal.pow(base, x)
                    return eff
                },
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1.5, x).mul(1e9).div(tmp.m.effect2)
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
                display() { // Everything else displayed in the buyable button after the title
                    return "Multiply string gain by "+format(this.base())+".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" strings\n\
                    Effect: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                    Amount: " + formatWhole(getBuyableAmount("p", 11))
                },
            },
            12: {
                title: "Particle Accererators",
                total(){
                    let total = getBuyableAmount("p",12)
                    return total
                },
                base(){
                    base = new Decimal(10)
                    return base
                },
                effect(){
                    let x = tmp[this.layer].buyables[this.id].total
                    let base = tmp[this.layer].buyables[this.id].base
                    let eff = Decimal.pow(base, x)
                    return eff
                },
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(2, x).mul(0)
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
                display() { // Everything else displayed in the buyable button after the title
                    return "Multiply string gain by "+format(this.base())+".\n\
                    Cost: " + format(tmp[this.layer].buyables[this.id].cost)+" strings\n\
                    Effect: " + format(tmp[this.layer].buyables[this.id].effect)+"x\n\
                    Amount: " + formatWhole(getBuyableAmount("p", 12))
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
        eff = new Decimal(1.5)
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
        rows: 2,
        cols: 6,
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
        13: {
            name: "Start Pushing",
            tooltip: "1 AP: Have 100,000,000 strings",
            done(){
                return player.points.gte(1e8)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        14: {
            name: "That Was Weak",
            tooltip: "1 AP: Get 2 particle accelerators",
            done(){
                return player.p.buyables[11].eq(2)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        15: {
            name: "Are You Still OK?",
            tooltip: "1 AP: Own 85 producers",
            done(){
                return player.p.points.gte(81)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        15: {
            name: "Almost There",
            tooltip: "1 AP: Have 75 Producers",
            done(){
                return player.p.points.gte(75)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        16: {
            name: "NULL",
            tooltip: "1 AP: Have at least one shard",
            done(){
                return player.s.points.gte(1)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        21: {
            name: "Softcap Soon?",
            tooltip: "1 AP: Have 1e18 strings",
            done(){
                return player.points.gte(1e18)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        22: {
            name: "Gaming",
            tooltip: "1 AP: Have your Particle Accerator total multiplier be more than 5x while the second upgrades effect is less than 5x",
            done(){
                return player.p.buyables[11].gte(17) && player.p.points.lte(16)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        23: {
            name: "(softcapped)",
            tooltip: "1 AP: Have 104976 shards",
            done(){
                return player.s.points.gte(104976)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
        23: {
            name: "Attraction",
            tooltip: "1 AP: Get magnetic force",
            done(){
                return player.m.points.gte(1)
            },
            onComplete() {
                addPoints("a",1)
            }
        },
    },

    

})  




addLayer("s", {
    name: "shards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#5E33FF",
    requires: new Decimal(1e12), // Can be a function that takes requirement increases into account
    resource: "shards", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    canBuyMax(){return true},
    exponent: 0.33, // Prestige currency exponent


    effbase(){
        eff = 0.25
        return eff
    },
    effect(){
        eff = Decimal.add(player.s.points, 1).pow(0.25)
        if (eff.gte(18)) eff = new Decimal(18).add(player.s.points.sub(104976).pow(0.06)).sub(1)
        return eff
    },
    effectDescription() {
        return "which brings the third producer upgrade to the power of " + format(tmp.s.effect)
    },



    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "s: Reset for Shards", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    milestones: {
        0: {
            requirementDescription: "100,000 shards",
            effectDescription: "Gain the ability to buy max producers",
            done() { return player.s.total.gte(100000) }
        },
    }

})

addLayer("m",{
    name:"magnetic force",
    symbol: "M",
    position:0,
    startData(){ return{
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "#CB29F2",
    requires: new Decimal(600000),
    resource: "magnetic force",
    baseResource: "shards",
    baseAmount() {return player.s.points},
    type: "static",
    canBuyMax(){
        return false
    },
    base: new Decimal(1.666666),
    exponent: new Decimal(999),

    hotkeys: [
        {key: "m", description: "m: Reset for Magnetic Force", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    effect(){
    let eff = Decimal.mul(player.m.points, 0.01).pow(0.66)
    return eff
    },
    effect2(){
    let eff2 = Decimal.pow(2.25, player.m.points)
    return eff2
    },

    effectDescription() {
        return "which adds " + format(tmp.m.effect) + " to the effect of Particle Accerators and divides their cost by " + format(tmp.m.effect2)
    },
    layerShown(){return true},








}

)
