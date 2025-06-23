"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem("dark-mode")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "true" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", isDark)
      localStorage.setItem("dark-mode", isDark.toString())
    }
  }, [isDark, mounted])

  if (!mounted) return null // prevent hydration mismatch

  return (
    <>

      {/* Fixed Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className="dark-mode-toggle"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div className="icon-container">
          {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-black-600" />}
        </div>
      </button>

      
    </>
  )
}
