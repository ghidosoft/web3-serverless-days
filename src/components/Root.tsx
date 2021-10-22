import React from 'react';
import {Toaster} from 'react-hot-toast';
import WalletContext from '../contexts/WalletContext';
import {WalletDataContextProvider} from '../contexts/WalletDataContext';
import {createWallet} from '../wallet';
import WalletToasts from './toasts/WalletToasts';
import App from './App';

const Root: React.FC = () => {
    const wallet = React.useMemo(() => createWallet(), []);
    return (
        <WalletContext.Provider value={wallet}>
            <WalletDataContextProvider>
                <Toaster containerClassName="toaster" position="top-center" />
                <WalletToasts />
                <App />
            </WalletDataContextProvider>
        </WalletContext.Provider>
    );
};

export default Root;
