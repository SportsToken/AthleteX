import {
    Button,
    Card,
    CardHeader,
    AccordionWithHeader,
    CardBody,
    Row,
    Col,
    AccordionHeader,
    AccordionNode,
    AccordionNode
} from 'reactstrap';

class AvailableAthletes extends React.Component {
    constructor(props)
    {

    }

    render() {
        return (
            <Card>
            <CardHeader>
              <CardTitle tag="h3">Available Athletes</CardTitle>
            </CardHeader>
            <CardBody>
              <Row>
              <Col md="4">Name</Col>
              <Col >Division</Col>
              <Col>Price (AE Tokens)</Col>
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
                      <Button onClick={() => console.log("Bought!")}
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
                  <CardBody>
                  <Col md="6">
                  Solana Token Address: 
                  </Col>
                  <Col md="6">
                  ERC Token Address: 
                  </Col>
                  </CardBody>
                </AccordionPanel>
                </AccordionNode>
                );
              })}
              </AccordionWithHeader>
          </Card>
        )
    }
}