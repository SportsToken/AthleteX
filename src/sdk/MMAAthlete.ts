import { AEthlete } from "./AEthletes";

export class MMAAthlete extends AEthlete {
    id!: number;
    division!: string;
    record!: string;
    weight!: string;
    isOwned!: boolean;
    athleteName: string;
    tokenName: string;

    constructor(name:string, division: string)
    {
        super();
        this.athleteName = name;
        this.isOwned = false; // don't 0 athlete by default
        this.tokenName = "mmaAE";
        this.id = Math.random() *10;
    }

    getDivision()
    {
        return this.division;
    }

    setDivision(d:string)
    {
        this.division = d;
    }

    switchOwnership()
    {
        this.isOwned = !(this.isOwned);
    }

    checkOwnership()
    {
        
    }

    // @ts-check
    getTokenName(): string
    {
        return "";
    }
}