
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
import React from "react";

import "../../assets/css/H2H.css";

export class H2H extends React.Component {

    render(){
    return (
        <Card style={{overflow:'hidden'}}>
            <CardHeader>
                <Row>
                <Col classname="col">
                    <h2>User1</h2>
                    <span>Points: 7</span>
                </Col>
                <Col classname="col">
                    <h3>Total Bet: $$$</h3>
                </Col>
                <Col classname="col">
                    <h2>User2</h2>
                    <span>Points: 6</span>
                </Col>
                </Row>
                <hr style={{borderTop:'2px solid gray'}}></hr>
            </CardHeader>
            <CardBody>
                <table>
                    <tr>
                        <th>Player 1 Picks</th>
                        <th></th>
                        <th>Outcome</th>
                        <th></th>
                        <th>Player 2 Picks</th>
                    </tr>
                    <tr>
                        <td>Stephen Thompson</td>
                        <td></td>
                        <td>Neal</td>
                        <td style={{color:'red'}}>+3</td>
                        <td>Geoff Neal</td>
                    </tr>
                    <tr>
                        <td>Jose Aldo</td>
                        <td style={{color:'green'}}>+3</td>
                        <td>Jose Aldo</td>
                        <td style={{color:'red'}}>+3</td>
                        <td>Jose Aldo</td>
                    </tr>
                    <tr>
                        <td>Marlon Moraes</td>
                        <td style={{color:'green'}}>+2</td>
                        <td>Marlon Moraes</td>
                        <td></td>
                        <td>Rob Font</td>
                    </tr>
                    <tr>
                        <td>Anthony Petis</td>
                        <td style={{color:'green'}}>+2</td>
                        <td>Anthony Petis</td>
                        <td></td>
                        <td>Alex Morono</td>
                    </tr>
                </table>
            </CardBody>
            <CardFooter style={{backgroundColor:'green',height:'5rem',position:'relative'}}>
                <h1 style={{textAlign:'center',margin:'0'}}>Player 1 Wins!!</h1>
                <Button 
                    color="success"
                    id="4"
                    size="md"
                    tag="label"
                    style={{position:'absolute',right:'1rem',bottom:'1rem'}}>
                        <span>Collect winnings</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
}