
import { mintAthleteToken, wallet } from './globals';
import { Account, PublicKey } from '@solana/web3.js';  //Rip SOLANA -- needs to be stripped out
interface Token {
    tokenSymbol: string;
    mintAddress: Account;
    tokenName: string;
    tokenPublicKey: PublicKey;
}

interface Market {
    marketCap: number;
    tradeVolume: string;
}

interface Athlete {
    League: string;
    Name: string;

}

export abstract class AthleteToken implements Athlete, Token, Market { 
    
    athleteName!: string;
    mintAddress!: Account;
    marketCap!: number;
    tradeVolume!: string;
    tokenPrice!: number;
    tokenSymbol!: string;
    tokenName!: string;
    tokenPublicKey!: PublicKey;
    League!: string;
    Name!: string;
    
    constructor()
    {

        this.tokenPrice = 10; //Sol
        // this.mintToken();
        this.tokenName = "ae";
    }

    getTokenMint()
    {
        return this.mintAddress;
    }

    setTokenMint(newMintAddress: Account)
    {
        this.mintAddress = newMintAddress;
    }

    buyToken()
    {
        
    }

    burnToken()
    {
        // MISSING -- Burn Token Option
    }

     mintToken()
    {
        // Creates the option in your account
        mintAthleteToken(this.tokenName, this.tokenSymbol, 100); //two decimals
    }

    setTokenPrice(updatedPrice: number)
    {
        this.tokenPrice = updatedPrice;
    }

    getTokenPrice(): number
    {
        return this.tokenPrice;
    }

    getTokenName(): string
    {
        return this.getTokenName();
    }

    getTokenSymbol(): string
    {
        return this.getTokenSymbol();
    }
}
// Total Return Market Cap