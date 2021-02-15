import { AthleteToken } from "./athletes";

export class MMAAthlete extends AthleteToken {
    id!: number;
    division!: string;
    record!: string;
    weight!: string;
    isOwned!: boolean;

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
        return super.getTokenName() + "MMA" + this.athleteName;
    }
}