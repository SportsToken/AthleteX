/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line/*, Bar*/ } from "react-chartjs-2";

import fighters from "fighters.js";
import hist from "transactionHistory";

import {
  AccordionWithHeader,
  AccordionNode,
  AccordionHeader,
  AccordionPanel
} from 'react-accordion-with-header';


// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  Table,
  Row,
  Col,
} from "reactstrap";

import Wallet from '@project-serum/sol-wallet-adapter';
import { Connection, SystemProgram, clusterApiUrl, PublicKey } from '@solana/web3.js';


class Dashboard extends React.Component {
  constructor(props) {
    let providerUrl = 'https://www.sollet.io';
    const network = clusterApiUrl('devnet');
    super(props);
    this.state = {
      bigChartData: "data1",
      accordions: "updated",
      connection: new Connection(clusterApiUrl('devnet')),
      wallet: new Wallet(providerUrl, network),
      providerUrl: 'https://www.sollet.io',
      network: clusterApiUrl('devnet'),
      poolKey: new PublicKey('E1TGkB6aQmAe8uP3J8VMTyon1beUSY8ENkB3xym7hSYH'),
      recieveKey: new PublicKey('E1TGkB6aQmAe8uP3J8VMTyon1beUSY8ENkB3xym7hSYH'),
    };
  }
  
  
  logAction = (action,fighter) => {
    return(
      hist.push({
        action: action,
        name: fighter.name,
        division: fighter.division,
        date: function date() { return new Date().getDate()}, //Need to create method to get accurate date
        price:""
      }),
      fighter.isOwned = !fighter.isOwned,
      this.setState({state: this.state})
      );
    }

    componentDidMount() {
      this.state.wallet.connect();
      this.state.wallet.on('connect', publicKey => console.log('Connected to ' + publicKey.toBase58()));
      this.state.wallet.on('disconnect', () => console.log('Disconnected'));
    }

    setBgChartData = name => {
      this.setState({
        bigChartData: name
      });
    };
    
    setProviderUrl = url => {
        this.setState({
          providerUrl: url
        });
    }
    
    
    async buyFromPool(transferAmountString) {
      try {
        let amount = Math.round(parseFloat(transferAmountString) * 10 ** 9);
        let transaction = SystemProgram.transfer({
          fromPubkey: this.state.wallet.publicKey,
          toPubkey: this.state.poolKey, //pool key
          lamports: amount,
        });
        
        transaction.recentBlockhash = (
          await this.state.connection.getRecentBlockhash()
      ).blockhash;

      let signed = await this.state.wallet.signTransaction(transaction);
      let signature = await this.state.connection.sendRawTransaction(signed.serialize());
      await this.state.connection.confirmTransaction(signature, 1);

    } catch (e) {
      console.warn(e);
    }
  }

  async sellAFighter(transferAmountString) {
    try {
      let amount = Math.round(parseFloat(transferAmountString) * 10 ** 9);
      let transaction = SystemProgram.transfer({
        fromPubkey: this.state.wallet.publicKey,
        toPubkey: this.state.recieveKey,
        lamports: amount,
      });
      
      transaction.recentBlockhash = (
        await this.state.connection.getRecentBlockhash()
    ).blockhash;

    // let signed = await this.state.wallet.signTransaction(transaction);
    // let signature = await this.state.connection.sendRawTransaction(signed.serialize());
    // await this.state.connection.confirmTransaction(signature, 1);

  } catch (e) {
    console.warn(e);
  }
}

async makeTransaction() {
  try {
    let transaction = SystemProgram.transfer({
      fromPubkey: this.state.wallet.publicKey,
      toPubkey: this.state.recieveKey,
      lamports: Math.round(parseFloat("1") * 10 ** 9),
    });
    // addLog('Getting recent blockhash');
    transaction.recentBlockhash = (
      await this.state.connection.getRecentBlockhash()
    ).blockhash;
    // addLog('Sending signature request to wallet');
    let signed = await this.state.wallet.signTransaction(transaction);
    // addLog('Got signature, submitting transaction');
    let signature = await this.state.connection.sendRawTransaction(signed.serialize());
    // addLog('Submitted transaction ' + signature + ', awaiting confirmation');
    await this.state.connection.confirmTransaction(signature, 1);
    // addLog('Transaction ' + signature + ' confirmed');
  } catch (e) {
    console.warn(e);
    // addLog('Error: ' + e.message);
  }
}
  
  
  render() {
    return (
      <>
        <div className="content">
           <Row>
            <Col lg="6">

            </Col>
            <Col lg="6">
              
            </Col>
          </Row>


          <Row>
            <Col>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}


export default Dashboard
