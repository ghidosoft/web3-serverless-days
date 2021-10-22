import config from './config';

export const truncateMiddle = (text?: string, length = 40, separator = '…'): string => {
    if (text === undefined) {
        return '';
    }
    if (text.length > length) {
        return text.substr(0, Math.ceil(length / 2)) + separator + text.substr(text.length - Math.floor(length / 2));
    }
    return text;
};

export const truncateAddress = (address?: string): string => truncateMiddle(address, 16);

export const truncateTxHash = truncateAddress;

export const getAddressExplorerUrl = (address: string): string => `${config.explorer}/address/${address}`;
export const getContractExplorerUrl = getAddressExplorerUrl;
export const getTxExplorerUrl = (hash: string): string => `${config.explorer}/tx/${hash}`;

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items
 * @return {Array} The shuffled array
 */
export const shuffle = <T>(a: T[]): T[] => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export const formatId = (id: number): string => id.toString().padStart(2, '0');

export const generateMetadataUrl = (baseUri: string, id: number): string => `${baseUri}${id.toString()}`;

export const randomizeIds = (max: number, count: number): number[] => {
    const ids = Array.from({length: max}, (_, i) => i + 1);
    shuffle(ids);
    return ids.slice(0, count);
};
