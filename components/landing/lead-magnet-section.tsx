"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, BookOpen, CheckCircle2, Download, Sparkles, Phone } from "lucide-react"
import { toast } from "sonner"

export function LeadMagnetSection() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState(0)
  const [submitStatusText, setSubmitStatusText] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setSubmitProgress(0)
    setSubmitStatusText("Validando dirección corporativa...")

    // Intervalo de simulación de carga institucional ultra-premium
    const interval = setInterval(() => {
      setSubmitProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 5
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsSubmitting(false)
            setIsSubmitted(true)
            toast.success("📧 ¡Acceso autorizado! Se ha enviado el enlace seguro a tu casilla.", {
              description: `Casilla registrada: ${email}`,
              duration: 5000,
            })
          }, 400)
          return 100
        }

        // Textos dinámicos basados en progreso
        if (next < 30) {
          setSubmitStatusText("Validando dirección corporativa...")
        } else if (next < 60) {
          setSubmitStatusText("Generando firma criptográfica de acceso...")
        } else if (next < 85) {
          setSubmitStatusText("Compilando reporte técnico institucional...")
        } else {
          setSubmitStatusText("Habilitando credenciales en el portal...")
        }

        return next
      })
    }, 150)
  }

  const handleGoToGuide = () => {
    toast.info("Redirigiendo al portal interactivo de LexiaCode...", { duration: 2000 })
    router.push("/guia-tokenizacion")
  }

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-background border-y border-border/30">
      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/3" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
        <div className="rounded-3xl border border-primary/20 bg-card/40 backdrop-blur-md overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Contenido (Izquierda) */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 w-max border border-primary/20">
                <BookOpen className="h-4 w-4" />
                <span>Recurso Gratuito VIP</span>
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4 leading-tight">
                Guía Técnica: Arquitectura y Modelado de Smart Contracts para RWA
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8">
                Un documento de referencia conceptual sobre arquitectura funcional, diseño de permisos con ERC-3643 y consideraciones de compliance-by-design para iniciativas de activos digitales.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Fundamentos de arquitectura técnica para representación digital de activos.",
                  "El estándar ERC-3643 como modelo de referencia para permisos on-chain.",
                  "Consideraciones técnicas para integración de APIs y pruebas de software."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Formulario / Estado de Envío */}
              {isSubmitted ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">¡Acceso de Lectura Autorizado!</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Hemos registrado tu correo y te enviamos las credenciales. Ya puedes ver y descargar la guía interactiva a continuación.
                  </p>
                  <Button 
                    onClick={handleGoToGuide}
                    size="lg" 
                    className="w-full sm:w-auto h-12 gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-102 transition-all cursor-pointer"
                  >
                    Abrir Guía Interactiva & PDF <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : isSubmitting ? (
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col items-center text-center animate-in fade-in duration-300">
                  <div className="w-full bg-secondary/40 rounded-full h-2 mb-4 overflow-hidden">
                    <div 
                      className="bg-primary h-full rounded-full transition-all duration-150 ease-out"
                      style={{ width: `${submitProgress}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                    {submitProgress}% COMPLETADO
                  </span>
                  <p className="text-sm font-medium text-foreground">{submitStatusText}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <Input 
                        type="email" 
                        placeholder="Tu correo corporativo *" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/70"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <Input 
                          type="tel" 
                          placeholder="Teléfono móvil (WhatsApp)" 
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          className="h-12 pl-10 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground/70"
                        />
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" size="lg" className="h-12 gap-2 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all cursor-pointer">
                    Descargar Guía y Obtener Acceso <Download className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
 
            {/* Imagen (Derecha) */}
            <div className="relative hidden lg:block bg-gradient-to-br from-primary/5 to-transparent border-l border-border/20 p-12">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
              <div className="relative h-full w-full flex items-center justify-center group perspective-1000">
                {/* Mockup del eBook/Guía */}
                <div className="relative w-64 h-80 rounded-xl overflow-hidden shadow-2xl transition-transform duration-700 ease-out group-hover:-rotate-y-12 group-hover:rotate-x-12 group-hover:scale-105 border border-white/10 bg-black cursor-pointer" onClick={() => router.push("/guia-tokenizacion")}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent z-10 opacity-60" />
                  <img src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=600&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Guia cover" />
                  <div className="relative z-20 h-full p-6 flex flex-col justify-between">
                    <div className="text-[10px] font-bold tracking-widest uppercase text-primary/80">LexiaCode Report</div>
                    <div className="mt-8">
                      <h3 className="text-2xl font-bold text-white leading-tight mb-2">Tokenización RWA en 2026</h3>
                      <div className="text-xs text-white/60">Marco legal y técnico institucional.</div>
                    </div>
                    <div className="inline-flex items-center gap-1 text-[10px] text-primary font-semibold hover:underline">
                      Ver contenido interactivo <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
