import React from 'react';
import {Metadata} from '../types';

type Props = {
    metadata: Metadata;
};

const GalleryMetadata: React.FC<Props> = ({metadata}) => {
    return (
        <div className="table-responsive">
            <table className="gallery-meta">
                <tbody>
                    <tr><th colSpan={2} className="text-center">{metadata.name}</th></tr>
                    <tr><td colSpan={2} className="text-center">{metadata.description}</td></tr>
                    {metadata.attributes.map((m) => (
                        <tr key={m.trait_type}>
                            <th>{m.trait_type}</th>
                            <td>{m.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GalleryMetadata;
