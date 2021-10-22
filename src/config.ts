import {ethers} from 'ethers';
import {contractAbi} from './contract';

export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = !IS_DEV;

console.log('Configuration: isDev:', IS_DEV);

type Config = {
    contract: string;
    contractAbi: ethers.ContractInterface;
    explorer: string;
    defaultProviderNetwork?: string;
    network: ethers.providers.Network;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
};

const config: Config = {
    explorer: 'https://ropsten.etherscan.io',
    network: {
        name: 'Ethereum Ropsten',
        chainId: 0x03,
    },
    defaultProviderNetwork: 'ropsten',
    nativeCurrency: {
        name: 'EtherT',
        symbol: 'etht',
        decimals: 18,
    },
    contract: '0xcB52E88E61ccA0C5C63C60700fEc37c9575C8996',
    contractAbi: contractAbi,
};

export default config;
