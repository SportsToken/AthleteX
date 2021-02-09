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
            Create a team of the best athletes, earn passive income, and get rich too...
            </p>
          </div>
          <div className="typography-line">
            <p className="text-info">
            Create a team of the best athletes, earn passive income, and get rich too...
            </p>
          </div>
          <div className="typography-line">
            <p className="text-success">
            Create a team of the best athletes, earn passive income, and get rich too...
            </p>
          </div>
          <div className="typography-line">
            <p className="text-warning">
            Create a team of the best athletes, earn passive income, and get rich too...
            </p>
          </div>
          <div className="typography-line">
            <p className="text-danger">
            Create a team of the best athletes, earn passive income, and get rich too...
            </p>
          </div>
          <div className="text-center">
          <div>
            <a href="https://dex.athlete-equity.com">
            <Button>
            Take me to the Marketplace
            </Button>
            </a>
          </div>
          <div>
              <a href="http://swap.athlete-equity.com">
              <Button>
                Take me to the Swap
            </Button>
              </a>
          </div>
          </div>
        </CardBody>
        <CardFooter className="text-center">
          <h4>© Copyright Athlete Equity 2021.  All Rights Reserved</h4>
        <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <a href="https://discord.gg/6rCNc7x9DH">
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-discord" />
                    </Button>
                    </a>
                    <a href="https://twitter.com/AthleteEquity">
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    </a>
                  </div>
        </CardFooter>
      </Card>
    );
}