import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useConnection, useSolanaExplorerUrlSuffix } from './connection';
import { Button } from 'reactstrap';

import { confirmTransaction } from './utils';

export function useSendTransaction() {
  const connection = useConnection();

  const [sending, setSending] = useState(false);

  async function sendTransaction(
    signaturePromise,
    { onSuccess, onError } = {},
  ) {
    setSending(true);
    try {
      let signature = await signaturePromise;
      await confirmTransaction(connection, signature);
      setSending(false);
      if (onSuccess) {
        onSuccess(signature);
      }
    } catch (e) {
      setSending(false);
      console.warn(e.message);
      if (onError) {
        onError(e);
      }
    }
  }

  return [sendTransaction, sending];
}

function ViewTransactionOnExplorerButton({ signature }) {
  const urlSuffix = useSolanaExplorerUrlSuffix();
  return (
    <Button
      color="inherit"
      component="a"
      target="_blank"
      rel="noopener"
      href={`https://explorer.solana.com/tx/${signature}` + urlSuffix}
    >
      View on Solana Explorer
    </Button>
  );
}

export function useCallAsync() {
  return async function callAsync(
    promise,
    {
      progressMessage = 'Submitting...',
      successMessage = 'Success',
      onSuccess,
      onError,
    } = {},
  ) {
    try {
      let result = await promise;
      if (successMessage) {
        console.log(`${successMessage}`);
      }
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (e) {
      console.warn(e);
      if (onError) {
        onError(e);
      }
    }
  };
}
