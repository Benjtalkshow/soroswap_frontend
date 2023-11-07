import { Button } from '@mui/material';
import { contractTransaction, useSendTransaction } from '@soroban-react/contracts';
import { SorobanContextType } from '@soroban-react/core';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import * as SorobanClient from 'soroban-client';
import { bigNumberToI128 } from '../../helpers/utils';

interface SwapButtonProps {
  pairAddress: string;
  isBuy: boolean;
  amountOut: BigNumber;
  maxTokenA: BigNumber;
  sorobanContext: SorobanContextType;
}

export function SwapButton({
  pairAddress,
  isBuy,
  amountOut,
  maxTokenA,
  sorobanContext,
}: SwapButtonProps) {
  const [isSubmitting, setSubmitting] = useState(false);
  const networkPassphrase = sorobanContext.activeChain?.networkPassphrase ?? '';
  const server = sorobanContext.server;
  const account = sorobanContext.address;
  let xdr = SorobanClient.xdr;
  const { sendTransaction } = useSendTransaction();

  const swapTokens = async () => {
    setSubmitting(true);

    //Parse amount to mint to BigNumber and then to i128 scVal
    const amountOutScVal = bigNumberToI128(amountOut);
    const amountInScVal = bigNumberToI128(maxTokenA);

    let walletSource;

    if (!account) {
      return;
    }

    try {
      walletSource = await server?.getAccount(account!);
    } catch (error) {
      alert('Your wallet or the token admin wallet might not be funded');
      setSubmitting(false);
      return;
    }
    if (!walletSource) {
      return;
    }
    const options = {
      sorobanContext,
    };

    try {
      //Builds the transaction
      let tx = contractTransaction({
        source: walletSource!,
        networkPassphrase,
        contractAddress: pairAddress,
        method: 'swap',
        args: [
          new SorobanClient.Address(account!).toScVal(),
          xdr.ScVal.scvBool(isBuy),
          amountOutScVal,
          amountInScVal,
        ],
      });

      //Sends the transactions to the blockchain

      let result = await sendTransaction(tx, options);

      if (result) {
        alert('Success!');
      }

      //This will connect again the wallet to fetch its data
      sorobanContext.connect();
    } catch (error) {}

    setSubmitting(false);
  };

  return (
    <Button variant="contained" onClick={swapTokens} disabled={isSubmitting}>
      Swap!
    </Button>
  );
}
