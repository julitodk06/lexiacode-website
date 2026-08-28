"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle2, Mail, Building2, Calendar, Video, Clock, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useTheme } from "next-themes"

export function ContactSection() {
  const { t, language } = useLanguage()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<"message" | "meeting">("message")
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" })
  const [selectedAsset, setSelectedAsset] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const assetTypes = {
    en: [
      { key: "real-estate", label: "Real Estate" },
      { key: "energy", label: "Energy / Infra" },
      { key: "funds", label: "Funds / LP Shares" },
      { key: "debt", label: "Debt / Financials" },
      { key: "other", label: "Other" }
    ],
    es: [
      { key: "real-estate", label: "Real Estate" },
      { key: "energy", label: "Energía / Infra" },
      { key: "funds", label: "Fondos / Participaciones" },
      { key: "debt", label: "Deuda / Financiero" },
      { key: "other", label: "Otro" }
    ],
    pt: [
      { key: "real-estate", label: "Real Estate" },
      { key: "energy", label: "Energia / Infra" },
      { key: "funds", label: "Fundos / Participações" },
      { key: "debt", label: "Dívida / Financeiro" },
      { key: "other", label: "Outro" }
    ]
  }

  const currentAssetsList = assetTypes[language] || assetTypes.es

  // Configuración de textos locales para multi-idioma (ES, EN, PT)
  const tabTranslations = {
    en: {
      tabMessage: "Send Message",
      tabMeeting: "Schedule Call",
      meetTitle: "Agendá tu Demo (Google Meet)",
      meetSubtitle: "Book a 15-minute discovery call directly with our engineering and legal team to analyze your project.",
      meetBtn: "Schedule Meeting via Google Meet",
      meetInfo: "A Google Meet calendar invite will be automatically generated and sent to your email.",
      interestLabel: "Type of Asset:",
      benefits: [
        "15-Minute Technical Discovery",
        "Direct Google Meet Auto-Invite",
        "Instant Email Confirmation"
      ]
    },
    es: {
      tabMessage: "Enviar Mensaje",
      tabMeeting: "Agendar Reunión",
      meetTitle: "Agendá tu Demo (Google Meet)",
      meetSubtitle: "Reserva una sesión estratégica de 15 minutos directamente con nuestro equipo técnico y legal para analizar tu proyecto.",
      meetBtn: "Agendar Reunión vía Google Meet",
      meetInfo: "Se generará automáticamente un enlace de Google Meet y se enviará una invitación de calendario a tu correo.",
      interestLabel: "Tipo de activo:",
      benefits: [
        "Sesión técnica y estratégica de 15 min",
        "Invitación automática con Google Meet",
        "Confirmación y recordatorio por email"
      ]
    },
    pt: {
      tabMessage: "Enviar Mensagem",
      tabMeeting: "Agendar Reunião",
      meetTitle: "Agendar sua Demo (Google Meet)",
      meetSubtitle: "Reserve uma sessão estratégica de 15 minutos diretamente com nossa equipe técnica e jurídica para analisar seu projeto.",
      meetBtn: "Agendar Reunião via Google Meet",
      meetInfo: "Um link do Google Meet será gerado automaticamente e um convite de calendário será enviado para seu e-mail.",
      interestLabel: "Tipo de ativo:",
      benefits: [
        "Sessão técnica e estratégica de 15 min",
        "Convite automático com Google Meet",
        "Confirmação e lembrete por e-mail"
      ]
    }
  }

  const currentTabT = tabTranslations[language] || tabTranslations.es

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/send-email.php', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Nombre: formData.name,
          Email: formData.email,
          Empresa: formData.company,
          Activo: selectedAsset ? (currentAssetsList.find((opt) => opt.key === selectedAsset)?.label || selectedAsset) : "No especificado",
          Mensaje: formData.message
        })
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setSubmitted(true)
      }
    } catch (err) {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-transparent pointer-events-none" />
      <div className="absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">

          {/* Left — Text */}
          <div className="lg:sticky lg:top-28">
            <p className="font-mono text-sm font-semibold uppercase tracking-widest text-accent">
              {t.contact.label}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.contact.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {t.contact.subtitle}
            </p>

            {/* Contact info */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-secondary/50">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span>juliov@lexiacode.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
                </div>
                <a href="https://wa.me/5493815400016" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">
                  +54 381 540 0016
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/40 bg-secondary/50">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <span>Consultas corporativas recibidas · Respuesta en 24h</span>
              </div>
            </div>

            {/* What to expect */}
            <div className="mt-10 rounded-xl border border-border/30 bg-secondary/20 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">¿Qué sucede después?</p>
              <div className="space-y-2.5">
                {[
                  "Revisamos tu consulta en menos de 24 horas",
                  "Agendamos una llamada de diagnóstico con nuestro equipo",
                  "Recibes una propuesta técnica o informe preliminar de alcance",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[9px] font-bold text-primary mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div className="rounded-2xl border border-border/40 bg-card/30 p-8 backdrop-blur-sm shadow-xl shadow-black/10 flex flex-col gap-6">

            {/* TAB 1: MESSAGE FORM */}
            {activeTab === "message" && (
              submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                    <CheckCircle2 className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{t.contact.successTitle}</h3>
                  <p className="text-muted-foreground">{t.contact.successMessage}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", company: "", message: "" }); setSelectedAsset("") }}
                    className="mt-2 border-border/50"
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <p className="mb-3 text-sm font-medium text-foreground">{currentTabT.interestLabel}</p>
                    <div className="flex flex-wrap gap-2">
                      {currentAssetsList.map((opt) => (
                        <button
                          type="button"
                          key={opt.key}
                          onClick={() => setSelectedAsset(opt.key)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-medium border transition-all ${
                            selectedAsset === opt.key
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border/40 bg-secondary/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">{t.contact.namePlaceholder}</label>
                      <Input
                        required
                        placeholder="Ej. Carlos Mendoza"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="border-border/40 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-muted-foreground">{t.contact.emailPlaceholder}</label>
                      <Input
                        required
                        type="email"
                        placeholder="ejemplo@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-border/40 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t.contact.companyPlaceholder}</label>
                    <Input
                      placeholder="Ej. LexiaTech / Tokenización de Inmuebles"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="border-border/40 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-muted-foreground">{t.contact.messagePlaceholder}</label>
                    <Textarea
                      required
                      placeholder="Describe brevemente tu objetivo, proyecto o consulta técnica..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="border-border/40 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 disabled:opacity-60 transition-all hover:shadow-primary/40"
                  >
                    {loading ? "Sending..." : t.contact.submit}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-center text-xs text-muted-foreground/60">
                    Al enviar este formulario, aceptas nuestra Política de Privacidad y Términos de Servicio.
                  </p>
                </form>
              )
            )}

          </div>
        </div>
      </div>
    </section>
  )
}

