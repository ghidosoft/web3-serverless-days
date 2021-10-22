import {Metadata} from './types';
import {generateMetadataUrl} from './utils';

export const loadMetadata = async (baseUri: string, id: number): Promise<Metadata> => {
    const result = await fetch(generateMetadataUrl(baseUri, id));
    return result.json();
};
