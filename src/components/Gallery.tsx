import React from 'react';
import {useWallet} from '../contexts/WalletContext';
import {useWalletData} from '../contexts/WalletDataContext';
import GalleryItem from './GalleryItem';

const Gallery: React.FC = () => {
    const {account} = useWalletData();
    const wallet = useWallet();
    const [items, setItems] = React.useState<number[]>([]);
    React.useEffect(() => {
        setItems([]);
        (async function() {
            if (account) {
                console.log(`Gallery: loading NFTs for account=${account}`);
                const count = await wallet.balanceOf(account);
                console.log(`Gallery: found ${count} NFTs`);
                const results: number[] = [];
                for (let i = 0; i < count; i++) {
                    const item = await wallet.tokenOfOwnerByIndex(account, i);
                    results.push(item);
                    console.log(`Gallery: loaded NFT #${item}`);
                }
                console.log('Gallery: NFTs loaded', results);
                setItems(results);
            }
        })();
    }, [account, wallet]);
    if (!items.length) {
        return null;
    }
    return (
        <>
            <div className="container my-5 text-center">
                <h2 className="text-center text-uppercase py-4 fs-4 m-0">Your NFTs</h2>
            </div>
            <div className="container my-4 block gallery-container text-center">
                <div className="gallery mt-5">
                    {items.map((id) => <GalleryItem key={id} id={id} />)}
                </div>
            </div>
        </>
    );
};

export default Gallery;
