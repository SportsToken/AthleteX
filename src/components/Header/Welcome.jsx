import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, CardTitle, Button } from 'reactstrap';


export default function Welcome() {

    const [MOTD, setMOTD] = React.useState("we are Live on the Solana testnet!");

    (async ()=>{
          const messageArray = [
            "Welcome to Athlete Equity",
            "Market DEX coming soon!",
            "Congratulations Tom Brady!",
            "Join our Discord!",
            "Follow us on Twitter!",
            "© Copyright Athlete Equity 2021.  All Rights Reserved",
            "Follow us on Twitter!",
            "Got a question? Send us an email at sam@athlete-equity.com",
            "Will the Clemson Tigers ever make it to the Superdome ?",
            "Good Vibes, good times",
            "Trade player tokens on our Swap!"  ];
            setInterval(() => {
              let o = Math.round(Math.random() * 10);
              setMOTD(messageArray[o]);
      }, 10029);
    })()


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
            {/* <a href="https://dex.athlete-equity.com">
            <Button>
            Take me to the Marketplace
            </Button>
            </a> */}
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
          <h4 id="motd" >{MOTD}</h4>  {/* This can become a type of MOTD display */}
        <div className="button-container">
                    {/* <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button> */}
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