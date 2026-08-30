import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ChatbotWidget } from '@/components/ui/chatbot-widget'

const mockPush = vi.fn()
let currentMockPathname = '/'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => currentMockPathname,
}))

describe('ChatbotWidget Hardened Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    currentMockPathname = '/'
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('unmounts dialog and prevents focusable descendants when closed; mounts role="dialog" on open', async () => {
    const user = userEvent.setup()
    render(<ChatbotWidget />)

    // Antes de abrir: dialog, textbox y close button no deben existir en DOM
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(screen.queryByRole('textbox', { name: /mensaje para el asistente/i })).toBeNull()
    expect(screen.queryByRole('button', { name: /cerrar asistente/i })).toBeNull()

    const triggerBtn = screen.getByRole('button', { name: /abrir asistente técnico/i })
    expect(triggerBtn).toHaveAttribute('aria-expanded', 'false')
    expect(triggerBtn).toHaveAttribute('aria-controls', 'chatbot-dialog')

    // Al abrir: diálogo montado y aria-expanded = true
    await user.click(triggerBtn)
    expect(triggerBtn).toHaveAttribute('aria-expanded', 'true')

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('id', 'chatbot-dialog')
    expect(dialog).toHaveAttribute('aria-labelledby', 'chatbot-title')

    // Al cerrar: diálogo desmontado y foco devuelto
    const closeBtn = screen.getByRole('button', { name: /cerrar asistente/i })
    await user.click(closeBtn)

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(triggerBtn).toHaveAttribute('aria-expanded', 'false')
    expect(document.activeElement).toBe(triggerBtn)
  })

  it('closes dialog on Escape key, unmounts it from DOM and restores focus to open button', async () => {
    const user = userEvent.setup()
    render(<ChatbotWidget />)

    const triggerBtn = screen.getByRole('button', { name: /abrir asistente técnico/i })
    await user.click(triggerBtn)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(triggerBtn).toHaveAttribute('aria-expanded', 'true')

    // Press Escape key
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(triggerBtn).toHaveAttribute('aria-expanded', 'false')
    expect(document.activeElement).toBe(triggerBtn)
  })

  it('renders accessible input and send button, handles questions deterministically without fetch', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    const user = userEvent.setup()

    render(<ChatbotWidget />)

    await user.click(screen.getByRole('button', { name: /abrir asistente técnico/i }))

    const input = screen.getByRole('textbox', { name: /mensaje para el asistente/i })
    const sendBtn = screen.getByRole('button', { name: /enviar mensaje/i })

    expect(input).toBeInTheDocument()
    expect(sendBtn).toBeInTheDocument()

    // Test legal response
    const legalDuda = screen.getByText('¿Es legal en Argentina con la CNV?')
    await user.click(legalDuda)

    // Verify legal disclaimer and orientation text
    const responseEl = await screen.findByText(/orientación es de carácter técnico y preliminar y no sustituye asesoramiento legal, financiero o de inversión/i, {}, { timeout: 3000 })
    expect(responseEl).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()

    fetchSpy.mockRestore()
  })

  it('navigates to /#contact via router.push when clicking CTA from a secondary route (/blog/)', async () => {
    currentMockPathname = '/blog/'
    const user = userEvent.setup()

    render(<ChatbotWidget />)

    await user.click(screen.getByRole('button', { name: /abrir asistente técnico/i }))

    // Trigger an interaction to reveal the CTA buttons
    const duda = screen.getByText('¿Tiene costos muy elevados?')
    await user.click(duda)

    const scheduleBtn = await screen.findByRole('button', { name: /agendar consulta técnica/i }, { timeout: 3000 })
    await user.click(scheduleBtn)

    expect(mockPush).toHaveBeenCalledWith('/#contact')
  })

  it('executes smooth scroll to #contact when clicking CTA on the homepage (/)', async () => {
    currentMockPathname = '/'
    const user = userEvent.setup()

    const contactSection = document.createElement('section')
    contactSection.setAttribute('id', 'contact')
    document.body.appendChild(contactSection)

    const scrollSpy = vi.fn()
    contactSection.scrollIntoView = scrollSpy

    render(<ChatbotWidget />)

    await user.click(screen.getByRole('button', { name: /abrir asistente técnico/i }))

    // Trigger an interaction to reveal the CTA buttons
    const duda = screen.getByText('¿Tiene costos muy elevados?')
    await user.click(duda)

    const scheduleBtn = await screen.findByRole('button', { name: /agendar consulta técnica/i }, { timeout: 3000 })
    await user.click(scheduleBtn)

    expect(scrollSpy).toHaveBeenCalled()
    expect(mockPush).not.toHaveBeenCalled()

    document.body.removeChild(contactSection)
  })
})
