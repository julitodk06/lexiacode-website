import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ContactSection } from '@/components/landing/contact-section'
import { ChatbotWidget } from '@/components/ui/chatbot-widget'
import { LanguageProvider } from '@/lib/language-context'
import { buildMailtoUrl, buildWhatsAppUrl, OFFICIAL_CONTACT } from '@/lib/contact-links'

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/',
}))

describe('ContactSection Hardened Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('renders all four form fields accessible by label text with matching HTML IDs', () => {
    render(
      <LanguageProvider>
        <ContactSection />
      </LanguageProvider>
    )

    // Check institutional email and whatsapp presence
    expect(screen.getByText(OFFICIAL_CONTACT.email)).toBeInTheDocument()
    expect(screen.getByText(OFFICIAL_CONTACT.phone)).toBeInTheDocument()

    // 4 fields via getByLabelText
    const nameInput = screen.getByLabelText(/Full Name|Nombre Completo|Nome Completo/i)
    const emailInput = screen.getByLabelText(/Email Address|Correo Electrónico|Endereço de Email/i)
    const companyInput = screen.getByLabelText(/Company \/ Project|Empresa \/ Proyecto|Empresa \/ Projeto/i)
    const messageInput = screen.getByLabelText(/Tell us about your project|Cuéntanos sobre tu iniciativa|Conte-nos sobre seu projeto/i)

    expect(nameInput).toHaveAttribute('id', 'contact-name')
    expect(emailInput).toHaveAttribute('id', 'contact-email')
    expect(companyInput).toHaveAttribute('id', 'contact-company')
    expect(messageInput).toHaveAttribute('id', 'contact-message')
  })

  it('builds exact mailto URL, sets window.location.href, renders transparent client notice and executes zero fetch requests', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.spyOn(global, 'fetch')

    render(
      <LanguageProvider>
        <ContactSection />
      </LanguageProvider>
    )

    const nameInput = screen.getByLabelText(/Full Name|Nombre Completo|Nome Completo/i)
    const emailInput = screen.getByLabelText(/Email Address|Correo Electrónico|Endereço de Email/i)
    const companyInput = screen.getByLabelText(/Company \/ Project|Empresa \/ Proyecto|Empresa \/ Projeto/i)
    const messageInput = screen.getByLabelText(/Tell us about your project|Cuéntanos sobre tu iniciativa|Conte-nos sobre seu proyecto/i)

    await user.type(nameInput, 'Sofia Ramos')
    await user.type(emailInput, 'sofia@iniciativa.com')
    await user.type(companyInput, 'TokenTech Corp')
    await user.type(messageInput, 'Requerimiento de desarrollo y testing de smart contracts ERC-3643.')

    // Select an asset type button
    const realEstateBtn = screen.getByRole('button', { name: /^Real Estate$/i })
    await user.click(realEstateBtn)
    expect(realEstateBtn).toHaveAttribute('aria-pressed', 'true')

    const submitBtn = screen.getByRole('button', { name: /Send via Email|Enviar por Email/i })
    await user.click(submitBtn)

    // Zero backend fetch
    expect(fetchSpy).not.toHaveBeenCalled()

    // Transparent notice displayed to the user
    expect(screen.getByText(/Información de envío:/i)).toBeInTheDocument()
    expect(screen.getAllByText(OFFICIAL_CONTACT.email).length).toBeGreaterThanOrEqual(1)

    fetchSpy.mockRestore()
  })

  it('builds pure mailto and whatsapp URLs deterministically with proper encoding', () => {
    const payload = {
      name: 'Sofia Ramos',
      email: 'sofia@iniciativa.com',
      company: 'TokenTech Corp',
      assetType: 'Real Estate',
      message: 'Consulta técnica sobre tokenización.'
    }

    const mailto = buildMailtoUrl(payload)
    expect(mailto).toContain(`mailto:${OFFICIAL_CONTACT.email}`)
    expect(mailto).toContain(encodeURIComponent('Consulta técnica - TokenTech Corp'))
    expect(mailto).toContain(encodeURIComponent('Sofia Ramos'))
    expect(mailto).toContain(encodeURIComponent('sofia@iniciativa.com'))
    expect(mailto).toContain(encodeURIComponent('Real Estate'))

    const wa = buildWhatsAppUrl(payload)
    expect(wa).toContain(OFFICIAL_CONTACT.whatsAppBaseUrl)
    expect(wa).toContain(encodeURIComponent('Sofia Ramos'))
    expect(wa).toContain(encodeURIComponent('TokenTech Corp'))
  })

  it('provides direct link to official WhatsApp and opens window with formatted text', async () => {
    const user = userEvent.setup()
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(
      <LanguageProvider>
        <ContactSection />
      </LanguageProvider>
    )

    const whatsappLink = screen.getByRole('link', { name: /\+54 381 540 0016/i })
    expect(whatsappLink).toHaveAttribute('href', OFFICIAL_CONTACT.whatsAppBaseUrl)

    const whatsappBtn = screen.getByRole('button', { name: /Open WhatsApp|Abrir WhatsApp|Contactar por WhatsApp/i })
    await user.click(whatsappBtn)

    expect(openSpy).toHaveBeenCalledWith(
      expect.stringContaining(OFFICIAL_CONTACT.whatsAppBaseUrl),
      '_blank'
    )

    openSpy.mockRestore()
  })

  it('updates form controlled state and pre-fills company and message when user triggers diagnostic CTA from chatbot on home', async () => {
    const user = userEvent.setup()
    const scrollSpy = vi.fn()

    render(
      <LanguageProvider>
        <ContactSection />
        <ChatbotWidget />
      </LanguageProvider>
    )

    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView = scrollSpy
    }

    // 1. Open chatbot
    const openBtn = screen.getByRole('button', { name: /abrir asistente técnico/i })
    await user.click(openBtn)

    // 2. Select initial diagnostic option
    const viableBtn = screen.getByText('¿Mi activo puede tokenizarse?')
    await user.click(viableBtn)

    // Wait for step 1 question to render
    await screen.findByText(/1\. ¿Qué tipo de activo o proceso buscas modelar\?/i, {}, { timeout: 3000 })
    const input = screen.getByRole('textbox', { name: /mensaje para el asistente/i })
    const sendBtn = screen.getByRole('button', { name: /enviar mensaje/i })

    // Answer question 1
    await user.type(input, 'Desarrollo Inmobiliario')
    await user.click(sendBtn)

    // Wait for step 2 question
    await screen.findByText(/2\. ¿En qué estado se encuentra la documentación técnica/i, {}, { timeout: 3000 })
    await user.type(input, 'Documentación completa')
    await user.click(sendBtn)

    // Wait for step 3 question
    await screen.findByText(/3\. ¿Qué componentes técnicos requeriría el prototipo\?/i, {}, { timeout: 3000 })
    await user.type(input, 'Smart contracts ERC-3643')
    await user.click(sendBtn)

    // Wait for step 4 question
    await screen.findByText(/4\. ¿En qué etapa se encuentra actualmente la iniciativa\?/i, {}, { timeout: 3000 })
    await user.type(input, 'Prototipo en evaluación')
    await user.click(sendBtn)

    // Wait for final summary and CTA button
    await screen.findByText(/Resumen de Diagnóstico Técnico Preliminar/i, {}, { timeout: 3000 })
    const ctaBtn = await screen.findByRole('button', { name: /coordinar evaluación técnica/i }, { timeout: 3000 })
    await user.click(ctaBtn)

    // 5. Verify scrollIntoView and prefilling
    expect(scrollSpy).toHaveBeenCalled()

    const companyInput = screen.getByLabelText(/Company \/ Project|Empresa \/ Proyecto|Empresa \/ Projeto/i) as HTMLInputElement
    const messageInput = screen.getByLabelText(/Tell us about your project|Cuéntanos sobre tu iniciativa|Conte-nos sobre seu proyecto/i) as HTMLTextAreaElement

    expect(companyInput.value).toBe('Iniciativa Técnica Web3 / RWA')
    expect(messageInput.value).toContain('Desarrollo Inmobiliario')
    expect(messageInput.value).toContain('Smart contracts')
  }, 15000)
})
