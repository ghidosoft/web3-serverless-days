import React from 'react';
import {formatId} from '../utils';
import GalleryMetadata from './GalleryMetadata';
import {useWalletData} from '../contexts/WalletDataContext';
import {loadMetadata} from '../metadata';
import {Metadata} from '../types';
import Spinner from './Spinner';

type Props = {
    id: number;
};

const GalleryItem: React.FC<Props> = ({id}) => {
    const {baseUri} = useWalletData();
    const [metadata, setMetadata] = React.useState<Metadata>();
    React.useEffect(() => {
        setMetadata(undefined);
        loadMetadata(baseUri, id)
            .then((m) => setMetadata(m))
            .catch((err) => {
                console.error(`GalleryMetadata: cannot load metadata ${id}`, err);
            });
    }, [baseUri, id]);
    if (!metadata) {
        return <Spinner />;
    }
    return (
        <div className="row mb-5">
            <div className="col">
                <div className="gallery-img">
                    <img src={metadata.image} alt={`#${id}`} />
                    <div className="gallery-img-id p-2">#{formatId(id)}</div>
                </div>
            </div>
            <div className="col">
                <GalleryMetadata metadata={metadata} />
            </div>
        </div>
    );
};

export default GalleryItem;
