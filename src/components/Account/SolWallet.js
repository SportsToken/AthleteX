import React from 'react';
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import { Button } from 'reactstrap';
import { wallet } from '../../sdk/globals';

window.SolWallet = wallet;
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
    return (
      <Button onClick={() => window.SolWallet.connect()} className="btn-round" > Connect to Sollet</Button>
    )

}

export default Account;