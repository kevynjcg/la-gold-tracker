'use client'



import './globals.css'
import Navigation from './components/Navigation'
import HomePage from './page'
import DarkModeToggle from './components/darkmode'


import {
  ClerkProvider,
  SignedIn,
  SignedOut,

} from '@clerk/nextjs'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  
 
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="app-layout">
            <SignedIn>
              <Navigation/>                 
            </SignedIn>
            <SignedOut>
      
            </SignedOut>  
            <main className="app-main">
              <HomePage/>
              <SignedIn>
                {children}
              </SignedIn>
            </main>
          </div>
          <DarkModeToggle/>
        </body>
      </html>
    </ClerkProvider>
  )
}
