import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Admin CRUD - Next.js',
  description: 'Website Admin dengan fitur CRUD menggunakan Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
