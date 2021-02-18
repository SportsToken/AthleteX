import React from 'react';
import { Col, Button, CardBody } from 'reactstrap';
import {
    AccordionWithHeader,
    AccordionNode,
    AccordionHeader,
    AccordionPanel
  } from 'react-accordion-with-header';

export  function Owned(props) {
    return(
        <AccordionNode key={props.athlete.id}>
        <AccordionHeader 
         titleColor="white"
         horizontalAlignment="centerSpaceBetween">
           <Col md="4">{props.athlete.name}</Col>
            <Col md="3">{props.athlete.division}</Col>
            <Col>{props.athlete.weight}</Col>
            <Col>{props.athlete.record}</Col>
            <Col xs="1">
              <Button onClick={props.purchase}
                color="danger"
                id="4"
                size="sm"
                tag="label"
               >
                <input
                   className="d-none"
                  name="options"
                  type="radio"
                  onClick={() => alert(`Sold ${props.athlete.name}`)}
                />
               <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                  Sell?
               </span>
              </Button>
            </Col>
        </AccordionHeader>
        <AccordionPanel>
          <CardBody>
            Athlete Token Address: 
          </CardBody>
          </AccordionPanel>
        </AccordionNode>
    );
}