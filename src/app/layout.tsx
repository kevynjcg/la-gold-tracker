'use client'

import type { Metadata } from 'next'
import { useEffect, useState } from 'react'
import './globals.css'
import Navigation from './components/Navigation'
import HomePage from './page'
import DarkModeToggle from './components/darkmode'
import SignUpSignIn from './components/signupsignin'

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  SignIn,
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

              <Navigation/>                 

            <main className="app-main">
                {children}
            </main>
          </div>
          <DarkModeToggle/>
        </body>
      </html>
    </ClerkProvider>
  )
}
