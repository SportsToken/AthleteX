
import mma from "mma";

function fighterPrice() {
    return Math.floor((Math.random() * 10) + 1);
}

export class player {
    constructor(name, sport, isOwned, weight, pool, data) {
        this.name = name || "";
        this.sport = sport || null;
        this.isOwned = isOwned || false;
        this.weight = weight || 0;
        this.pool = pool || null;
        this.data = data || null;
    }
}

export let popFighters = async (nameArr,callback) => {
    if(!Array.isArray(nameArr) || !nameArr.length){
        console.log('Array was null');
        return null;
    }

    let fighterAr = await Promise.all(nameArr.map( async (name) =>{
        let addFighter =  new Promise((resolve)=>{
            mma.fighter(name,(data)=>{
                resolve(new player(data.name,"ufc",null,null,null,data));
            })
        })
        return addFighter;
    }))

    fighterAr.map((fighter,i)=>{
        fighter.weight = fighters[i].weight;
    })
    if(fighterAr.length > 1){
        fighterAr.sort(function(a,b){
            let name1 = a.name.toLowerCase();
            let name2 = b.name.toLowerCase();
            if(name1<name2)return -1;
            if(name1>name2)return 1;
            return 0;
        });
    }
    callback(fighterAr);
}


var fighters = [
    {
        id: 0,
        name: "Khabib Nurmagomedov",
        division: "Lightweight",
        record: "29-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 10 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 1,
        name: "Justin Gaethje",
        division: "Lightweight",
        record: "23-2-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 5 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 2,
        name: "Dustin Poirier",
        division: "Lightweight",
        record: "26-6-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 6 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 3,
        name: "Tony Ferguson",
        division: "Lightweight",
        record: "26-5-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 3 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 4,
        name: "Conor McGregor",
        division: "Lightweight",
        record: "22-4-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 4 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 5,
        name: "Dan Hooker",
        division: "Lightweight",
        record: "20-9-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 4 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 6,
        name: "Charles Oliveira",
        division: "Lightweight",
        record: "29-8-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 7 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 7,
        name: "Paul Felder",
        division: "Lightweight",
        record: "17-5-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 1 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 8,
        name: "Diego Ferreira",
        division: "Lightweight",
        record: "17-2-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 5 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 9,
        name: "Al Iaquinta",
        division: "Lightweight",
        record: "14-6-1", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 2 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 10,
        name: "Kevin Lee",
        division: "Lightweight",
        record: "18-6-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 8 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 11,
        name: "Beneil Dariush",
        division: "Lightweight",
        record: "18-4-1", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 2 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 12,
        name: "Islam Makhachev",
        division: "Lightweight",
        record: "18-1-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 1 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 13,
        name: "Gregor Gillespie",
        division: "Lightweight",
        record: "13-1-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 9 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 14,
        name: "Drew Dober",
        division: "Lightweight",
        record: "23-9-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 9 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
    {
        id: 15,
        name: "Donald Cerrone",
        division: "Lightweight",
        record: "36-15-0", //want to replace with dataPath
        isOwned: false,
        //pool: "ufc-lightweight-pool"
        weight: 10 //% of pool occupied
        //dataPath: "/variables/fighterData.js"
    },
];

export let lwFighterNames = fighters.map((fighter)=>{
    return fighter.name
});

export default fighters;