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
import React from "../front-end/src/src/react";
// nodejs library that concatenates classes
import classNames from "../front-end/src/src/classnames";
// react plugin used to create charts
import { Line/*, Bar*/ } from "../front-end/src/src/react-chartjs-2";

import {player,popFighters,lwFighterNames} from "fighters.js";
import hist from "transactionHistory";

import {
  AccordionWithHeader,
  AccordionNode,
  AccordionHeader,
  AccordionPanel
} from '../front-end/src/src/react-accordion-with-header';


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
} from "../front-end/src/src/reactstrap";

// core components
import {
  chartExample1,
 // chartExample2,
 // chartExample3,
 // chartExample4
} from "../front-end/src/src/variables/charts.js";

//import {popFighters ,defaultAr} from "../fighters";

import IFrame from'react-iframe'
import Wallet from '@project-serum/sol-wallet-adapter';
import { Connection, SystemProgram, clusterApiUrl, PublicKey } from '@solana/web3.js';

let fighters = [];

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
      walletKey: new PublicKey('AqXBCLmHzX9k5z81eNJ1AyDfjMQbEPb7vYb4dsbWbXnv'),
      fighters: fighters
    };
  }
  
  fillFighter = (array) => {
    popFighters(array,(data)=>{
      fighters = data;
      this.setState({fighters: fighters});
    });
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
      this.fillFighter(lwFighterNames);
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
/*
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
  */
  
  render() {
    return (
      <>
        <div className="content">
           <Row>
            <Col lg="6">
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
                <p className="title">Wallet provider:{``}</p>
                  <p className="text-muted">
                    <input
                  type="text"
                  value={this.state.providerUrl}
                  onChange={(e) => this.setProviderUrl(e.target.value.trim())}
                />
                </p>
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
            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3">
                  Liquidity Pool
                  </CardTitle>
                </CardHeader>
                <CardBody>
              <Table>
              <tbody>
                <tr>
                <td>
                  <p className="title">Liquidity Pool</p>
                  <p className="text-muted">
                    <a href="https://explorer.solana.com/address/E1TGkB6aQmAe8uP3J8VMTyon1beUSY8ENkB3xym7hSYH/tokens?cluster=devnet" target="_blank" >View Balance</a>
                  </p>
                </td>
                </tr>
                <tr>
                  <td>
                  <p className="title">Send to a Player [Wallet Address]:{``}</p>
                  <p className="text-muted">
                    <input
                  type="text"
                  onChange={(e) => (e.target.value.trim() < 33) ? this.setState({recieveKey: this.state.poolKey}): this.setState({recieveKey: new PublicKey(e.target.value.trim())})}
                />
                </p>
                  </td>
                </tr>
                <tr>
                  <td>
                  { this.state.poolKey.toString() === this.state.recieveKey.toString() ? <div>Pool Address: {this.state.poolKey.toString()}</div>: <div>Player Address: {this.state.recieveKey.toString()}</div>}

                  </td>
                </tr>
              </tbody>
              </Table>
                </CardBody>
                <CardFooter className="d-flex justify-content-center">
                <Button onClick={() => this.makeTransaction()} > [Test] Send One Token</Button>
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
                      <Col md="3">{fighter.data? fighter.data.weight_class:""}</Col>
                      <Col>{fighter.weight}</Col>
                      <Col>{fighter.data? fighter.data.record:""}</Col>
                      <Col xs="1">
                        <Button onClick={() => this.sellAFighter(`${fighter.weight}`)}
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
                  <AccordionPanel>
                    <CardBody style={{backgroundColor:"#525f7f"}}>
                      <Row>
                        <div style={{textAlign:"left",width:"100%",padding:"5px"}}>
                          <h1 style={{padding:"10px",float:"left",marginBottom:"0px",marginLeft:"80px"}}>{(fighter.data&&fighter.data.fullname)?fighter.data.fullname:fighter.name}</h1>
                          <h3 style={{paddingTop:"15px",paddingLeft:"100px",float:"left"}}>{fighter.data?fighter.data.weight_class:""}</h3>
                        </div>
                      </Row>
                      <Row>
                        <Col>
                        <div>
                          <h4 style={{textAlign:"center"}}>Value History</h4>
                          <div className="chart-area" style={{padding:"10px",paddingTop:"2px"}}>
                            <Line
                              data={chartExample1[this.state.bigChartData]}
                              options={chartExample1.options}
                            />
                          </div>
                          <div style={{textAlign:"center"}}>
                            <h4 style={{marginBottom:"0px",paddingBottom:"1px"}}>Recent Matches</h4>
                            <hr style={{width:"75%"}}color="white"/>
                            {(Array.isArray(fighter.data.fights) && fighter.data.fights[0])?(<>
                              <div style={{padding:"10px"}}>
                                <h4 style={{padding:"1px",margin:"0px"}}>{fighter.name + " VS. "+fighter.data.fights[0].opponent +"  -  "+fighter.data.fights[0].date}</h4>
                            <p style={{padding:"1px",margin:"0px"}}>{"The result was a "+fighter.data.fights[0].result+" by "+fighter.data.fights[0].method+" at round "+fighter.data.fights[0].round}</p>
                              </div>
                              <div style={{padding:"10px"}}>
                              <h4 style={{padding:"1px",margin:"0px"}}>{fighter.name + " VS. "+fighter.data.fights[1].opponent+"  -  "+fighter.data.fights[1].date}</h4>
                            <p style={{padding:"1px",margin:"0px"}}>{"The result was a "+fighter.data.fights[1].result+" by "+fighter.data.fights[1].method+" at round "+fighter.data.fights[1].round}</p>
                              </div>
                              <div style={{padding:"10px"}}>
                              <h4 style={{padding:"1px",margin:"0px"}}>{fighter.name + " VS. "+fighter.data.fights[2].opponent+"  -  "+fighter.data.fights[2].date}</h4>
                            <p style={{padding:"1px",margin:"0px"}}>{"The result was a "+fighter.data.fights[2].result+" by "+fighter.data.fights[2].method+" at round "+fighter.data.fights[2].round}</p>
                              </div>
                            </>):(<>No match history found</>)}
                          </div>
                        </div>
                        </Col>
                        <Col>
                          <div>
                            <h4 style={{textAlign:"center"}}>Fighter Stats</h4>
                            {fighter.data?(<>
                            <div style={{width:"50%",float:"left"}}>
                              <ul>
                                <li>Record: {fighter.data.record?fighter.data.record:"Unknown"}</li>
                                <li>Height: {fighter.data.height}</li>
                                <li>Weight: {fighter.data.weight}</li>
                                {fighter.data.wins?(<>
                                <li>Wins by: 
                                  <ul>
                                    <li>KO: {(fighter.data.wins.knockouts / fighter.data.wins.total * 100).toFixed(1)}% </li>
                                    <li>TKO: {(fighter.data.wins.submissions / fighter.data.wins.total * 100).toFixed(1)}% </li>
                                    <li>Decision: {(fighter.data.wins.decisions / fighter.data.wins.total * 100).toFixed(1)}% </li>
                                    <li>Other: {(fighter.data.wins.others / fighter.data.wins.total * 100).toFixed(1)}%</li>
                                  </ul>
                                </li>
                                <li>Losses by: 
                                  <ul>
                                    <li>KO: {(fighter.data.losses.knockouts / fighter.data.losses.total * 100).toFixed(1)}% </li>
                                    <li>TKO: {(fighter.data.losses.submissions / fighter.data.losses.total * 100).toFixed(1)}% </li>
                                    <li>Decision: {(fighter.data.losses.decisions / fighter.data.losses.total * 100).toFixed(1)}% </li>
                                    <li>Other: {(fighter.data.losses.others / fighter.data.losses.total * 100).toFixed(1)}%</li>
                                  </ul>
                                </li>
                                </>):(<></>)}
                              </ul>
                            </div>
                            <div style={{width:"50%",float:"left"}}>
                              <ul>{(fighter.data.strikes && fighter.data.strikes.attempted)?(
                                <li>Strikes
                                  <ul>
                                    <li>Success Rate: {(fighter.data.strikes.successful / fighter.data.strikes.attempted * 100).toFixed(1)}%</li>
                                    <li>Standing: {fighter.data.strikes.standing}</li>
                                    <li>Clinch: {fighter.data.strikes.clinch}</li>
                                    <li>Ground: {fighter.data.strikes.ground}</li>
                                  </ul>
                                </li>
                              ):(<></>)}
                              {(fighter.data.takedowns && fighter.data.takedowns.attempted)?(
                                <li>Takedowns
                                <ul>
                                  <li>Success Rate: {(fighter.data.takedowns.successful / fighter.data.takedowns.attempted * 100).toFixed(1)}%</li>
                                  <li>Sunmissions: {fighter.data.takedowns.submissions}</li>
                                  <li>Passes: {fighter.data.takedowns.passes}</li>
                                  <li>Sweeps: {fighter.data.takedowns.sweeps}</li>
                                </ul>
                              </li>
                              ):(<></>)}
                              </ul>
                            </div>
                            </>):(<>
                              No data found :(
                            </>)}
                          </div>
                        </Col>
                      </Row>
                      </CardBody>
                    </AccordionPanel>
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
            <Card>
              <CardHeader>
              <CardTitle tag="h3">[Pool] Available Fighters</CardTitle>
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
              <AccordionWithHeader multipleOkay={true}>
              {fighters.map((fighter,i)=>{
                  return(
                  <AccordionNode key={i}>
                  <AccordionHeader 
                   titleColor="white"
                   horizontalAlignment="centerSpaceBetween">
                     <Col md="4">{fighter.name}</Col>
                    <Col md="3">{fighter.data?fighter.data.weight_class:""}</Col>
                      <Col>{fighter.weight}</Col>
                      <Col>{fighter.data?fighter.data.record:""}</Col>
                      <Col xs="1">
                        <Button onClick={() => this.buyFromPool(`${fighter.weight}`)}
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
                    <AccordionPanel>
                      <CardBody style={{backgroundColor:"#525f7f"}}>
                        {fighter.data?(<>
                          <Row>
                          <hr color="white"/>
                          <hr color="white"/>
                          <div style={{textAlign:"left",width:"100%",padding:"5px"}}>
                            <h1 style={{padding:"10px",float:"left",marginBottom:"0px",marginLeft:"80px"}}>{fighter.data.fullname?fighter.data.fullname:fighter.name}</h1>
                            <h3 style={{paddingTop:"15px",paddingLeft:"100px",float:"left"}}>{fighter.data.weight_class}</h3>
                          </div>
                        </Row>
                        <Row>
                          <Col>
                          <div>
                            <h4 style={{textAlign:"center"}}>Value History</h4>
                            <div className="chart-area" style={{padding:"10px",paddingTop:"2px"}}>
                              <Line
                                data={chartExample1[this.state.bigChartData]}
                                options={chartExample1.options}
                              />
                            </div>
                            <div style={{textAlign:"center"}}>
                              <h4 style={{marginBottom:"0px",paddingBottom:"1px"}}>Recent Matches</h4>
                              <hr style={{width:"75%"}}color="white"/>
                              {(Array.isArray(fighter.data.fights) && fighter.data.fights[0])?(<>
                                <div style={{padding:"10px"}}>
                                  <h4 style={{padding:"1px",margin:"0px"}}>{fighter.name + " VS. "+fighter.data.fights[0].opponent +"  -  "+fighter.data.fights[0].date}</h4>
                              <p style={{padding:"1px",margin:"0px"}}>{"The result was a "+fighter.data.fights[0].result+" by "+fighter.data.fights[0].method+" at round "+fighter.data.fights[0].round}</p>
                                </div>
                                <div style={{padding:"10px"}}>
                                <h4 style={{padding:"1px",margin:"0px"}}>{fighter.name + " VS. "+fighter.data.fights[1].opponent+"  -  "+fighter.data.fights[1].date}</h4>
                              <p style={{padding:"1px",margin:"0px"}}>{"The result was a "+fighter.data.fights[1].result+" by "+fighter.data.fights[1].method+" at round "+fighter.data.fights[1].round}</p>
                                </div>
                                <div style={{padding:"10px"}}>
                                <h4 style={{padding:"1px",margin:"0px"}}>{fighter.name + " VS. "+fighter.data.fights[2].opponent+"  -  "+fighter.data.fights[2].date}</h4>
                              <p style={{padding:"1px",margin:"0px"}}>{"The result was a "+fighter.data.fights[2].result+" by "+fighter.data.fights[2].method+" at round "+fighter.data.fights[2].round}</p>
                                </div>
                              </>):(<>No match history found</>)}
                            </div>
                          </div>
                          </Col>
                          <Col>
                            <div>
                              <h4 style={{textAlign:"center"}}>Fighter Stats</h4>
                              {fighter.data?(<>
                              <div style={{width:"50%",float:"left"}}>
                                <ul>
                                  <li>Record: {fighter.data.record?fighter.data.record:"Unknown"}</li>
                                  <li>Height: {fighter.data.height}</li>
                                  <li>Weight: {fighter.data.weight}</li>
                                  {fighter.data.wins?(<>
                                  <li>Wins by: 
                                    <ul>
                                      <li>KO: {(fighter.data.wins.knockouts / fighter.data.wins.total * 100).toFixed(1)}% </li>
                                      <li>TKO: {(fighter.data.wins.submissions / fighter.data.wins.total * 100).toFixed(1)}% </li>
                                      <li>Decision: {(fighter.data.wins.decisions / fighter.data.wins.total * 100).toFixed(1)}% </li>
                                      <li>Other: {(fighter.data.wins.others / fighter.data.wins.total * 100).toFixed(1)}%</li>
                                    </ul>
                                  </li>
                                  <li>Losses by: 
                                    <ul>
                                      <li>KO: {(fighter.data.losses.knockouts / fighter.data.losses.total * 100).toFixed(1)}% </li>
                                      <li>TKO: {(fighter.data.losses.submissions / fighter.data.losses.total * 100).toFixed(1)}% </li>
                                      <li>Decision: {(fighter.data.losses.decisions / fighter.data.losses.total * 100).toFixed(1)}% </li>
                                      <li>Other: {(fighter.data.losses.others / fighter.data.losses.total * 100).toFixed(1)}%</li>
                                    </ul>
                                  </li>
                                  </>):(<></>)}
                                </ul>
                              </div>
                              <div style={{width:"50%",float:"left"}}>
                                <ul>{(fighter.data.strikes && fighter.data.strikes.attempted)?(
                                  <li>Strikes
                                    <ul>
                                      <li>Success Rate: {(fighter.data.strikes.successful / fighter.data.strikes.attempted * 100).toFixed(1)}%</li>
                                      <li>Standing: {fighter.data.strikes.standing}</li>
                                      <li>Clinch: {fighter.data.strikes.clinch}</li>
                                      <li>Ground: {fighter.data.strikes.ground}</li>
                                    </ul>
                                  </li>
                                ):(<></>)}
                                {(fighter.data.takedowns && fighter.data.takedowns.attempted)?(
                                  <li>Takedowns
                                  <ul>
                                    <li>Success Rate: {(fighter.data.takedowns.successful / fighter.data.takedowns.attempted * 100).toFixed(1)}%</li>
                                    <li>Sunmissions: {fighter.data.takedowns.submissions}</li>
                                    <li>Passes: {fighter.data.takedowns.passes}</li>
                                    <li>Sweeps: {fighter.data.takedowns.sweeps}</li>
                                  </ul>
                                </li>
                                ):(<></>)}
                                </ul>
                              </div>
                              </>):(<>
                                No data found :(
                              </>)}
                            </div>
                          </Col>
                        </Row>
                        </>
                        ):(<>No data found</>)}
                      </CardBody>
                    </AccordionPanel>
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


export default Dashboard
