import React from 'react';
import Collection from './Collection';
import Gallery from './Gallery';
import Header from './Header';
import Mint from './Mint';

const App: React.FC = () => (
    <>
        <Header />
        <h1 className="text-center">Looptribe&apos;s emoji NFT</h1>
        <Mint />
        <Collection />
        <Gallery />
    </>
);

export default App;
