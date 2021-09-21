import React, {useEffect, useState} from 'react';
import { IFrameEthereumProvider } from '@ledgerhq/iframe-provider';
import {ethers} from 'ethers';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [ethereum, set_ethereum] = useState(undefined)
  const [provider, set_provider] = useState(undefined)
  const [balance, set_balance] = useState(0)
  useEffect(() => {
    set_ethereum(new IFrameEthereumProvider());
  }, [typeof(window) !== 'undefined'])

  useEffect(() => {
    if (ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(ethereum);
      set_provider(web3Provider);

      const signer = web3Provider.getSigner()
      signer.getBalance().then(e => set_balance(ethers.utils.formatEther(e)))
    }
  }, [ethereum])

  ethereum?.on('accountsChanged', function (accounts) {
    if (provider) {
      const signer = provider.getSigner()
      signer.getBalance().then(e => set_balance(ethers.utils.formatEther(e)))
      console.warn(accounts)
    }
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>yLedger</title>
        <meta name="description" content="yLedger" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Balance: <a href="#">{balance}</a>
        </h1>

      </main>
    </div>
  )
}
