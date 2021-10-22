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
        this._contract = new ethers.Contract(config.contract, config.contractAbi, provider);
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
        return await this._contract.price();
    }

    async getMaxBatch(): Promise<number> {
        const value: ethers.BigNumber = await this._contract.maxBatch();
        return value.toNumber();
    }

    async getMaxSupply(): Promise<number> {
        const value: ethers.BigNumber = await this._contract.maxSupply();
        return value.toNumber();
    }
    async getTotalSupply(): Promise<number> {
        const value: ethers.BigNumber = await this._contract.totalSupply();
        return value.toNumber();
    }

    async baseUri(): Promise<string> {
        const value: string = await this._contract.baseUri();
        return value;
    }

    async balanceOf(address: string): Promise<number> {
        const value: ethers.BigNumber = await this._contract.balanceOf(address);
        return value.toNumber();
    }

    async tokenOfOwnerByIndex(address: string, index: number): Promise<number> {
        const value: ethers.BigNumber = await this._contract.tokenOfOwnerByIndex(
            ethers.utils.getAddress(address), ethers.BigNumber.from(index));
        return value.toNumber();
    }
}

export default InfuraWallet;
