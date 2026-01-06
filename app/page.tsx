import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Admin CRUD Dashboard</h1>
        <p className={styles.description}>
          Sistem manajemen data dengan fitur Create, Read, Update, dan Delete
        </p>
        <Link href="/admin" className={styles.button}>
          Masuk ke Admin Panel
        </Link>
      </div>
    </div>
  )
}
