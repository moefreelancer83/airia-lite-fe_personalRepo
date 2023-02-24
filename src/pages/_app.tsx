import "../styles/globals.css"
import "../styles/style.scss";
import { ToastContainer } from "react-toastify";
import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app"
import Wallet from "../components/wallet/Wallet"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Wallet>
      <Component {...pageProps} />
      <ToastContainer style={{ fontSize: 15 }} pauseOnFocusLoss={false} />
    </Wallet>
  )
}
