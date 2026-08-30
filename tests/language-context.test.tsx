import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { LanguageProvider, useLanguage } from '@/lib/language-context'

function TestConsumer() {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <span data-testid="nav-how">{t.nav.howItWorks}</span>
      <button onClick={() => setLanguage('es')}>Set ES</button>
      <button onClick={() => setLanguage('pt')}>Set PT</button>
      <button onClick={() => setLanguage('en')}>Set EN</button>
    </div>
  )
}

describe('LanguageContext Hardened Tests', () => {
  const originalLanguage = navigator.language

  const setNavigatorLanguage = (lang: string) => {
    Object.defineProperty(navigator, 'language', {
      value: lang,
      configurable: true,
    })
  }

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = 'es'
  })

  afterEach(() => {
    setNavigatorLanguage(originalLanguage)
    vi.restoreAllMocks()
  })

  it('allows dynamic switching between es, pt and en while synchronizing localStorage and document.documentElement.lang', async () => {
    setNavigatorLanguage('en-US')
    const user = userEvent.setup()

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
    expect(document.documentElement.lang).toBe('en')

    // Switch to ES
    await user.click(screen.getByText('Set ES'))
    expect(screen.getByTestId('current-lang')).toHaveTextContent('es')
    expect(localStorage.getItem('lexiacode-lang')).toBe('es')
    expect(document.documentElement.lang).toBe('es')

    // Switch to PT
    await user.click(screen.getByText('Set PT'))
    expect(screen.getByTestId('current-lang')).toHaveTextContent('pt')
    expect(localStorage.getItem('lexiacode-lang')).toBe('pt')
    expect(document.documentElement.lang).toBe('pt')

    // Switch to EN
    await user.click(screen.getByText('Set EN'))
    expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
    expect(localStorage.getItem('lexiacode-lang')).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })

  it('prevails saved valid preference from localStorage regardless of browser language', () => {
    setNavigatorLanguage('pt-BR')
    localStorage.setItem('lexiacode-lang', 'es')

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-lang')).toHaveTextContent('es')
    expect(document.documentElement.lang).toBe('es')
  })

  it('falls back strictly to "en" when localStorage has invalid value and browser language is unsupported (fr-FR)', () => {
    setNavigatorLanguage('fr-FR')
    localStorage.setItem('lexiacode-lang', 'invalid_unsupported_lang')

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
    expect(document.documentElement.lang).toBe('en')
  })

  it('detects "es" cleanly when browser language is es-AR and no localStorage preference is present', () => {
    setNavigatorLanguage('es-AR')

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-lang')).toHaveTextContent('es')
    expect(document.documentElement.lang).toBe('es')
  })

  it('detects "pt" cleanly when browser language is pt-BR and no localStorage preference is present', () => {
    setNavigatorLanguage('pt-BR')

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-lang')).toHaveTextContent('pt')
    expect(document.documentElement.lang).toBe('pt')
  })

  it('throws error when useLanguage is invoked outside of LanguageProvider', () => {
    expect(() => render(<TestConsumer />)).toThrow('useLanguage must be used within a LanguageProvider')
  })
})
