import React from 'react';
import {useWallet} from '../contexts/WalletContext';
import {toastError} from '../toasts';
import MintForm from './MintForm';

const Mint: React.FC = () => {
    const wallet = useWallet();
    const handleMint = React.useCallback((count: number) => {
        console.log(`mint(${count})`);
        wallet.mint(count).catch((e) => {
            const message = (e.error && e.error.message) || e.message || e.reason;
            console.error(`Minting error: ${message || e}`, e);
            toastError(message || 'Unknown error');
        });
    }, [wallet]);
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="text-center py-4 col-4">
                    <MintForm onMint={handleMint} />
                </div>
            </div>
        </div>
    );
};

export default Mint;
