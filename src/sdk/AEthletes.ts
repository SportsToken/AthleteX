interface Token {
    tokenSymbol: string;
    mintAddress: Account;
    tokenName: string;
    // tokenPublicKey: PublicKey;
}

interface Market {
    marketCap: number;
    tradeVolume: string;
}

interface Athlete {
    League: string;
    Name: string;

}

export abstract class AEthlete { 

    constructor()
    {
        
    }
}