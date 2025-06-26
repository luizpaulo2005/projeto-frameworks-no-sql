import './globals.css'

import type { Metadata } from 'next'
import { Inter, JetBrains_Mono as JetBrains } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Toaster } from '@/components/ui/sonner'
import { ProgressProvider } from '@/providers/progress'
import { QueryProvider } from '@/providers/query'
import { ThemeProvider } from '@/providers/theme'

const InterSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const JetBrainsMono = JetBrains({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Notícia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <NuqsAdapter>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <body
            className={`${InterSans.variable} ${JetBrainsMono.variable} bg-background text-foreground !mx-auto max-w-7xl !p-4 antialiased`}
          >
            <ProgressProvider>
              <Toaster richColors />
              <QueryProvider>{children}</QueryProvider>
            </ProgressProvider>
          </body>
        </ThemeProvider>
      </NuqsAdapter>
    </html>
  )
}
