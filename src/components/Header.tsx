import React from 'react';
import {useWallet} from '../contexts/WalletContext';
import {useWalletData} from '../contexts/WalletDataContext';
import ConnectButton from './ConnectButton';

const Header: React.FC = () => {
    const {account, state} = useWalletData();
    const wallet = useWallet();

    const handleConnect = React.useCallback(() => {
        wallet.connect();
    }, [wallet]);
    const handleDisconnect = React.useCallback(() => {
        wallet.disconnect();
    }, [wallet]);

    return (
        <header className="d-flex p-3">
            <div className="col-auto">
                Web3 - Serverless Days 2021
            </div>
            <div className="col text-end">
                <ConnectButton onConnect={handleConnect} onDisconnect={handleDisconnect} account={account} state={state} />
            </div>
        </header>
    );
};

export default Header;
