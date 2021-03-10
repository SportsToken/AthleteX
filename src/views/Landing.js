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

import {
  AccordionWithHeader,
  AccordionNode,
  AccordionHeader,
  AccordionPanel
} from 'react-accordion-with-header';


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table
} from "reactstrap";

// core components
import Welcome from "components/Header/Welcome";
import fighters from "../sdk/fighters"
import { makeTransaction } from "sdk/globals";

import { Owned } from '../components/Athletes/Owned';


class Landing extends React.Component {
  constructor(props) {

    super(props);

  }

async copyToClipboard(copyItem)
{
  copyItem.select();
  document.execCommand("copy");
}
  
purchaseFunction = (fighter) => {
  makeTransaction();
  fighter.switchOwnership();
  alert(`${fighter.tokenPrice}`);
  fighter.buyToken();
}
  
  render() {
    return (
      <>
        <div className="content">
          {/* <Header /> */}
          <Welcome />
          <Row>
            <Col>
            <Card>
                <CardHeader>
                  <CardTitle tag="h3">
                    My Athletes
                  </CardTitle>
                </CardHeader>
                <CardBody>
                <AccordionWithHeader multipleOkay={true} >
                {fighters.filter(fighter =>{if(fighter.isOwned){
                  return true;
                }else{
                  return false;
                }}).map(fighter =>{
                  return(
                      <Owned athlete={fighter} />
                  );
                })}
              </AccordionWithHeader>
              </CardBody>
            </Card>         
            </Col>
          </Row>


          <Row>
          <Col>
            <Card>
                <CardHeader>
                  <CardTitle tag="h3">
                    Available Athletes
                  </CardTitle>
                </CardHeader>
                <CardBody>
                <AccordionWithHeader multipleOkay={true} >
                {fighters.filter(fighter =>{if(fighter.isOwned){
                  return true;
                }else{
                  return false;
                }}).map(fighter =>{
                  return(
                      <Owned athlete={fighter} />
                  );
                })}
              </AccordionWithHeader>
              </CardBody>
            </Card>         
            </Col>
          </Row>
        </div>
      </>
    );
  }
}


export default Landing
