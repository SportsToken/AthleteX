import React from 'react';
import { Connection, SystemProgram, clusterApiUrl, PublicKey } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';

import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardFooter,
    Button,
    Table,
} from 'reactstrap';

class Account extends React.Component {
    constructor(props)
    {
        super(props);
        let providerUrl = 'https://www.sollet.io';
        const network = clusterApiUrl('testnet');
        this.state = {
            bigChartData: "data1",
            accordions: "updated",
            connection: new Connection(clusterApiUrl('testnet')),
            wallet: new Wallet(providerUrl, network),
            providerUrl: 'https://www.sollet.io',
            network: clusterApiUrl('testnet'),
            poolKey: new PublicKey('E1TGkB6aQmAe8uP3J8VMTyon1beUSY8ENkB3xym7hSYH'),
            recieveKey: new PublicKey('E1TGkB6aQmAe8uP3J8VMTyon1beUSY8ENkB3xym7hSYH'),
          };
    }
    
    render() {
        return (
            <Card className="card-chart">
            <CardHeader>
              <CardTitle tag="h3">
              My Wallet
              </CardTitle>
            </CardHeader>
            <CardBody>
        <Table>
          <tbody>
            <tr>
            <td>
              <p className="title">Wallet Network</p>
              <p className="text-muted">
              {this.state.network}
              </p>
            </td>
            </tr>
            <tr>
            Wallet provider:{``}
              <a className="text-muted">
                <input
              type="text"
              value={this.state.providerUrl}
              onChange={(e) => this.setProviderUrl(e.target.value.trim())}
            />
            </a>
            </tr>
          </tbody>
        </Table>
            </CardBody>
          <CardFooter className="d-flex justify-content-center">
          {this.state.wallet.connected ? (
          <>
            <div >Wallet address: {this.state.wallet.publicKey.toBase58()}.</div>
          </>
        ) : (
          <Button onClick={() => this.state.wallet.connect()} > Connect to a Wallet</Button>
        )}
          </CardFooter>
          </Card>
        )
    }
}


export default Account;