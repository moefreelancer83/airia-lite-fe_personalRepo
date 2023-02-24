import { Keypair } from "@solana/web3.js";

export const NETWORK = "mainnet-beta";
export const ADMIN_WALLET = "Fux9W9A2G7EpAw8YUoRd4G1SeP9nqtPEo3rdhMFyKHXR";
export const RPC = "https://newest-rough-pine.solana-mainnet.quiknode.pro/5ecd82cf022b3e3c09b7d88602a1c20d19ff4719/";
export const originalMint = "6aYtbnNCE9v4L1wjRf5TGDNRYa5FgUBccDTkMWeu8Sfs";
export const originalTokenAccount = "HaeKdKceuvXR5VpfzpcVZMp5qFMwDY5HZb8rfqn9sFQK";
export const originalTokenAccountOwner = () => {
    const secretKey = Uint8Array.from(JSON.parse(process.env.NEXT_PUBLIC_TOKEN_OWNER ?? ''));
    return Keypair.fromSecretKey(secretKey);
}
export const bundlrAddress = "http://node1.bundlr.network";