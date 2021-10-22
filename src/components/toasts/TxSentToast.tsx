import React from 'react';
import {getTxExplorerUrl, truncateTxHash} from '../../utils';
import ExtAnchor from '../ExtAnchor';
import ToastContent from './ToastContent';

type Props = {
    hash: string;
};

const TxSentToast: React.FC<Props> = ({hash}) => (
    <ToastContent>
        Transaction broadcast <ExtAnchor href={getTxExplorerUrl(hash)}>{truncateTxHash(hash)}</ExtAnchor>
    </ToastContent>
);

export default TxSentToast;
