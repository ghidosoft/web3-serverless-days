import {BigNumber} from '@ethersproject/bignumber';
import React from 'react';
import BaseWallet from '../BaseWallet';
import {Wallet} from '../types';

class NullWallet extends BaseWallet implements Wallet {
    getMaxSupply(): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public get account(): string | undefined {
        throw new Error('Method not implemented.');
    }
    connect(): Promise<string | undefined> {
        throw new Error('Method not implemented.');
    }
    disconnect(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    mint(count: number): Promise<string> {
        throw new Error('Method not implemented.');
    }
    getPrice(): Promise<BigNumber> {
        throw new Error('Method not implemented.');
    }
    getTotalSupply(): Promise<number> {
        throw new Error('Method not implemented.');
    }
    baseUri(): Promise<string> {
        throw new Error('Method not implemented.');
    }
    balanceOf(address: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
    tokenOfOwnerByIndex(address: string, index: number): Promise<number> {
        throw new Error('Method not implemented.');
    }
}

const WalletContext = React.createContext<Wallet>(new NullWallet());

export const useWallet = (): Wallet => React.useContext<Wallet>(WalletContext);

export default WalletContext;
