import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>MovieApp</title>
        <meta name="description" content="Find the next movie that will change everything" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <Link href="/rate">Start Rating</Link>
        </div>
      </main>

    </div>
  )
}
