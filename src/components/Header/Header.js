import React from "react";

import {
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardFooter,
    Row,
    Col,
    
} from "reactstrap";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className="header-title header">
                <Card>
                    <CardTitle>
                        Athlete Equity
                    </CardTitle>
                    
                </Card>
            <Col lg="6">
            </Col>
            <Col lg="6">
                Record
            </Col>
          </Row>
        );
    }
}