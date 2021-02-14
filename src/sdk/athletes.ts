
import { mintTestToken, wallet } from './globals';

interface Token {
    tokenSymbol: string;
    mintAddress: string;
    tokenName: string;
}

interface Market {
    marketCap: string;
    tradeVolume: string;
}

export abstract class Athlete implements Token, Market { 
    
    name!: string;
    tokenPrice!: string;
    tokenSymbol!: string;
    mintAddress!: string;
    tokenName!: string;
    marketCap!: string;
    tradeVolume!: string;

    constructor(name: string)
    {

    }   
    
    getTokenMint()
    {
        return this.mintAddress;
    }

    setTokenMint(newMintAddress: string)
    {
        this.mintAddress = newMintAddress;
    }

    buyToken()
    {
        // creates token to ur wallet
        wallet.createTokenAccount(this.mintAddress);
    }

    mintToken()
    {

    }

    burnToken()
    {
        
    }
}
// Total Return Market Cap