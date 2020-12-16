
function LiquidityPool () {
    return (
        <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h3">
          Liquidity Pool
          </CardTitle>
        </CardHeader>
        <CardBody>
            <Table>
                <tbody>
                    <tr>
                    <td>
                    <p className="title">Liquidity Pool</p>
                    <p className="text-muted">
                        <a href="https://explorer.solana.com/address/E1TGkB6aQmAe8uP3J8VMTyon1beUSY8ENkB3xym7hSYH/tokens?cluster=devnet" target="_blank" >View Balance</a>
                    </p>
                    </td>
                    </tr>
                    <tr>
                    <td>
                    <p className="title">Send to a Player [Wallet Address]:{``}</p>
                    <p className="text-muted">
                        <input
                    type="text"
                    onChange={(e) => (e.target.value.trim() < 33) ? this.setState({recieveKey: this.state.poolKey}): this.setState({recieveKey: new PublicKey(e.target.value.trim())})}
                    />
                    </p>
                    </td>
                    </tr>
                    <tr>
                    <td>
                    { this.state.poolKey.toString() === this.state.recieveKey.toString() ? <div>Pool Address: {this.state.poolKey.toString()}</div>: <div>Player Address: {this.state.recieveKey.toString()}</div>}

                    </td>
                    </tr>
                </tbody>
            </Table>
        </CardBody>
        <CardFooter className="d-flex justify-content-center">
        <Button onClick={() => this.makeTransaction()} > [Test] Send One Token</Button>
        </CardFooter>
        </Card>
    );
}