import React from 'react';
import { Card, CardHeader, CardTitle, Row, Col } from 'reactstrap';


function initAthletes()
{
  
}


function Athletes () {
    return(
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
            <AccordionPanel><CardBody>Testing123</CardBody></AccordionPanel>
            </AccordionNode>
            );
          })}

          </AccordionWithHeader>
      </Card>
    );
}