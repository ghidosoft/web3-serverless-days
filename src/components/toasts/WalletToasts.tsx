import {ethers} from 'ethers';
import React from 'react';
import {useWallet} from '../../contexts/WalletContext';
import {toastError, toastTxSent, toastTxSuccess} from '../../toasts';

const WalletToasts: React.FC = () => {
    const wallet = useWallet();

    const handleError = React.useCallback((err: unknown) => {
        console.log('Wallet error', err);
        toastError('' + err);
    }, []);
    const handleTxSent = React.useCallback((tx: ethers.providers.TransactionResponse) => {
        console.log('Transaction sent', tx);
        toastTxSent(tx);
    }, []);
    const handleTxReceipt = React.useCallback((tx: ethers.providers.TransactionResponse, receipt: ethers.providers.TransactionReceipt) => {
        console.log(`Transaction receipt for ${tx.hash}`, receipt);
        toastTxSuccess(tx);
    }, []);

    React.useEffect(() => {
        wallet.on('txSent', handleTxSent);
        wallet.on('txReceipt', handleTxReceipt);
        wallet.on('error', handleError);

        return () => {
            wallet.off('txSent', handleTxSent);
            wallet.off('txReceipt', handleTxReceipt);
            wallet.off('error', handleError);
        };
    }, [handleError, handleTxSent, handleTxReceipt, wallet]);

    return null;
};

export default WalletToasts;
