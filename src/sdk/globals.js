import { Account, LAMPORTS_PER_SOL, Connection, SystemProgram, clusterApiUrl, PublicKey } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';

let wallet = Wallet();
const connection;
      (
        connection = new Connection(clusterApiUrl('testnet'))
      )();


      (async () => {

        })();

      // class Dashboard extends React.Component {
      //   constructor(props) {
      //     let providerUrl = 'https://www.sollet.io';
      //     const network = clusterApiUrl('devnet');
      //     super(props);
      //     this.state = {
      //       bigChartData: "data1",
      //       accordions: "updated",
      //       connection: new Connection(clusterApiUrl('devnet')),
      //       wallet: new Wallet(providerUrl, network),
      //       providerUrl: 'https://www.sollet.io',
      //       network: clusterApiUrl('devnet'),
      //       poolKey: new PublicKey('E1TGkB6aQmAe8uP3J8VMTyon1beUSY8ENkB3xym7hSYH'),
      //       recieveKey: new PublicKey('E1TGkB6aQmAe8uP3J8VMTyon1beUSY8ENkB3xym7hSYH'),
      //     };
          

    export async function sendTransaction(fromKey, toKey, transferAmountString) {
        try {
          let amount = Math.round(parseFloat(transferAmountString) * 10 ** 9);
          let transaction = SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: recieveKey, //pool key
            lamports: amount,
          });
          
          transaction.recentBlockhash = (
            await connection.getRecentBlockhash()
        ).blockhash;
  
        let signed = await wallet.signTransaction(transaction);
        let signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature, 1);
  
      } catch (e) {
        console.warn(e);
      }
    }
  
    export async function sellTransaction(transferAmountString) {
      try {
        let amount = Math.round(parseFloat(transferAmountString) * 10 ** 9);
        let transaction = SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: recieveKey,
          lamports: amount,
        });
        
        transaction.recentBlockhash = (
          await connection.getRecentBlockhash()
      ).blockhash;
  
      // let signed = await wallet.signTransaction(transaction);
      // let signature = await connection.sendRawTransaction(signed.serialize());
      // await connection.confirmTransaction(signature, 1);
  
    } catch (e) {
      console.warn(e);
    }
  }
  
  export async function makeTransaction() {
    try {
      let transaction = SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recieveKey,
        lamports: Math.round(parseFloat("1") * 10 ** 9),
      });
      // addLog('Getting recent blockhash');
      transaction.recentBlockhash = (
        await connection.getRecentBlockhash()
      ).blockhash;
      // addLog('Sending signature request to wallet');
      let signed = await wallet.signTransaction(transaction);
      // addLog('Got signature, submitting transaction');
      let signature = await connection.sendRawTransaction(signed.serialize());
      // addLog('Submitted transaction ' + signature + ', awaiting confirmation');
      await connection.confirmTransaction(signature, 1);
      // addLog('Transaction ' + signature + ' confirmed');
    } catch (e) {
      console.warn(e);
      // addLog('Error: ' + e.message);
    }
  }
  
  export function mintTestToken() {
    let mint = new Account();
    updateTokenName(
      mint.publicKey,
      `Test Token ${abbreviateAddress(mint.publicKey)}`,
      `TEST${mint.publicKey.toBase58().slice(0, 2)}`,
    );
    sendTransaction(
      createAndInitializeMint({
        connection: wallet.connection,
        owner: wallet,
        mint,
        amount: 1000,
        decimals: 2,
        initialAccount: new Account(),
      }),
      { onSuccess: () => refreshWalletPublicKeys(wallet) },
    );
  }

  export function mintNewAthleteToken(athName, athSymbol) {
    let mint = new Account();
    updateTokenName(
      mint.publicKey,
      ``,
      ``
    )
  }

 export async function requestAirdrop() {
    callAsync(
      wallet.connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL),
      {
        onSuccess: async () => {
          await sleep(5000);
          refreshAccountInfo(wallet.connection, wallet.publicKey);
        },
        successMessage:
          'Success! Please wait up to 30 seconds for the SOL tokens to appear in your wallet.',
      },
    );
  }