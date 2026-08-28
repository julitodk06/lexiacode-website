"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Building2 } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function ContactSection() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" })
  const [selectedAsset, setSelectedAsset] = useState("")
  const [openedClient, setOpenedClient] = useState(false)

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

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    const assetLabel = selectedAsset ? (currentAssetsList.find((opt) => opt.key === selectedAsset)?.label || selectedAsset) : "No especificado"
    const subject = encodeURIComponent(`Consulta técnica - ${formData.company || formData.name || "LexiaCode"}`)
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmail: ${formData.email}\nOrganización/Iniciativa: ${formData.company}\nTipo de Activo/Proceso: ${assetLabel}\n\nConsulta o requerimiento:\n${formData.message}`
    )
    window.location.href = `mailto:juliov@lexiacode.com?subject=${subject}&body=${body}`
    setOpenedClient(true)
  }

  const handleWhatsApp = () => {
    const assetLabel = selectedAsset ? (currentAssetsList.find((opt) => opt.key === selectedAsset)?.label || selectedAsset) : "No especificado"
    const text = encodeURIComponent(
      `Hola Julio, te contacto desde la web de LexiaCode.\nNombre: ${formData.name || "No especificado"}\nEmail: ${formData.email || "No especificado"}\nOrganización: ${formData.company || "No especificada"}\nActivo/Interés: ${assetLabel}\nConsulta: ${formData.message || "Quisiera coordinar una evaluación técnica."}`
    )
    window.open(`https://wa.me/5493815400016?text=${text}`, "_blank")
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
                <span>Atención técnica directa por Julio Antonio Villalobo</span>
              </div>
            </div>

            {/* What to expect */}
            <div className="mt-10 rounded-xl border border-border/30 bg-secondary/20 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Metodología de contacto</p>
              <div className="space-y-2.5">
                {[
                  "Recepción directa de requerimientos técnicos en bandeja de entrada",
                  "Coordinación de llamada de evaluación técnica y alcance",
                  "Elaboración de propuesta preliminar de desarrollo e hitos",
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
            <form onSubmit={handleSendEmail} className="space-y-5">
              <div>
                <p className="mb-3 text-sm font-medium text-foreground">{language === "en" ? "Type of Asset / Scope:" : language === "pt" ? "Tipo de Ativo / Escopo:" : "Tipo de activo o proceso:"}</p>
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
                  placeholder="Ej. Nombre de empresa / Iniciativa"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="border-border/40 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">{t.contact.messagePlaceholder}</label>
                <Textarea
                  required
                  placeholder="Describe brevemente tu objetivo, iniciativa o requerimiento técnico..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="border-border/40 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 resize-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2 pt-2">
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 cursor-pointer text-xs uppercase tracking-wider font-semibold"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {language === "en" ? "Send via Email" : language === "pt" ? "Enviar por Email" : "Enviar por Email"}
                </Button>
                <Button
                  type="button"
                  onClick={handleWhatsApp}
                  variant="outline"
                  className="w-full border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 shadow-sm transition-all cursor-pointer text-xs uppercase tracking-wider font-semibold"
                >
                  <svg className="mr-2 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z" /></svg>
                  {language === "en" ? "Open WhatsApp" : language === "pt" ? "Abrir WhatsApp" : "Contactar por WhatsApp"}
                </Button>
              </div>

              {openedClient && (
                <div className="p-3.5 rounded-xl border border-primary/30 bg-primary/5 text-xs text-muted-foreground leading-relaxed animate-fadeIn">
                  <p className="font-semibold text-primary mb-1">Información de envío:</p>
                  Se abrió tu aplicación de correo para completar el envío a <strong className="text-foreground">juliov@lexiacode.com</strong> con los datos cargados. Si no se abrió automáticamente, puedes escribirnos directamente a esa dirección o contactarnos vía WhatsApp.
                </div>
              )}

              <p className="text-center text-xs text-muted-foreground/60">
                Al contactar a LexiaCode, aceptas nuestra Política de Privacidad y Términos de Servicio.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

