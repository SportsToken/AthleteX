import { Account, LAMPORTS_PER_SOL, Connection, SystemProgram, clusterApiUrl, PublicKey, Transaction } from '@solana/web3.js';
import Wallet from '@project-serum/sol-wallet-adapter';
import { swapApiRequest } from '../utils/swap/api';
import { useCallAsync } from '../utils/swap/eth';
import { MINT_LAYOUT, ACCOUNT_LAYOUT } from '../utils/tokens/data';
import { sleep} from '../utils/utils';
import { refreshWalletPublicKeys } from 'utils/wallet';
import { TOKEN_PROGRAM_ID, mintTo, initializeAccount, initializeMint } from '../utils/tokens/instructions';
import { refreshAccountInfo } from '../utils/connection';
import { signAndSendTransaction } from '../utils/tokens/index';
// 
// IMPORTANT: This file serves as the gateway between the utils/ folder & the broker
// Please DO NOT instantiate nor call methods from utils/ , always refer to globals
// 

export const providerUrl = 'https://www.sollet.io';
export const LIVE_NETWORK = 'testnet';
const network = clusterApiUrl(LIVE_NETWORK);

export const wallet = new Wallet(providerUrl, network);
 
// Federal Reserve Account ( mint authority );
// const AEReseve = new Wallet();
export const connection = new Connection(clusterApiUrl(LIVE_NETWORK));


const callAsync = useCallAsync();

export async function addToken({
    mintAddress,
    tokenName,
    tokenSymbol,
    erc20Address,
    }) {
    if (erc20Address) {
          // checks if erc20 address is valid
          let valid = erc20Address.length === 42 && erc20Address.startsWith('0x');
          let tokenInfo = await swapApiRequest('POST', `coins/eth/${erc20Address}`);
          mintAddress = tokenInfo.splMint;
          tokenName = tokenInfo.name;
          tokenSymbol = tokenInfo.ticker;
          if (tokenInfo.blockchain !== 'sol') {
          tokenName = 'Wrapped ' + tokenName;
          }
    }
    
    let mint = new PublicKey(mintAddress);
    return await wallet.createTokenAccount(mint);
    }


  export async function makeTransaction() {
    try {
      let transaction = SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: wallet.publicKey,
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

  export function mintAthleteToken($athName, $athSymbol, $amount) {
    let mint = new Account();
      createAndInitializeMint({
        connection: connection,
        owner: wallet,
        mint,
        amount: $amount,
        decimals: 2,
        initialAccount: new Account()
      }).then((success) => {refreshWalletPublicKeys(wallet) });
  }

 export async function requestAirdrop() {
    callAsync(
      connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL),
      {
        onSuccess: async () => {
          await sleep(5000);
          refreshAccountInfo(connection, wallet.publicKey);
        },
        successMessage:
          'Success! Please wait up to 30 seconds for the SOL tokens to appear in your wallet.',
      },
    );
  }

  export async function createAndInitializeMint({
      connection,
      owner, // Wallet for paying fees and allowed to mint new tokens i.e. freeze/mint authority
      mint, // Account to hold token information
      amount, // Number of tokens to issue
      decimals,
      initialAccount, // Account to hold newly issued tokens, if amount > 0
    }) {
      let transaction = new Transaction();
      transaction.add(
        SystemProgram.createAccount({
          fromPubkey: owner.publicKey,
          newAccountPubkey: mint.publicKey,
          lamports: await connection.getMinimumBalanceForRentExemption(
            MINT_LAYOUT.span,
          ),
          space: MINT_LAYOUT.span,
          programId: TOKEN_PROGRAM_ID,
        }),
      );
      transaction.add(
        initializeMint({
          mint: mint.publicKey,
          decimals,
          mintAuthority: owner.publicKey,
        }),
      );
      let signers = [mint];
      if (amount > 0) {
        transaction.add(
          SystemProgram.createAccount({
            fromPubkey: owner.publicKey,
            newAccountPubkey: initialAccount.publicKey,
            lamports: await connection.getMinimumBalanceForRentExemption(
              ACCOUNT_LAYOUT.span,
            ),
            space: ACCOUNT_LAYOUT.span,
            programId: TOKEN_PROGRAM_ID,
          }),
        );
        signers.push(initialAccount);
        transaction.add(
          initializeAccount({
            account: initialAccount.publicKey,
            mint: mint.publicKey,
            owner: owner.publicKey,
          }),
        );
        transaction.add(
          mintTo({
            mint: mint.publicKey,
            destination: initialAccount.publicKey,
            amount,
            mintAuthority: owner.publicKey,
          }),
        );
      }
    
      return await signAndSendTransaction(connection, transaction, owner, signers);
    }