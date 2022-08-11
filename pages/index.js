import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"

export default function Home() {
    // How do we show the recently listed NFTs?

    // We will index the events off-chain and then read from our database
    // Setup a server to listen for those events to be fired, and we will add them to a database to query

    // We will read from a database that has all the mapping in and easier to read data structure

    // Moralis is a centralized way and The Graph is a decentralized way

    // Renaming data to listedNfts and isFetching to fetchingListedNfts
    // useMoralisQuery takes to parameters, the table name and a function for the query.
    const { isWeb3Enabled } = useMoralis()
    const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
        // TableName
        // Function for the query
        "ActiveItem",
        // We're grabbing the first 10 in descending order of the tokenId
        (query) => query.limit(10).descending("tokenId")
    )
    // The results get saved to our listedNfts variable
    console.log(listedNfts)

    return (
        // We want to check if we are fetching the NFTs, if we are: Loading, if not show them
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
            <div className="flex flex-wrap">
                {isWeb3Enabled ? (
                    fetchingListedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        // .map() goes through and does a function on all of the listedNfts
                        // Take each nft as an input parameter, pull out all of the attributes, then display them
                        listedNfts.map((nft) => {
                            console.log(nft.attributes)
                            const { price, nftAddress, tokenId, marketplaceAddress, seller } =
                                nft.attributes
                            return (
                                <div>
                                    <NFTBox
                                        price={price}
                                        nftAddress={nftAddress}
                                        tokenId={tokenId}
                                        marketplaceAddress={marketplaceAddress}
                                        seller={seller}
                                        // This is for a warning that comes up related to all the mappings need to have their own unique key
                                        key={`${nftAddress}${tokenId}`}
                                    />
                                </div>
                            )
                        })
                    )
                ) : (
                    <div>Web3 Currently Not Enabled</div>
                )}
            </div>
        </div>
    )
}
