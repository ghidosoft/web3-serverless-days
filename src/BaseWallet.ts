import {ethers} from 'ethers';
import {TypedEmitter} from 'tiny-typed-emitter';
import {WalletEvents, WalletState} from './types';

abstract class BaseWallet extends TypedEmitter<WalletEvents> {
    public get state(): WalletState {
        return this._state;
    }

    public abstract get account(): string|undefined;

    private _state: WalletState;

    constructor() {
        super();
        this._state = WalletState.Setup;
    }

    protected setState(newState: WalletState): void {
        if (this._state !== newState) {
            const oldState = this._state;
            this._state = newState;
            this.emit('state', newState, oldState);
        }
    }

    protected emitBlock(): void {
        if (this.state !== WalletState.Setup && this.state !== WalletState.InvalidNetwork) {
            this.emit('block');
        }
    }

    protected emitTxEvents(tx: ethers.providers.TransactionResponse): void {
        this.emit('txSent', tx);
        tx.wait().then((receipt) => {
            this.emit('txReceipt', tx, receipt);
        });
    }
}

export default BaseWallet;
