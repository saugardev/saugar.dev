import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'
import type { Metadata } from 'next'
import { Mukta } from 'next/font/google'
import { Navbar } from '@/components/Navbar'

const font = Mukta({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Saul Garcia Cespedes - Blog',
  description: 'Saugar.dev is your gateway to the tech world and personal reflections. Dive into insightful posts on the latest technology trends, personal experiences, and unique thoughts that provoke curiosity and inspire growth. Explore now for a fresh perspective.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className} bg-background`}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <Navbar />
        <main className="px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </ThemeProvider>
      </body>
    </html>
  )
}
