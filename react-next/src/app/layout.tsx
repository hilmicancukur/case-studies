import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "700", "900"],
})

export const metadata = {
  title: 'Case Study',
  description: 'Case Study with React, Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}
