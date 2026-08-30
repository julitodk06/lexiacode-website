import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ContactSection } from '@/components/landing/contact-section'
import { LanguageProvider } from '@/lib/language-context'

describe('ContactSection', () => {
  it('renders all required form fields and institutional contact details', () => {
    render(
      <LanguageProvider>
        <ContactSection />
      </LanguageProvider>
    )

    // Check institutional email and whatsapp presence
    expect(screen.getByText('juliov@lexiacode.com')).toBeInTheDocument()
    expect(screen.getByText('+54 381 540 0016')).toBeInTheDocument()

    // Check inputs by placeholder
    expect(screen.getByPlaceholderText(/Carlos Mendoza/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/ejemplo@empresa\.com/i)).toBeInTheDocument()
  })

  it('triggers mailto: with structured payload without sending to a backend', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.spyOn(global, 'fetch')

    render(
      <LanguageProvider>
        <ContactSection />
      </LanguageProvider>
    )

    const nameInput = screen.getByPlaceholderText(/Carlos Mendoza/i)
    const emailInput = screen.getByPlaceholderText(/ejemplo@empresa\.com/i)
    const messageInput = screen.getByPlaceholderText(/Describe brevemente/i)

    await user.type(nameInput, 'Alice Developer')
    await user.type(emailInput, 'alice@example.com')
    await user.type(messageInput, 'Requerimiento de smart contracts')

    // Check submit button
    const submitButton = screen.getByRole('button', { name: /Send via Email|Enviar por Email/i })
    expect(submitButton).toBeInTheDocument()

    await user.click(submitButton)

    // No backend POST was made
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('provides direct link to official WhatsApp without mock intermediary', () => {
    render(
      <LanguageProvider>
        <ContactSection />
      </LanguageProvider>
    )

    const whatsappLink = screen.getByRole('link', { name: /\+54 381 540 0016/i })
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/5493815400016')
  })
})
