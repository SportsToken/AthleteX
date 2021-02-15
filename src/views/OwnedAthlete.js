import { React } from 'react';
import { Row, Col, Card, CardBody, CardHeader, AccordionWithHeader, AccordionNode, Button } from 'reactstrap';
import { AthleteToken } from './sdk/athletes';
import { MMAAthlete } from './sdk/MMAAthlete';

const KN = new MMAAthlete("Khabib Nurmagomedov");
const JG = new MMAAthlete("Justin Gathje");
const DP = new MMAAthlete("Dustin Poirier");
const TF = new MMAAthlete("Tony Ferguson");
const CM = new MMAAthlete("Conor McGregor");

const array = [
  KN,
  JG,
  DP,
  TF,
  CM
];

export default function OwnedAthletes() {
    return (
        <Row>
        <Col>
        <Card>
          <CardHeader>
              <CardTitle tag="h3">My Athletes</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
            <Col md="4">Name</Col>
            <Col >Sport</Col>
            <Col>Price (AE tokens)</Col>
            <Col xs="2">Mint Address</Col>
            <Col xs="1"></Col>
            </Row>
          </CardBody>
          <AccordionWithHeader multipleOkay={true}>
          </AccordionWithHeader>
        </Card>         
        </Col>
      </Row>
    )
}

            // {fighters.filter(fighter =>{if(fighter.isOwned){
            //   return true;
            // }else{
            //   return false;
            // }}).map(fighter =>{
            //   return(
            //   <AccordionNode key={fighter.id}>
            //   <AccordionHeader 
            //    titleColor="white"
            //    horizontalAlignment="centerSpaceBetween">
            //      <Col md="4">{fighter.name}</Col>
            //       <Col md="3">{fighter.division}</Col>
            //       <Col>{fighter.weight}</Col>
            //       <Col>{fighter.record}</Col>
            //       <Col xs="1">
            //         <Button onClick={() => "Sold!"}
            //           color="danger"
            //           id="4"
            //           size="sm"
            //           tag="label"
            //          >
            //           <input
            //              className="d-none"
            //             name="options"
            //             type="radio"
            //             onClick={() => alert(`Sold ${MMA_athletes} for ${MMA_athletes.getTokenPrice()}`)}
            //           />
            //          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block" onClick={{MMA_athletes[0].switchOwnership()}}>
            //             Sell?
            //          </span>
            //         </Button>
            //       </Col>
            //   </AccordionHeader>
            //   <AccordionPanel>
            //     <CardBody>
            //       Athlete Token Address: 
            //     </CardBody>
            //     </AccordionPanel>
            //   </AccordionNode>
            //   );
            // })}