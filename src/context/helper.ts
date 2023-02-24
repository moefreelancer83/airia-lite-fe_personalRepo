import { Connection, Keypair } from "@solana/web3.js";
import {
    Metaplex,
    bundlrStorage,
    toPublicKey,
    Signer,
    walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import * as config from "../config";
import { successAlert } from "../components/ToastGroup";
import { updateNft } from "../firebase/firebase";

/// This function mints an edition from the original mint, keeps the authority for the auth of Master edition, and gives the ownership the user (the minter)
export async function mintEditionNft(
    connection: Connection,
    wallet: WalletContextState,
    setLoading: Function
) {
    console.log(`Minting Edition NFT, Master Edition: ${config.originalMint}`);
    setLoading(true);
    if (wallet.publicKey === null) return;
    try {

        const METAPLEX = Metaplex.make(connection, { cluster: config.NETWORK }).use(walletAdapterIdentity(wallet)).use(bundlrStorage({
            address: config.bundlrAddress,
            providerUrl: config.RPC,
            timeout: 60000,
        }));

        ///  Generating a new keypair for the mint
        const newMintKeypair = Keypair.generate();
        const newMint = {
            publicKey: newMintKeypair.publicKey,
            secretKey: newMintKeypair.secretKey,
        };

        const MINTINGCONFIG = {
            originalMint: toPublicKey(config.originalMint),
            originalTokenAccountOwner: config.originalTokenAccountOwner() as Signer,
            originalTokenAccount: toPublicKey(config.originalTokenAccount),
            newMint: newMint,
            newUpdateAuthority: config.originalTokenAccountOwner().publicKey,
            newOwner: wallet.publicKey,
        };

        const { nft, mintSigner, editionAddress, updatedSupply, metadataAddress } =
            await METAPLEX.nfts().printNewEdition(MINTINGCONFIG, {
                // payer: payer,
                commitment: "finalized",
            });

        console.log(
            `   Minted NFT: https://explorer.solana.com/address/${nft.address}`
            // `   Minted NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`
        );
        console.log(`print edition NFT address is:  ${nft.address.toString()}`);
        // console.log(`mintSigner.publicKey ${mintSigner.publicKey.toString()}`);
        // console.log(`editionAddress ${editionAddress.toString()}`);
        console.log(`updatedSupply ${updatedSupply}`);
        updateNft(wallet.publicKey.toBase58(), nft.address.toString());
        successAlert("Minting success!");
        setLoading(false);
    }
    catch (error) {
        console.log(error)
        setLoading(false)
    }
}

