"use client"

import { useState, useEffect } from "react"
import { useUser, UserButton } from '@clerk/nextjs'
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

    const { user } = useUser()
    const role = user?.publicMetadata?.role

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-title">
                    <h1>Lost Ark Gold Tracker</h1>
                </div>
                    <div className="button-group">
             
                            <Link href="/home" 
                                className={`nav-button ${activeButton === "home" ? "active" : ""}`}
                                onClick={() => handleButtonClick("home")}
                            >Home
                            </Link>
                            <Link href="/dashboard" 
                                className={`nav-button ${activeButton === "dashboard" ? "active" : ""}`}
                                onClick={() => handleButtonClick("dashboard")}
                            >Gold Tracker
                            </Link>
                            {role === 'admin' &&
                            <Link href="/admin" 
                                className={`nav-button ${activeButton === "admin" ? "active" : ""}`}
                                onClick={() => handleButtonClick("admin")}
                            >Admin Panel
                            </Link>}
<div style={{ width: '48px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ transform: 'scale(1.5)', transformOrigin: 'center' }}>
    <UserButton />
  </div>
</div>
              
                    </div>
            </div>
        </nav>
    )
}
