"use client"

import { useState, useEffect } from "react"
import { useUser, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { useRouter, usePathname } from "next/navigation"

export default function Navigation() {
    const router = useRouter()
    const pathname = usePathname()

    const getActiveButtonFromPath = (path: string) => {
        if (path === "/dashboard") {
            return "dashboard"
        } else if (path === "/admin") {
            return "admin"
        }
            return "home"
    }

    const [activeButton, setActiveButton] = useState(() => getActiveButtonFromPath(pathname))

  // Update active button when pathname changes
    useEffect(() => {
      const newActiveButton = getActiveButtonFromPath(pathname)
      setActiveButton(newActiveButton)
    }, [pathname])  
    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName)

        if (buttonName === "home") {
            router.push("/")
        } else if (buttonName === "dashboard") {
            router.push("/dashboard")
        } else if (buttonName === "admin") {
            router.push("/admin")
    }
    console.log(`Navigating to ${buttonName}`)
    }

    const { user, isLoaded } = useUser()
    const role = user?.publicMetadata?.role

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-title">
                    <h1>MyApp</h1>
                </div>
                    <div className="button-group">
                        <SignedIn>
                            <Link href="/home" 
                                className={`nav-button ${activeButton === "home" ? "active" : ""}`}
                                onClick={() => handleButtonClick("home")}
                            >Home
                            </Link>
                            <Link href="/dashboard" 
                                className={`nav-button ${activeButton === "dashboard" ? "active" : ""}`}
                                onClick={() => handleButtonClick("dashboard")}
                            >Dashboard
                            </Link>
                            {role === 'admin' &&
                            <Link href="/admin" 
                                className={`nav-button ${activeButton === "admin" ? "active" : ""}`}
                                onClick={() => handleButtonClick("admin")}
                            >Admin Panel
                            </Link>}
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton>
                                <button className="nav-button">Sign In</button>
                            </SignInButton>
                            <SignUpButton>
                                <button className="nav-button">Sign Up</button>
                            </SignUpButton>
                        </SignedOut>
                    </div>
            </div>
        </nav>
    )
}
