import {ethers} from 'ethers';
import config from './config';
import JsonRpcWallet from './JsonRpcWallet';
import {Wallet} from './types';
import InfuraWallet from './InfuraWallet';

declare global {
    interface Window {
        ethereum?: ethers.providers.ExternalProvider;
    }
}

export const createWallet = (): Wallet => {
    if (window.ethereum) {
        console.log('Creating Web3Provider');
        return new JsonRpcWallet(new ethers.providers.Web3Provider(window.ethereum, 'any'));
    } else {
        console.log(`Creating InfuraWallet network=${config.defaultProviderNetwork}`);
        return new InfuraWallet(ethers.getDefaultProvider(config.defaultProviderNetwork), true);
    }
};
