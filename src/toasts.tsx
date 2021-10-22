import React from 'react';
import {ethers} from 'ethers';
import toast, {ToastOptions} from 'react-hot-toast';
import TxSentToast from './components/toasts/TxSentToast';
import TxConfirmedToast from './components/toasts/TxConfirmedToast';
import ErrorToast from './components/toasts/ErrorToast';

const DEFAULT_TOAST_OPTIONS: ToastOptions = {
    className: 'toast',
    duration: 5000,
};

const TX_CONFIRMED_OPTIONS: ToastOptions = {...DEFAULT_TOAST_OPTIONS};
const TX_SENT_OPTIONS: ToastOptions = {...DEFAULT_TOAST_OPTIONS};

export const toastTxSent = (tx: ethers.providers.TransactionResponse): void => {
    toast.loading(() => <TxSentToast hash={tx.hash} />, TX_SENT_OPTIONS);
};
export const toastTxSuccess = (tx: ethers.providers.TransactionResponse): void => {
    toast.success(() => <TxConfirmedToast hash={tx.hash} />, TX_CONFIRMED_OPTIONS);
};
export const toastError = (reason: string): void => {
    toast.error(() => <ErrorToast reason={reason} />, DEFAULT_TOAST_OPTIONS);
};
