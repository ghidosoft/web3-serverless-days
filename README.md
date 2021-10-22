# Web3 codefest: mint an NFT by talk end
23-10-2021 Serverless Days Milan (Italy) - Andrea Ghidini <a.ghidini@looptribe.com>

## Contract
* ERC721
* Ropsten network (change network in your Metamask wallet)
* Address: `0xcB52E88E61ccA0C5C63C60700fEc37c9575C8996`
* https://ropsten.etherscan.io/address/0xcB52E88E61ccA0C5C63C60700fEc37c9575C8996

## NFT

Metadata: https://web3-serverlessdays-nft.s3.amazonaws.com/metadata/x

Example https://web3-serverlessdays-nft.s3.amazonaws.com/metadata/3 (OpenSea Metadata standard):
```json
{
    "attributes": [
        {"trait_type": "Main color", "value": "white"},
        {"trait_type": "Eyes", "value": "fulleye"},
        {"trait_type": "Type", "value": "symbol"}
    ],
    "image": "https://web3-serverlessdays-nft.s3.amazonaws.com/images/3.png",
    "name": "Clown Emoji",
    "description": "Many people have a fear of clowns [...] some cheer and knee-slapping comedy with people you know and love."
}
```

Images: https://web3-serverlessdays-nft.s3.amazonaws.com/images/3.png

## Web APP
Typescript / React

Install with `npm i` and run dev server with `npm start`.

You can create production build with `npm run build`.

Application deployed at: http://web3-serverlessdays-nft.s3-website-us-east-1.amazonaws.com/
