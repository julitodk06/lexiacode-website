"use client"

import { Github, Linkedin } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    company: [
      { label: t.footer.company.about, href: "/sobre-nosotros/" },
      { label: t.footer.company.careers, href: "/sobre-nosotros/#careers" },
      { label: t.footer.company.contact, href: "/#contact" },
    ],
    resources: [
      { label: t.footer.resources.docs, href: "/documentacion/" },
      { label: t.footer.resources.whitepaper, href: "/whitepaper/" },
      { label: t.footer.resources.blog, href: "/blog/" },
      { label: t.footer.resources.faq, href: "/faq/" },
    ],
    legal: [
      { label: t.footer.legal.privacy, href: "/politica-de-privacidad/" },
      { label: t.footer.legal.terms, href: "/terminos-de-servicio/" },
      { label: t.footer.legal.compliance, href: "/compliance/" },
      { label: t.footer.legal.disclaimer, href: "/descargo-de-responsabilidad/" },
    ],
  }

  const socials = [
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/julio-antonio-villalobo-770b22296" },
    { icon: Github, label: "GitHub", href: "https://github.com/julitodk06" },
  ]

  return (
    <footer className="relative border-t border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Brand col */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8">
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
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Lexia<span className="text-primary font-bold">Code</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>
            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/40 bg-secondary/30 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/5"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links cols */}
          {(["company", "resources", "legal"] as const).map((col) => (
            <div key={col}>
              <h4 className="text-sm font-semibold text-foreground">
                {t.footer[col].title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {footerLinks[col].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LexiaCode. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
