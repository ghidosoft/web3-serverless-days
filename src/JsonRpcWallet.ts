import {ethers} from 'ethers';
import config from './config';
import {Wallet, WalletState} from './types';
import InfuraWallet from './InfuraWallet';

class JsonRpcWallet extends InfuraWallet<ethers.providers.JsonRpcProvider> implements Wallet {
    private _account?: string;

    constructor(provider: ethers.providers.JsonRpcProvider) {
        super(provider);
        this._contract = this.createContract();
        this._provider.on('network', (network) => this.handleNetworkChanged(network));
    }

    public get account(): string | undefined {
        return this._account;
    }

    private setAccount(account: string | undefined): void {
        console.log(`JsonRpcWallet::setAccount(${account})`);
        if (account === undefined) {
            delete this._account;
        } else {
            this._account = account;
        }
        this._contract = this.createContract();
    }

    private unsetAccount(): void {
        this.setAccount(undefined);
    }

    private async handleNetworkChanged(network: ethers.providers.Network) {
        if (network.chainId !== config.network.chainId) {
            this.setState(WalletState.InvalidNetwork);
            this.unsetAccount();
            console.warn('Connected to wrong network', network);
            return;
        }
        console.info('Connected to correct network', network);
        this.setState(WalletState.Disconnected);
        this.unsetAccount();
        this.emitBlock();
    }

    private createContract(): ethers.Contract {
        throw new Error('TODO create contract with signer or provider');
        if (this.account) {
            const signer = this._provider.getSigner(this.account);
            // TODO
        } else {
            // TODO
        }
    }

    async connect(): Promise<string | undefined> {
        if (this.state === WalletState.InvalidNetwork) {
            return;
        }
        this.setState(WalletState.Connecting);
        try {
            const response: string[] = await this._provider.send('eth_requestAccounts', []);
            if (!response || !response.length) {
                throw new Error();
            }
            this.setAccount(response[0]);
            this.setState(WalletState.Connected);
        } catch (err) {
            this.setState(WalletState.Disconnected);
            console.error(err);
            this.unsetAccount();
            this.emit('error', err);
        }
        return this.account;
    }

    async disconnect(): Promise<void> {
        if (this.state === WalletState.Connected) {
            this.unsetAccount();
            this.setState(WalletState.Disconnected);
        }
    }

    async mint(count: number): Promise<string> {
        throw new Error('TODO');
        // this.emitTxEvents(tx);
        // return tx.hash;
    }
}

export default JsonRpcWallet;
