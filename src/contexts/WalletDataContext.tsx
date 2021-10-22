import React from 'react';
import {ethers} from 'ethers';
import {WalletData, WalletState} from '../types';
import {useWallet} from './WalletContext';

const EMPTY_WALLET_DATA: WalletData = {
    baseUri: '',
    price: ethers.BigNumber.from(0),
    state: WalletState.Setup,
    maxSupply: 0,
    totalSupply: 0,
};

const WalletDataContext = React.createContext<WalletData>(EMPTY_WALLET_DATA);

export const useWalletData = (): WalletData => React.useContext<WalletData>(WalletDataContext);

export const WalletDataContextProvider: React.FC = (props) => {
    const wallet = useWallet();
    const [data, setData] = React.useState<WalletData>({
        account: wallet.account,
        state: wallet.state,
        // Updated automatically
        baseUri: EMPTY_WALLET_DATA.baseUri,
        price: EMPTY_WALLET_DATA.price,
        maxSupply: EMPTY_WALLET_DATA.maxSupply,
        totalSupply: EMPTY_WALLET_DATA.totalSupply,
    });

    const [contractLoaded, setContractLoaded] = React.useState(false);

    const updateContract = React.useCallback(async () => {
        console.log('Wallet: first (valid) block');
        const newData = {
            baseUri: await wallet.baseUri(),
            price: await wallet.getPrice(),
            maxSupply: await wallet.getMaxSupply(),
        };
        console.log('Updating contract data', newData);
        setContractLoaded(true);
        setData((data) => ({...data, ...newData}));
    }, [wallet]);

    const handleStateChange = React.useCallback((newState: WalletState, oldState: WalletState) => {
        console.log(`Wallet: changed state from '${oldState}' to '${newState}'`);

        if (newState === WalletState.Disconnected && !contractLoaded) {
            updateContract();
        }

        setData((data) => ({
            ...data,
            account: wallet.account,
            state: newState,
        }));
    }, [contractLoaded, wallet, updateContract]);

    const handleBlock = React.useCallback(async () => {
        const totalSupply = await wallet.getTotalSupply();
        setData((data) => totalSupply !== data.totalSupply ? {...data, totalSupply} : data);
    }, [wallet]);

    React.useEffect(() => {
        wallet.on('state', handleStateChange);
        wallet.on('block', handleBlock);
        return () => {
            wallet.off('state', handleStateChange);
            wallet.off('block', handleBlock);
        };
    }, [wallet, handleBlock, handleStateChange]);

    return (
        <WalletDataContext.Provider {...props} value={data} />
    );
};

export default WalletDataContext;
