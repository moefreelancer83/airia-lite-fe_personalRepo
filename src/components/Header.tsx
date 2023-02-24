/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { ADMIN_WALLET } from "../config";
import { useRouter } from "next/router";

export default function Header(props: { balance: any }) {
    const { balance } = props;
    const wallet = useWallet();
    const router = useRouter();
    useEffect(() => {
        if (wallet.publicKey?.toBase58() !== ADMIN_WALLET) {
            router.push("/")
        }
    }, [wallet.connected, wallet.publicKey]);
    return (
        <header className="header fixed w-full left-0 top-0 bg-[#0b14183b] backdrop-blur-lg">
            <div className="header-content">
                <div className="header-left">
                    {/* <Link href="https://airia.xyz/"> */}
                    <Link href="/">
                        <a>
                            {/* <a target="_blank"> */}
                            {/* eslint-disable-next-line */}
                            <img src="/img/logo.svg" className="logo" alt="" />
                        </a>
                    </Link>
                    <div className="header-values">
                        <h5 className="page-title">AiriA Minting</h5>
                        {wallet.publicKey && (
                            <h5 className="value">
                                SOL Balance:
                                <span>{(balance || 0).toLocaleString()} SOL</span>
                            </h5>
                        )}
                    </div>
                </div>
                <div className="header-right">
                    {wallet.publicKey?.toBase58() === ADMIN_WALLET &&
                        <ul className="flex">
                            <li className="uppercase text-primary mx-4">
                                <Link href={"/whitelist"}>
                                    <a className="font-semibold hover:underline">whitelist</a>
                                </Link>
                            </li>
                        </ul>
                    }
                    <WalletModalProvider>
                        <WalletMultiButton />
                    </WalletModalProvider>
                </div>
            </div>
            <div className="header-values mobile">
                <h5 className="page-title">AiriA Minting</h5>
                {wallet.publicKey && (
                    <h5 className="value">
                        SOL Balance:
                        <span>{(balance || 0).toLocaleString()} SOL</span>
                    </h5>
                )}
            </div>
        </header>
    );
}
