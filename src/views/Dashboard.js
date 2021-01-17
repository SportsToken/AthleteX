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
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">
                  View Pool
                  </CardTitle>
                </CardHeader>
                <CardBody>
                <tbody>
                <tr>
                <td>
                  <p className="title">Liquidity Pool</p>
                  <p className="text-muted">
                    <a href="https://explorer.solana.com/tx/5djJU71EoLg6iwm6kdf1vvXPMq7qaFd6fv6qvmg6cBG93Kmc8apxULPDaLNrtkxoSUTcem7GYVhTb8bsDbQyAGvg?cluster=testnet" target="_blank" >View Transactions</a>
                  </p>
                </td>
                </tr>
                <tr>
                  <td>
                  <p className="title">Change Player:{``}</p>
                  <p className="text-muted">
                    <input
                  type="text"
                  onChange={(e) => (e.target.value.trim() < 33) ? this.setState({recieveKey: this.state.poolKey}): this.setState({recieveKey: new PublicKey(e.target.value.trim())})}
                />
                </p>
                  </td>
                </tr>
                <tr>
                <Button onClick={() => this.makeTransaction()} > [Test] Send One Transaction</Button>

                </tr>
              </tbody>
                </CardBody>
                <CardFooter className="d-flex justify-content-center">
                  { this.state.poolKey.toString() === this.state.recieveKey.toString() ? <div>Pool Address: {this.state.poolKey.toString()}</div>: <div>Player Address: {this.state.recieveKey.toString()}</div>}
                  
                </CardFooter>
              </Card>
            </Col>
          </Row>
          
          <Row>
            <Col>
            <Card>
              <CardHeader>
                  <CardTitle tag="h3">My Fighters</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                <Col md="4">Name</Col>
                <Col >Division</Col>
                <Col>Price</Col>
                <Col xs="2">Win-Loss</Col>
                <Col xs="1"></Col>
                </Row>
              </CardBody>
              <AccordionWithHeader multipleOkay={true} >
                {fighters.filter(fighter =>{if(fighter.isOwned){
                  return true;
                }else{
                  return false;
                }}).map(fighter =>{
                  return(
                  <AccordionNode key={fighter.id}>
                  <AccordionHeader 
                   titleColor="white"
                   horizontalAlignment="centerSpaceBetween">
                     <Col md="4">{fighter.name}</Col>
                      <Col md="3">{fighter.division}</Col>
                      <Col>{fighter.weight}</Col>
                      <Col>{fighter.record}</Col>
                      <Col xs="1">
                        <Button onClick={() => this.sellTransaction(`${fighter.weight}`)}
                          color="danger"
                          id="4"
                          size="sm"
                          tag="label"
                         >
                          <input
                             className="d-none"
                            name="options"
                            type="radio"
                            onClick={() => this.logAction("sold",fighter)}
                          />
                         <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Sell?
                         </span>
                        </Button>
                      </Col>
                  </AccordionHeader>
                  <AccordionPanel><CardBody>Testing123</CardBody></AccordionPanel>
                  </AccordionNode>
                  );
                })}

                {/* array.forEach(element => {
                  
                }); */}
              </AccordionWithHeader>
            </Card>         
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
