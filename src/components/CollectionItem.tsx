import React from 'react';
import {useWalletData} from '../contexts/WalletDataContext';
import {loadMetadata} from '../metadata';
import {Metadata} from '../types';
import {formatId} from '../utils';
import CollectionMetadata from './CollectionMetadata';
import Spinner from './Spinner';

type Props = {
    id: number;
};

const CollectionItem: React.FC<Props> = ({id}) => {
    const {baseUri} = useWalletData();
    const [metadata, setMetadata] = React.useState<Metadata>();
    React.useEffect(() => {
        setMetadata(undefined);
        loadMetadata(baseUri, id)
            .then((m) => setMetadata(m))
            .catch((err) => {
                console.error(`CollectionMetadata: cannot load metadata ${id}`, err);
            });
    }, [baseUri, id]);
    if (!metadata) {
        return <Spinner />;
    }
    return (
        <div className="px-2 pt-5 pb-3">
            <div className="collection-meta">
            id: <span className="fw-bold">#{formatId(id)}</span>
            </div>
            <img src={metadata.image} alt={`#${id}`} className="collection-item-img mb-1" />
            <CollectionMetadata metadata={metadata} />
        </div>
    );
};

export default CollectionItem;
