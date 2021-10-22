import React from 'react';
import {WalletState} from '../types';
import {truncateAddress} from '../utils';

type Props = {
    account?: string;
    onConnect: () => void;
    onDisconnect: () => void;
    state: WalletState;
};

const ConnectButton: React.FC<Props> = ({account, onConnect, onDisconnect, state}) => {
    switch (state) {
        case WalletState.Connected:
            return <button className="btn btn-primary" onClick={onDisconnect}>{truncateAddress(account)}</button>;
        case WalletState.InvalidNetwork:
            return <button className="btn btn-primary" disabled>Invalid Network</button>;
        default:
            return <button className="btn btn-primary" disabled={state !== WalletState.Disconnected} onClick={onConnect}>CONNECT</button>;
    }
};

export default ConnectButton;
