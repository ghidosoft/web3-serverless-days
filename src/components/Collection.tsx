import React from 'react';
import {useWalletData} from '../contexts/WalletDataContext';
import {shuffle} from '../utils';
import CollectionItem from './CollectionItem';

const HIDE_BREAKPOINTS = ['', 'sm', 'md', 'lg', 'xl', 'xl'];

const Collection: React.FC = () => {
    const {maxSupply} = useWalletData();
    const imageIds = React.useMemo(() => {
        const ids = Array.from({length: maxSupply}, (_, i) => i + 1);
        shuffle(ids);
        return ids.slice(0, HIDE_BREAKPOINTS.length);
    }, [maxSupply]);
    return (
        <div className="container-fluid my-4 text-center">
            <h2 className="text-uppercase py-4 m-0">Collection</h2>
            <div className="row">
                {imageIds.map((id, idx) =>
                    <div key={id} className={`col${HIDE_BREAKPOINTS[idx] ? ` d-none d-${HIDE_BREAKPOINTS[idx]}-block` : ''}`}>
                        <CollectionItem id={id} />
                    </div>)}
            </div>
        </div>
    );
};

export default Collection;
