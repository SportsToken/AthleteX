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
  //DropdownItem,
  //UncontrolledDropdown,
  //Label,
  //FormGroup,
  //Input,
  //Table,
  Row,
  Col,
  //UncontrolledTooltip
} from "reactstrap";

// core components
import {
  chartExample1,
 // chartExample2,
 // chartExample3,
 // chartExample4
} from "variables/charts.js";

import Wallet from '@project-serum/sol-wallet-adapter';
import { Connection, SystemProgram, clusterApiUrl } from '@solana/web3.js';


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
      poolAddress: 'E1TGkB6aQmAe8uP3J8VMTyon1beUSY8ENkB3xym7hSYH'
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
    
    
    async sendTransaction(fromAddress, toAddress, price) {
      try {
        let transaction = SystemProgram.transfer({
          fromPubkey: fromAddress || this.state.wallet.publicKey,
          toPubkey: toAddress ||this.state.wallet.publicKey,
          lamports: price * 1000000000,
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
  
  
  render() {
    return (
      <>
        <div className="content">
           <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">
                  Your Wallet
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
                <p className="title">Wallet provider:{``}</p>
                  <p className="text-muted">
                    <input
                  type="text"
                  value={this.state.providerUrl}
                  onChange={(e) => this.setProviderUrl(e.target.value.trim())}
                />
                </p>
                <div>
            </div>
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
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Daily Sales</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    3,500€
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Liquidity Pool</h5>
                </CardHeader>
                <CardBody>
                
                </CardBody>
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
              <AccordionWithHeader multipleOkay={true} >{/*
                <AccordionNode>
                  <AccordionHeader 
                   titleColor="white"
                   horizontalAlignment="centerSpaceBetween">
                     <div>Khabib Nurmagomedov</div>
                      <div>Lightweight</div>
                      <div>100%</div>
                      <div>29-0</div>
                      <div>
                        <Button
                          color="danger"
                          id="4"
                          size="sm"
                          tag="label"
                           //onClick={}
                         >
                          <input
                             className="d-none"
                            name="options"
                            type="radio"
                          />
                         <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Sell?
                         </span>
                        </Button>
                      </div>
                  </AccordionHeader>
                  <AccordionPanel><CardBody>Testing123</CardBody></AccordionPanel>
              </AccordionNode>*/}
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
                        <Button onClick={this.sendTransaction(this.state.poolAddress, this.state.wallet.publicKey, fighter.weight)}
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
              </AccordionWithHeader>
            </Card>         
            </Col>
          </Row>
          <Row>
            <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Available Fighters</CardTitle>
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
              <AccordionWithHeader>
              {fighters.map((fighter,i)=>{
                  return(
                  <AccordionNode key={i}>
                  <AccordionHeader 
                   titleColor="white"
                   horizontalAlignment="centerSpaceBetween">
                     <Col md="4">{fighter.name}</Col>
                      <Col md="3">{fighter.division}</Col>
                      <Col>{fighter.weight}</Col>
                      <Col>{fighter.record}</Col>
                      <Col xs="1">
                        <Button onClick={this.sendTransaction()}
                          color="success"
                          id="4"
                          size="sm"
                          tag="label"
                          disabled={fighter.isOwned}
                         >
                          <input
                             className="d-none"
                            name="options"
                            type="radio"
                            onClick={() => this.logAction("Purchased",fighter)}
                          />
                         <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            {fighter.isOwned?"Owned":"Buy"}
                         </span>
                        </Button>
                      </Col>
                  </AccordionHeader>
                  <AccordionPanel><CardBody>Testing123</CardBody></AccordionPanel>
                  </AccordionNode>
                  );
                })}
                </AccordionWithHeader>
            </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
