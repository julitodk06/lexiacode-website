"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe, ChevronDown, Sun, Moon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/language-context"
import type { Language } from "@/lib/translations"
import { useTheme } from "next-themes"
import { usePathname, useRouter } from "next/navigation"

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'pt', label: 'Português', flag: 'PT' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navLinks = [
    { label: t.nav.howItWorks, href: "/como-funciona/" },
    { label: t.nav.rwaProjects, href: "/proyectos-rwa/" },
    { label: t.nav.blog, href: "/blog/" },
    { label: t.nav.security, href: "/#security" },
    { label: t.nav.contact, href: "/#contact" },
  ]

  const currentLang = languages.find(l => l.code === language)
  const isHome = pathname === "/" || pathname === "" || pathname === null
  const isHeaderDark = isHome && !scrolled

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      const sections = ["services", "how-it-works", "projects", "security", "contact"]
      let current = ""
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = `/#${id}`
            break
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHash = href.startsWith("#") || href.startsWith("/#")
    const isHomePath = isHome

    if (isHash && isHomePath) {
      e.preventDefault()
      const id = href.replace("/#", "").replace("#", "")
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      setMobileMenuOpen(false)
    } else if (isHash && !isHomePath) {
      e.preventDefault()
      const route = href.startsWith("/") ? href : `/${href}`
      router.push(route)
      setMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex flex-col ${
        scrolled
          ? "border-b border-border/60 bg-background/90 backdrop-blur-xl shadow-lg shadow-black/20"
          : "bg-background/80 backdrop-blur-xl"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 transition-transform group-hover:scale-105">
            <polygon 
              points="50,8 88,30 88,70 50,92 12,70 12,30" 
              stroke="#00f5d4" 
              strokeWidth="8" 
              strokeLinejoin="round" 
            />
            {/* L */}
            <path 
              d="M36,32 L36,66 L52,66" 
              stroke="#00f5d4" 
              strokeWidth="9" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* X */}
            <path 
              d="M64,36 L48,64" 
              stroke="#00f5d4" 
              strokeWidth="9" 
              strokeLinecap="round" 
            />
            <path 
              d="M48,36 L64,64" 
              stroke="#00f5d4" 
              strokeWidth="9" 
              strokeLinecap="round" 
            />
          </svg>
          <span className={`text-xl font-semibold tracking-tight transition-colors ${
            isHeaderDark ? "text-white" : "text-foreground"
          }`}>
            Lexia<span className="text-primary font-bold">Code</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive
                    ? "text-primary font-semibold"
                    : isHeaderDark
                      ? "text-gray-300 hover:text-white hover:bg-white/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
                )}
              </a>
            )
          })}
        </div>

        {/* Right side */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (isHome) {
                const el = document.getElementById("contact")
                if (el) el.scrollIntoView({ behavior: "smooth" })
              } else {
                router.push("/#contact")
              }
            }}
            className={`font-semibold text-xs border rounded-full px-4 py-2 transition-all duration-300 ${
              isHeaderDark
                ? "text-gray-300 border-white/20 hover:border-primary/50 hover:bg-primary/10 hover:text-white"
                : "text-muted-foreground hover:text-foreground border-border/30 hover:border-primary/40 hover:bg-primary/5"
            }`}
          >
            {t.nav.investorLogin}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Seleccionar idioma"
                className={`flex items-center gap-1.5 transition-colors ${
                  isHeaderDark
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Globe className="h-4 w-4" />
                <span className="font-mono text-xs font-semibold">{currentLang?.flag}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[140px]">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center justify-between cursor-pointer ${
                    language === lang.code ? "bg-secondary text-foreground" : ""
                  }`}
                >
                  <span>{lang.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">{lang.flag}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                aria-label="Seleccionar idioma"
                className={`flex items-center gap-1 transition-colors ${
                  isHeaderDark
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground"
                }`}
              >
                <Globe className="h-4 w-4" />
                <span className="font-mono text-xs">{currentLang?.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? "bg-secondary" : ""}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            type="button"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`rounded-md p-1.5 transition-colors ${
              isHeaderDark
                ? "text-gray-300 hover:text-white hover:bg-white/10"
                : "text-foreground hover:bg-secondary/50"
            }`}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="border-t border-border/50 bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="space-y-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  activeSection === link.href || (pathname?.includes(link.href) && link.href !== "/")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 px-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (isHome) {
                    const el = document.getElementById("contact")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  } else {
                    router.push("/#contact")
                  }
                }}
                className="w-full text-center border-primary/30 text-primary hover:bg-primary/10 rounded-xl py-5 font-semibold text-xs"
              >
                {t.nav.investorLogin}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
