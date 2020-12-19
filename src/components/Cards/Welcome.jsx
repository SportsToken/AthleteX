import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Col, Row, Button } from 'reactstrap';


export default function Welcome() {
    return (
        <Card>
        <CardHeader className="mb-5">
          <h5 className="card-category"></h5>
          <CardTitle tag="h3">
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="">
              <blockquote>
            <h1 className="blockquote blockquote-white text-center text-success">
                Athlete.Equity <small> - Invest in the player performance of Athletes</small>
            </h1>
              </blockquote>
          </div>
          <div className="typography-line">
            <p className="text-primary">
            Create a team of the best athletes, play head to head, and get rich too...
            </p>
          </div>
          <div className="typography-line">
            <p className="text-info">
            Create a team of the best athletes, play head to head, and get rich too...
            </p>
          </div>
          <div className="typography-line">
            <p className="text-success">
            Create a team of the best athletes, play head to head, and get rich too...
            </p>
          </div>
          <div className="typography-line">
            <p className="text-warning">
            Create a team of the best athletes, play head to head, and get rich too...
            </p>
          </div>
          <div className="typography-line">
            <p className="text-danger">
            Create a team of the best athletes, play head to head, and get rich too...
            </p>
          </div>
          <div className="text-center">
            <Button onclick={{}}>
              I'm Feeling Lucky
            </Button>
          </div>
          {/* <div className="typography-line">
            <h2>
              Header with small subtitle <br />
              <small>Use "small" tag for the headers</small>
            </h2>
          </div>
          <div className="typography-line">
            <Row>
              <Col md="3">
                <h5>Unordered List</h5>
                <ul>
                  <li>List Item</li>
                  <li>List Item</li>
                  <li className="list-unstyled">
                    <ul>
                      <li>List Item</li>
                      <li>List Item</li>
                      <li>List Item</li>
                    </ul>
                  </li>
                  <li>List Item</li>
                </ul>
              </Col>
              <Col md="3">
                <h5>Ordered List</h5>
                <ol>
                  <li>List Item</li>
                  <li>List Item</li>
                  <li>List item</li>
                  <li>List Item</li>
                </ol>
              </Col>
              <Col md="3">
                <h5>Unstyled List</h5>
                <ul className="list-unstyled">
                  <li>List Item</li>
                  <li>List Item</li>
                  <li>List item</li>
                  <li>List Item</li>
                </ul>
              </Col>
              <Col md="3">
                <h5>Inline List</h5>
                <ul className="list-inline">
                  <li className="list-inline-item">List1</li>
                  <li className="list-inline-item">List2</li>
                  <li className="list-inline-item">List3</li>
                </ul>
              </Col>
            </Row>
          </div>
          <div className="typography-line">
            <p>
              This is <code>.css-class-as-code</code>
              , an example of an inline code element. Wrap inline code
              within a <code>{`<code>...</code>`}</code>
              tag.
            </p>
            <pre>
              1. #This is an example of preformatted text.<br />
              2. #Here is another line of code
            </pre>
          </div> */}
        </CardBody>
        <CardFooter className="text-center">
          <h4>© Copyright Athlete Equity 2021.  All Rights Reserved</h4>
        <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
        </CardFooter>
      </Card>
    );
}