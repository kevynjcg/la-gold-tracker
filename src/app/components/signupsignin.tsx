'use client'

import { useUser, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import DarkMode from './darkmode'
import { useRouter } from 'next/navigation'

export default function SignUpSignIn() {
  const { user, isLoaded } = useUser()
  const role = user?.publicMetadata?.role

  if (!isLoaded) return null


    return (

  <nav className="navbar">
            <div className="nav-container">
                <div className="nav-title">
                    <h1>MyApp</h1>
                </div>
                    <div className="button-group">

                    <SignInButton>
                    <button className="nav-button">Sign In</button>
                    </SignInButton>
                    <SignUpButton>
                    <button className="nav-button">Sign Up</button>
                    </SignUpButton>

                    </div>
            </div>
        </nav>



  )
}