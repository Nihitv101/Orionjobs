import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'



import '../stylesheets/antdOverride.css';
import '../stylesheets/layout.css';
import '../stylesheets/commonClasses.css';


import LayoutProvider from '@/components/LayoutProvider';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Orion Jobs',
  description: 'One and only Job Searching Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LayoutProvider>
      {children}
    </LayoutProvider>
  )
}
