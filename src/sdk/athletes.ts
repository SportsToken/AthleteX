
interface Token {
    tokenSymbol: string;
    mintAddress: string;
    tokenName: string;
}

interface Market {
    marketCap: string;
    tradeVolume: string;

}

export class Athlete implements Token, Market { 
    
    name!: string;
    tokenSymbol!: string;
    mintAddress!: string;
    tokenName!: string;
    marketCap!: string;
    tradeVolume!: string;

    constructor()
    {
        
    }   
    
}

// Total Return Market Cap