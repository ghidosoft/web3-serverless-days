import {ethers} from 'ethers';
import {TypedEmitter} from 'tiny-typed-emitter';

export enum WalletState {
    Setup = 'setup',
    Disconnected = 'disconnected',
    Connecting = 'connecting',
    Connected = 'connected',
    InvalidNetwork = 'invalidnetwork',
    Unavailable = 'unavailable',
}

export interface WalletEvents {
    'block': () => void;
    'error': (error: unknown) => void;
    'state': (newState: WalletState, oldState: WalletState) => void;
    'txSent': (tx: ethers.providers.TransactionResponse) => void;
    'txReceipt': (tx: ethers.providers.TransactionResponse, receipt: ethers.providers.TransactionReceipt) => void;
}

export interface Wallet extends TypedEmitter<WalletEvents> {
    readonly state: WalletState;
    readonly account?: string;

    connect(): Promise<string | undefined>;
    disconnect(): Promise<void>;

    mint(count: number): Promise<string>;
    getPrice(): Promise<ethers.BigNumber>;
    getMaxSupply(): Promise<number>;
    getTotalSupply(): Promise<number>;
    baseUri(): Promise<string>;
    balanceOf(address: string): Promise<number>;
    tokenOfOwnerByIndex(address: string, index: number): Promise<number>;
}

export interface WalletData {
    state: WalletState;
    account?: string;
    baseUri: string;
    price: ethers.BigNumber;
    maxSupply: number;
    totalSupply: number;
}

type MetadataAttributeNumber = {
    'max_value': number;
    'trait_type': string;
    'value': number;
};
type MetadataAttributeString = {
    'trait_type': string;
    'value': string;
};
type MetadataAttribute = MetadataAttributeNumber | MetadataAttributeString;
export type Metadata = {
    attributes: MetadataAttribute[];
    description: string;
    image: string;
    name: string;
};
