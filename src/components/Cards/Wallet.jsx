import React from 'react'
import { Card, CardHeader, CardBody, CardTitle, Table, CardFooter, Row, Col } from 'reactstrap';

export default function Wallet() {
    return (
        <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h3">
               Welcome, User
          </CardTitle>
        </CardHeader>
        <CardBody>
    <Table>
      <tbody>
        <tr>
        <td>
          <p className="title">Wallet Network</p>
          <p className="text-muted">
          {/* {this.state.network} */}
          </p>
        </td>
        </tr>
        <tr>
        <p className="title">Wallet provider:{``}</p>
          <p className="text-muted">
            <input
          type="text"

        />
        </p>
        </tr>
      </tbody>
    </Table>
        </CardBody>
      <CardFooter className="d-flex justify-content-center">

      </CardFooter>
      </Card>
    );
}