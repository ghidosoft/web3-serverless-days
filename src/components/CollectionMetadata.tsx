import React from 'react';
import {Metadata} from '../types';

type Props = {
    metadata: Metadata;
};

const CollectionMetadata: React.FC<Props> = ({metadata}) => {
    return (
        <>
            {metadata.attributes.map((m) => (
                <div key={m.trait_type} className="collection-meta">
                    {m.trait_type}: <span className="fw-bold">{m.value}</span>
                </div>
            ))}
        </>
    );
};

export default CollectionMetadata;
