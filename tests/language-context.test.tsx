import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'
import { LanguageProvider, useLanguage } from '@/lib/language-context'

function TestConsumer() {
  const { language, setLanguage, t } = useLanguage()
  return (
    <div>
      <span data-testid="current-lang">{language}</span>
      <span data-testid="nav-services">{t.nav.services}</span>
      <button onClick={() => setLanguage('es')}>Set ES</button>
      <button onClick={() => setLanguage('pt')}>Set PT</button>
      <button onClick={() => setLanguage('en')}>Set EN</button>
    </div>
  )
}

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders initial language properly and allows switching between es, en, pt', async () => {
    const user = userEvent.setup()

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )

    // Initial render
    expect(screen.getByTestId('current-lang')).toBeInTheDocument()

    // Switch to ES
    await user.click(screen.getByText('Set ES'))
    expect(screen.getByTestId('current-lang')).toHaveTextContent('es')
    expect(localStorage.getItem('lexiacode-lang')).toBe('es')

    // Switch to PT
    await user.click(screen.getByText('Set PT'))
    expect(screen.getByTestId('current-lang')).toHaveTextContent('pt')
    expect(localStorage.getItem('lexiacode-lang')).toBe('pt')

    // Switch to EN
    await user.click(screen.getByText('Set EN'))
    expect(screen.getByTestId('current-lang')).toHaveTextContent('en')
    expect(localStorage.getItem('lexiacode-lang')).toBe('en')
  })

  it('restores valid preference from localStorage', () => {
    localStorage.setItem('lexiacode-lang', 'es')

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )

    expect(screen.getByTestId('current-lang')).toHaveTextContent('es')
  })

  it('falls back safely when localStorage has an invalid value', () => {
    localStorage.setItem('lexiacode-lang', 'invalid_lang')

    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    )

    // Should fall back to default (en or browser detected)
    const current = screen.getByTestId('current-lang').textContent
    expect(['en', 'es', 'pt']).toContain(current)
  })

  it('throws error when useLanguage is used outside LanguageProvider', () => {
    expect(() => render(<TestConsumer />)).toThrow('useLanguage must be used within a LanguageProvider')
  })
})
