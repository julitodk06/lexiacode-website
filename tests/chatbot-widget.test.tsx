import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ChatbotWidget } from '@/components/ui/chatbot-widget'

describe('ChatbotWidget', () => {
  it('renders closed initially and opens upon toggle click', async () => {
    const user = userEvent.setup()
    render(<ChatbotWidget />)

    // Initially, open button is visible
    const openButton = screen.getByRole('button', { name: /abrir chat/i })
    expect(openButton).toBeInTheDocument()

    // Click to open
    await user.click(openButton)

    // Chat header is visible
    expect(screen.getByText('LexiaBot')).toBeInTheDocument()
    expect(screen.getByText(/asistente técnico de LexiaCode/i)).toBeInTheDocument()
  })

  it('runs interactive suggested questions without network requests or external API keys', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    const user = userEvent.setup()

    render(<ChatbotWidget />)

    // Open chat
    await user.click(screen.getByRole('button', { name: /abrir chat/i }))

    // Click on suggested doubt
    const dudaButton = screen.getByText('¿Mi activo puede tokenizarse?')
    await user.click(dudaButton)

    // Verify response appears (with timeout for the 850ms simulated typing delay)
    expect(await screen.findByText(/diagnóstico técnico preliminar/i, {}, { timeout: 3000 })).toBeInTheDocument()

    // Confirm no network requests were fired
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(process.env.GEMINI_API_KEY).toBeUndefined()

    fetchSpy.mockRestore()
  })

  it('displays the disclaimer explaining technical orientation and no investment advice', async () => {
    const user = userEvent.setup()
    render(<ChatbotWidget />)

    await user.click(screen.getByRole('button', { name: /abrir chat/i }))

    // Click on legal question
    const legalButton = screen.getByText('¿Es legal en Argentina con la CNV?')
    await user.click(legalButton)

    expect(await screen.findByText(/compliance-by-design/i, {}, { timeout: 3000 })).toBeInTheDocument()
  })
})
