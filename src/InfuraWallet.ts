import {ethers} from 'ethers';
import {Wallet, WalletState} from './types';
import BaseWallet from './BaseWallet';
import config from './config';

class InfuraWallet<T extends ethers.providers.Provider = ethers.providers.Provider> extends BaseWallet implements Wallet {
    protected readonly _provider: T;
    protected _contract: ethers.Contract;

    constructor(provider: T, autoConnect = false) {
        super();
        this._provider = provider;
        provider.on('block', () => this.emitBlock());
        provider.on('error', (err) => this.emit('error', err));
        throw new Error('TODO create contract');
        if (autoConnect) {
            setTimeout(() => this.setState(WalletState.Disconnected), 0);
        }
    }

    public get account(): string | undefined {
        return;
    }

    connect(): Promise<string | undefined> {
        throw new Error('Wallet required.');
    }
    disconnect(): Promise<void> {
        throw new Error('Wallet required.');
    }
    mint(count: number): Promise<string> {
        throw new Error('Wallet required.');
    }

    async getPrice(): Promise<ethers.BigNumber> {
        throw new Error('TODO call contract');
    }

    async getMaxBatch(): Promise<number> {
        throw new Error('TODO call contract and convert to number');
    }

    async getMaxSupply(): Promise<number> {
        throw new Error('TODO');
    }
    async getTotalSupply(): Promise<number> {
        throw new Error('TODO');
    }

    async baseUri(): Promise<string> {
        throw new Error('TODO');
    }

    async balanceOf(address: string): Promise<number> {
        throw new Error('TODO');
    }

    async tokenOfOwnerByIndex(address: string, index: number): Promise<number> {
        throw new Error('TODO call contract with parameters');
    }
}

export default InfuraWallet;
