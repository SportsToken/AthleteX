<Card className="card-chart">
<CardHeader>
  <CardTitle tag="h3">
  Liquidity Pool
  </CardTitle>
</CardHeader>
<CardBody>
<tbody>
<tr>
<td>
  <p className="title">Liquidity Pool</p>
  <p className="text-muted">
    <a href="https://explorer.solana.com/tx/5djJU71EoLg6iwm6kdf1vvXPMq7qaFd6fv6qvmg6cBG93Kmc8apxULPDaLNrtkxoSUTcem7GYVhTb8bsDbQyAGvg?cluster=testnet" target="_blank" >View Transactions</a>
  </p>
</td>
</tr>
<tr>
  <td>
  <p className="title">Change Player:{``}</p>
  <p className="text-muted">
    <input
  type="text"
  onChange={(e) => (e.target.value.trim() < 33) ? this.setState({recieveKey: this.state.poolKey}): this.setState({recieveKey: new PublicKey(e.target.value.trim())})}
/>
</p>
  </td>
</tr>
<tr>

</tr>
</tbody>
</CardBody>
<CardFooter className="d-flex justify-content-center">
  {/* { this.state.poolKey.toString() === this.state.recieveKey.toString() ? <div>Pool Address: {this.state.poolKey.toString()}</div>: <div>Player Address: {this.state.recieveKey.toString()}</div>} */}
  <div>
    Pool Address: 
  </div>
  
</CardFooter>
</Card>