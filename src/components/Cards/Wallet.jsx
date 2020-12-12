import React from 'react'

function Wallet() {
    return (
        <Card className="card-chart">
        <CardHeader>
          <CardTitle tag="h3">
          My Wallet
          </CardTitle>
        </CardHeader>
        <CardBody>
    <Table>
      <tbody>
        <tr>
        <td>
          <p className="title">Wallet Network</p>
          <p className="text-muted">
          {this.state.network}
          </p>
        </td>
        </tr>
        <tr>
        <p className="title">Wallet provider:{``}</p>
          <p className="text-muted">
            <input
          type="text"
          value={this.state.providerUrl}
          onChange={(e) => this.setProviderUrl(e.target.value.trim())}
        />
        </p>
        </tr>
      </tbody>
    </Table>
        </CardBody>
      <CardFooter className="d-flex justify-content-center">
      {this.state.wallet.connected ? (
      <>
        <div >Wallet address: {this.state.wallet.publicKey.toBase58()}.</div>
      </>
    ) : (
      <Button onClick={() => this.state.wallet.connect()} > Connect to a Wallet</Button>
    )}
      </CardFooter>
      </Card>
    );
}