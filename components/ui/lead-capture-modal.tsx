"use client"

import { useState, useEffect } from "react"
import { X, User, Mail, Phone, ShieldCheck, Download, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react"

interface Project {
  title: string
  category: string
}

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

export function LeadCaptureModal({ isOpen, onClose, project }: LeadCaptureModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  
  // Estados de proceso de solicitud
  const [step, setStep] = useState<"form" | "loading" | "success">("form")
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState("")

  useEffect(() => {
    if (!isOpen) {
      setName("")
      setEmail("")
      setPhone("")
      setStep("form")
      setProgress(0)
      setProgressText("")
    }
  }, [isOpen])

  if (!isOpen || !project) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone) return

    setStep("loading")
    setProgress(20)
    setProgressText("Procesando solicitud de contacto...")

    const stages = [
      { prg: 60, txt: "Registrando consulta técnica..." },
      { prg: 100, txt: "Confirmando solicitud..." }
    ]

    let currentStage = 0
    const timer = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].prg)
        setProgressText(stages[currentStage].txt)
        currentStage++
      } else {
        clearInterval(timer)
        setStep("success")
      }
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
      {/* Glow decorativo de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-primary/10 blur-[80px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-accent/10 blur-[70px] rounded-full" />
      </div>

      <div className="relative w-full max-w-lg rounded-3xl border border-border/60 bg-background/95 p-6 shadow-2xl shadow-black/80 backdrop-blur-xl">
        {/* Header del Modal */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground leading-tight">Solicitud de Evaluación Técnica</h3>
              <p className="text-xs text-muted-foreground font-light">{project.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary/60 hover:text-foreground transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cuerpos según el Paso actual */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 p-4 rounded-2xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-normal font-light">
                Completá tus datos para coordinar una reunión de evaluación técnica sobre la viabilidad de este proyecto o iniciativa.
              </p>
            </div>

            {/* Inputs de Formulario con alta legibilidad */}
            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label htmlFor="name-input" className="text-xs font-bold text-foreground font-mono uppercase tracking-wider block">
                  Nombre Completo
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 h-4.5 w-4.5 text-muted-foreground" />
                  <input
                    id="name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-[#07080a] border border-border/40 hover:border-border/80 focus:border-primary rounded-xl py-3 pl-11 pr-4 text-sm text-foreground font-medium placeholder:text-muted-foreground/60 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email-input" className="text-xs font-bold text-foreground font-mono uppercase tracking-wider block">
                  Correo Electrónico
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 h-4.5 w-4.5 text-muted-foreground" />
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ej. juan.perez@email.com"
                    className="w-full bg-[#07080a] border border-border/40 hover:border-border/80 focus:border-primary rounded-xl py-3 pl-11 pr-4 text-sm text-foreground font-medium placeholder:text-muted-foreground/60 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone-input" className="text-xs font-bold text-foreground font-mono uppercase tracking-wider block">
                  Número de Teléfono / WhatsApp
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 h-4.5 w-4.5 text-muted-foreground" />
                  <input
                    id="phone-input"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. +54 381 540 0016"
                    className="w-full bg-[#07080a] border border-border/40 hover:border-border/80 focus:border-primary rounded-xl py-3 pl-11 pr-4 text-sm text-foreground font-medium placeholder:text-muted-foreground/60 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-[#e87722] text-white py-3.5 text-xs font-bold font-mono uppercase tracking-wider shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer"
            >
              <Mail className="h-4 w-4" /> Solicitar Reunión Técnica
            </button>
          </form>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-4 animate-fadeIn">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-primary/20 opacity-75"></span>
              <div className="relative h-14 w-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <RefreshCw className="h-6 w-6 animate-spin" />
              </div>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-foreground">{progressText}</h4>
              <p className="text-xs text-muted-foreground font-light">Procesando solicitud de contacto.</p>
            </div>
            <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-4 animate-fadeIn">
            <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-7 w-7 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-md font-bold text-emerald-400">¡Solicitud Recibida!</h4>
              <p className="text-xs text-muted-foreground font-light max-w-sm mx-auto">
                Hemos registrado tu consulta para evaluar el proyecto **{project.title}**. Nos pondremos en contacto al correo: <span className="text-primary font-semibold">{email}</span>.
              </p>
            </div>
            <div className="bg-[#07080a] border border-border/40 p-4 rounded-2xl w-full text-[11px] font-mono text-left space-y-1.5 leading-relaxed text-muted-foreground">
              <p className="text-foreground font-bold">Resumen de Contacto:</p>
              <p>• Contacto: <span className="text-foreground">{name}</span></p>
              <p>• Correo: <span className="text-foreground">{email}</span></p>
              <p>• Equipo: <span className="text-primary font-bold">LexiaCode Product &amp; Tech</span></p>
            </div>
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 text-primary py-3 text-xs font-bold font-mono uppercase cursor-pointer transition-all duration-300"
            >
              Entendido
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
