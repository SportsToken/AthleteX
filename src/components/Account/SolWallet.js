import React from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import { Button } from 'reactstrap';

let providerUrl = 'https://www.sollet.io';
const network = clusterApiUrl('testnet');
const connection = new Connection(clusterApiUrl('testnet'))
window.SolWallet = new Wallet(providerUrl, network);
// save to local


class Account extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            poolKey: new PublicKey('E1TGkB6aQmAe8uP3J8VMTyon1beUSY8ENkB3xym7hSYH'),
            recieveKey: new PublicKey('E1TGkB6aQmAe8uP3J8VMTyon1beUSY8ENkB3xym7hSYH'),
          };
    }
}

export function ConnectToSolButton() {

  if (window.SolWallet.connected)
  {
    return (
      <>
      <div >Wallet address: {window.SolWallet.publicKey.toBase58()}.</div>
    </>
    );
  } 

    return (
      <Button onClick={() => window.SolWallet.connect()} > Connect to a Wallet</Button>
    )

}

( async => {
  window.SolWallet.connected ? :
})();

export default Account;