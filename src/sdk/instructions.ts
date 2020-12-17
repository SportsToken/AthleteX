
import {
    PublicKey,
    TransactionInstruction,
    SYSVAR_RENT_PUBKEY,
    SystemProgram,
  } from '@solana/web3.js';

enum command{
    /*
        Commands for oracle
    */
    checkQueue, //check the player queue for players with same bet # to create match
    createMatch, //create the match with a ID ->store list of matches
    updateEvents, //Update the results of fights for each match
    sendWinnerReward, //When the event is complete, the winner should be sent the prize

    /*
        Commands for users
    */
    enterQueue, //Enter a user into the queue
    setLineup //Set the lineup for a user
}

class h2hInstruction{
    
}