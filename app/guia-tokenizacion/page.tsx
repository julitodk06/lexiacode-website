"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { 
  ArrowLeft, BookOpen, CheckCircle2, Download, Printer, 
  Scale, Cpu, ShieldAlert, Network, ChevronRight, 
  FileText, Calendar, User, ExternalLink, MessageSquare, Send,
  Sun, Moon
} from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

// Capítulos de la guía
const CAPITULOS = [
  { id: "cap1", label: "1. Introducción a RWA" },
  { id: "cap2", label: "2. Consideraciones Regulatorias" },
  { id: "cap3", label: "3. El Estándar ERC-3643" },
  { id: "cap4", label: "4. Arquitectura y Smart Contracts" },
  { id: "cap5", label: "5. Permisos y Validación On-Chain" },
]

export default function GuiaTokenizacionPage() {
  const [activeSection, setActiveSection] = useState("cap1")
  const [readingProgress, setReadingProgress] = useState(0)
  const [isSubmittingCTA, setIsSubmittingCTA] = useState(false)
  const [ctaData, setCtaData] = useState({ nombre: "", email: "", telefono: "", mensaje: "" })
  const [ctaSubmitted, setCtaSubmitted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Manejo de scroll para actualizar la sección activa e indicador de progreso
  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      
      // Barra de progreso de lectura
      const totalScroll = docHeight - windowHeight
      const currentProgress = totalScroll > 0 ? (scrollPosition / totalScroll) * 100 : 0
      setReadingProgress(currentProgress)

      // Identificar sección activa
      for (const cap of CAPITULOS) {
        const element = document.getElementById(cap.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Si el elemento está en la parte superior/mitad de la pantalla
          if (rect.top <= 200 && rect.bottom >= 150) {
            setActiveSection(cap.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Desplazamiento suave a una sección
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Ajuste para el header pegajoso
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      setActiveSection(id)
    }
  }

  // Simular la impresión premium
  const handlePrint = () => {
    window.print()
  }

  // Envío del CTA de Consultoría al final de la lectura
  const handleCtaSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!ctaData.nombre || !ctaData.email) {
      toast.error("Por favor completa los campos requeridos.")
      return
    }

    setIsSubmittingCTA(true)
    setTimeout(() => {
      setIsSubmittingCTA(false)
      setCtaSubmitted(true)
      toast.success("¡Solicitud enviada! Nos pondremos en contacto a la brevedad para coordinar una evaluación técnica.")
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground antialiased font-sans">
      
      {/* Barra de Progreso de Lectura Flotante - Oculta en Impresión */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border/20 z-50 print:hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary via-amber-500 to-primary transition-all duration-150 ease-out" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header del Reporte - Oculto en Impresión */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/40 z-40 py-4 print:hidden transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Volver a LexiaCode</span>
          </Link>
          
          <div className="flex items-center gap-3">
            {/* Selector de tema */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="inline-flex items-center justify-center bg-secondary/80 hover:bg-secondary border border-border/50 text-foreground h-9 w-9 rounded-xl transition-all hover:scale-102 cursor-pointer shadow-sm"
                title={theme === "dark" ? "Cambiar a modo claro (blanco)" : "Cambiar a modo oscuro (negro)"}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4 text-amber-500" />
                )}
              </button>
            )}

            <button 
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-secondary/80 hover:bg-secondary border border-border/50 text-foreground px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-102 cursor-pointer shadow-sm"
              title="Guardar como PDF o Imprimir reporte"
            >
              <Printer className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">Imprimir / PDF</span>
            </button>
            <a
              href="#cta-consultoria"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl text-xs font-semibold shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all hover:scale-102"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Consulta Técnica</span>
            </a>
          </div>
        </div>
      </header>

      {/* PORTADA DE LA GUÍA (Hero Section de Lectura) */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-primary/5 via-transparent to-background border-b border-border/20 print:border-none print:bg-none print:py-6">
        <div className="absolute inset-0 pointer-events-none print:hidden">
          <div className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-primary/10 blur-[130px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 print:text-left print:px-0">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-6 border border-primary/20 print:border-none print:bg-none print:text-black print:p-0">
            <BookOpen className="h-3.5 w-3.5 print:hidden" />
            <span>DOCUMENTO TÉCNICO DE REFERENCIA</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6 print:text-black print:text-4xl print:leading-tight">
            Guía de Arquitectura para Tokenización de Activos (RWA)
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed print:text-gray-700 print:text-base print:mx-0 print:mb-6">
            Principios de arquitectura funcional, desarrollo de smart contracts bajo el estándar ERC-3643 y consideraciones de compliance-by-design para iniciativas de activos digitales.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground border-y border-border/30 py-4 max-w-2xl mx-auto print:border-gray-200 print:text-gray-600 print:justify-start print:mx-0 print:py-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>Publicación Técnica</span>
            </span>
            <span className="hidden sm:inline text-border/60">•</span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>Ingeniería y Producto: LexiaCode</span>
            </span>
            <span className="hidden sm:inline text-border/60">•</span>
            <span className="flex items-center gap-1.5">
              <Scale className="h-4 w-4" />
              <span>Estándar ERC-3643</span>
            </span>
          </div>
        </div>
      </section>

      {/* ESTRUCTURA PRINCIPAL DE LECTURA */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 print:py-4 print:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Navegación de Capítulos Lateral (Sticky) - Oculto en Impresión */}
          <aside className="lg:col-span-3 hidden lg:block sticky top-28 h-max print:hidden">
            <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Contenido de la Guía</h3>
              <nav className="space-y-1">
                {CAPITULOS.map((cap) => (
                  <button
                    key={cap.id}
                    onClick={() => scrollToSection(cap.id)}
                    className={`w-full text-left flex items-center justify-between py-2.5 px-3 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                      activeSection === cap.id
                        ? "bg-primary/10 text-primary border-l-2 border-primary pl-4"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 pl-3"
                    }`}
                  >
                    <span>{cap.label}</span>
                    <ChevronRight className={`h-3 w-3 transition-transform ${
                      activeSection === cap.id ? "translate-x-0 opacity-100" : "translate-x-[-4px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    }`} />
                  </button>
                ))}
              </nav>

              <hr className="my-6 border-border/40" />

              <div className="bg-gradient-to-br from-primary/5 to-amber-500/5 rounded-xl border border-primary/20 p-4">
                <h4 className="text-xs font-bold text-foreground mb-1">¿Dudas de arquitectura?</h4>
                <p className="text-[11px] text-muted-foreground mb-3 leading-normal">
                  Diseñamos especificaciones funcionales y smart contracts para tu iniciativa.
                </p>
                <a 
                  href="#cta-consultoria" 
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  Consulta técnica <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </aside>

          {/* CONTENIDO TÉCNICO COMPLETO */}
          <main className="lg:col-span-9 space-y-16 print:space-y-12">
            
            {/* CAPÍTULO 1 */}
            <article id="cap1" className="scroll-mt-28 border-b border-border/20 pb-16 print:border-gray-200 print:pb-10 page-break-after">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary print:text-black print:bg-none print:h-auto print:w-auto">
                  <Network className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold tracking-widest text-primary uppercase print:text-black">Capítulo 1</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 print:text-black">
                Conceptos Fundamentales de Activos del Mundo Real (RWA)
              </h2>

              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4 print:text-gray-800 print:prose-neutral text-sm leading-relaxed">
                <p>
                  La representación digital de **Activos del Mundo Real (Real World Assets - RWA)** consiste en modelar derechos operativos, inventarios o participaciones en una red distribuida (Blockchain) mediante contratos inteligentes que gestionan reglas de acceso, estados y eventos auditables.
                </p>
                
                <p>
                  Desde una perspectiva de ingeniería de software y arquitectura funcional, este enfoque aporta:
                </p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 list-none pl-0 print:grid-cols-1">
                  <li className="bg-card/40 border border-border/40 p-4 rounded-xl flex items-start gap-3 print:bg-gray-50 print:border-gray-200">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground print:text-black text-xs block mb-1">Fraccionamiento y Modularidad</strong>
                      <span>Representación granular de unidades lógicas en smart contracts para seguimiento preciso de participaciones.</span>
                    </div>
                  </li>
                  <li className="bg-card/40 border border-border/40 p-4 rounded-xl flex items-start gap-3 print:bg-gray-50 print:border-gray-200">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground print:text-black text-xs block mb-1">Estandarización de Interfaces</strong>
                      <span>Interoperabilidad técnica con billeteras, indexadores y aplicaciones web compatibles con el estándar EVM.</span>
                    </div>
                  </li>
                  <li className="bg-card/40 border border-border/40 p-4 rounded-xl flex items-start gap-3 print:bg-gray-50 print:border-gray-200">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground print:text-black text-xs block mb-1">Automatización de Lógica de Negocio</strong>
                      <span>Ejecución determinista de validaciones de reglas de asignación y transferencia definidas en código Solidity.</span>
                    </div>
                  </li>
                  <li className="bg-card/40 border border-border/40 p-4 rounded-xl flex items-start gap-3 print:bg-gray-50 print:border-gray-200">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground print:text-black text-xs block mb-1">Trazabilidad y Auditoría On-Chain</strong>
                      <span>Registro inmutable de transacciones y estados que facilita la verificación técnica externa de eventos.</span>
                    </div>
                  </li>
                </ul>

                <h3 className="text-lg font-bold text-foreground mt-8 mb-4 print:text-black">
                  Tabla Comparativa: Registros Centralizados Tradicionales vs. Registros On-Chain
                </h3>

                <div className="overflow-x-auto rounded-xl border border-border/40 my-6 print:border-gray-200">
                  <table className="min-w-full divide-y divide-border/40 print:divide-gray-200 text-left text-xs">
                    <thead className="bg-muted/50 print:bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 font-semibold text-foreground print:text-black">Variable</th>
                        <th className="px-4 py-3 font-semibold text-foreground print:text-black">Registro Tradicional</th>
                        <th className="px-4 py-3 font-semibold text-primary print:text-black">Registro en Smart Contracts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20 print:divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-medium text-foreground print:text-black">Granularidad de Unidades</td>
                        <td className="px-4 py-3">Rígida y sujeta a procesamiento manual</td>
                        <td className="px-4 py-3 font-medium text-primary print:text-black">Configurable por decimales en el contrato</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-foreground print:text-black">Verificación de Transferencias</td>
                        <td className="px-4 py-3">Validación manual diferida</td>
                        <td className="px-4 py-3 font-medium text-primary print:text-black">Validación lógica determinista por código</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-foreground print:text-black">Auditoría Operativa</td>
                        <td className="px-4 py-3">Revisión periódica de logs internos</td>
                        <td className="px-4 py-3 font-medium text-primary print:text-black">Registro público o permisionado de eventos</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-medium text-foreground print:text-black">Interoperabilidad</td>
                        <td className="px-4 py-3">Silos de datos cerrados</td>
                        <td className="px-4 py-3 font-medium text-primary print:text-black">Interfaces estándar (ERC-3643 / EVM)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            {/* CAPÍTULO 2 */}
            <article id="cap2" className="scroll-mt-28 border-b border-border/20 pb-16 print:border-gray-200 print:pb-10 page-break-after">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary print:text-black print:bg-none print:h-auto print:w-auto">
                  <Scale className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold tracking-widest text-primary uppercase print:text-black">Capítulo 2</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 print:text-black">
                Consideraciones Regulatorias y Compliance-by-Design
              </h2>

              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4 print:text-gray-800 print:prose-neutral text-sm leading-relaxed">
                <p>
                  En distintas jurisdicciones de Latinoamérica y a nivel internacional, los entes reguladores de valores y unidades de información financiera establecen requisitos para activos virtuales y representaciones digitales. Diseñar software para este sector exige incorporar **principios de compliance-by-design** desde la etapa de arquitectura.
                </p>

                <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200/90 p-4 rounded-xl my-6 flex gap-3 print:bg-yellow-50 print:border-yellow-200 print:text-yellow-900 text-xs">
                  <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0" />
                  <div>
                    <strong className="block font-bold mb-1">Aviso Técnico-Institucional:</strong>
                    La arquitectura de smart contracts debe responder a los dictámenes y estructuras fijadas por profesionales legales habilitados en cada jurisdicción. La tecnología actúa como capa de ejecución de reglas predefinidas y no reemplaza el asesoramiento jurídico, tributario ni financiero.
                  </div>
                </div>

                <p>
                  Cuando un activo o derecho cuenta con restricciones de transferencia, la arquitectura técnica debe modelar listas de control de acceso, verificación de roles administrativos y registros de permisos on-chain para asegurar que los contratos inteligentes únicamente procesen transacciones autorizadas por las reglas del proyecto.
                </p>
              </div>
            </article>

            {/* CAPÍTULO 3 */}
            <article id="cap3" className="scroll-mt-28 border-b border-border/20 pb-16 print:border-gray-200 print:pb-10 page-break-after">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary print:text-black print:bg-none print:h-auto print:w-auto">
                  <Cpu className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold tracking-widest text-primary uppercase print:text-black">Capítulo 3</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 print:text-black">
                El Estándar ERC-3643 (Tokens con Permisos)
              </h2>

              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4 print:text-gray-800 print:prose-neutral text-sm leading-relaxed">
                <p>
                  A diferencia de los tokens libres basados en **ERC-20**, donde las transferencias no verifican identidades previas, el estándar abierto **ERC-3643** (también conocido como *T-REX*) provee una arquitectura modular para tokens con control de permisos.
                </p>

                <h4 className="text-foreground print:text-black font-bold text-sm mt-6 mb-2">Funcionamiento Técnico del ERC-3643</h4>
                <p>
                  El ERC-3643 desacopla la lógica de transferencia de la capa de verificación de identidad. En cada llamada a `transfer` o `transferFrom`, el contrato consulta a un **Identity Registry** (registro de identidades on-chain) para verificar si las direcciones de origen y destino poseen las credenciales o atributos requeridos. Si la condición no se cumple, el contrato revierte la transacción.
                </p>

                {/* DIAGRAMA INTERACTIVO SVG DEL FLUJO DEL ERC-3643 */}
                <div className="my-8 p-6 bg-card/20 rounded-2xl border border-border/40 print:border-gray-200 print:bg-white">
                  <h4 className="text-xs font-bold text-foreground text-center mb-4 uppercase tracking-wider print:text-black">
                    Diagrama de Flujo Técnico: Validación On-Chain en ERC-3643
                  </h4>
                  
                  <div className="w-full flex justify-center items-center">
                    <svg viewBox="0 0 800 350" className="w-full max-w-2xl h-auto text-foreground print:text-black" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="primary-grad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="var(--color-primary, #d97706)" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary, #d97706)" />
                        </marker>
                        <marker id="arrow-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                        </marker>
                      </defs>

                      {/* Actor: Cuenta Origen */}
                      <g className="cursor-pointer">
                        <rect x="20" y="80" width="120" height="60" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                        <text x="80" y="110" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Cuenta A</text>
                        <text x="80" y="125" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="10">(Remitente)</text>
                      </g>

                      {/* Actor: Cuenta Destino */}
                      <g className="cursor-pointer">
                        <rect x="20" y="210" width="120" height="60" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1.5" />
                        <text x="80" y="240" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Cuenta B</text>
                        <text x="80" y="255" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="10">(Receptor)</text>
                      </g>

                      {/* Flecha de Intento de Transferencia */}
                      <path d="M 140 110 L 260 110" stroke="var(--color-primary, #d97706)" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 4" className="animate-[dash_2s_linear_infinite]" />
                      <text x="200" y="100" textAnchor="middle" fill="var(--color-primary, #d97706)" fontSize="10" fontWeight="bold">1. transfer()</text>

                      {/* Smart Contract ERC-3643 */}
                      <g className="cursor-pointer">
                        <rect x="280" y="50" width="220" height="100" rx="12" fill="currentColor" fillOpacity="0.08" stroke="var(--color-primary, #d97706)" strokeWidth="2.5" />
                        <text x="390" y="80" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="bold">Smart Contract Token</text>
                        <text x="390" y="98" textAnchor="middle" fill="var(--color-primary, #d97706)" fontSize="11" fontWeight="bold">(Estándar ERC-3643)</text>
                        <text x="390" y="125" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9">Ejecuta validación de permisos</text>
                      </g>

                      {/* Consulta al Validador de Identidad */}
                      <path d="M 390 150 L 390 200" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#arrow)" />
                      <text x="440" y="180" textAnchor="middle" fill="#f59e0b" fontSize="9">2. Validar Atributos</text>

                      {/* Registro de Identidad ONCHAINID */}
                      <g className="cursor-pointer">
                        <rect x="280" y="210" width="220" height="90" rx="12" fill="currentColor" fillOpacity="0.05" stroke="#10b981" strokeWidth="2" />
                        <text x="390" y="240" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">Identity Registry</text>
                        <text x="390" y="258" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">(Lista de Cuentas Autorizadas)</text>
                        <text x="390" y="280" textAnchor="middle" fill="currentColor" fillOpacity="0.6" fontSize="9">¿Tiene permisos válidos?</text>
                      </g>

                      {/* Flecha de Respuesta ONCHAINID */}
                      <path d="M 360 210 L 360 150" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrow-green)" />
                      <text x="320" y="180" textAnchor="middle" fill="#10b981" fontSize="9">3. Permitido / Denegado</text>

                      {/* Destino (Éxito) */}
                      <g className="cursor-pointer">
                        <rect x="630" y="145" width="130" height="70" rx="10" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="1.5" />
                        <text x="695" y="175" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">Transferencia</text>
                        <text x="695" y="192" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Completada</text>
                      </g>

                      {/* Flecha de Salida Exitosa */}
                      <path d="M 500 100 L 630 170" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow-green)" />
                      <text x="560" y="125" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">4. Ejecución si es Válido</text>
                    </svg>
                  </div>
                  <p className="text-[11px] text-muted-foreground text-center mt-4 leading-normal max-w-lg mx-auto print:text-gray-500">
                    *El contrato inteligente valida la condición de cumplimiento en cada operación. La transferencia sólo se registra si el registro de identidad devuelve un estado afirmativo.*
                  </p>
                </div>
              </div>
            </article>

            {/* CAPÍTULO 4 */}
            <article id="cap4" className="scroll-mt-28 border-b border-border/20 pb-16 print:border-gray-200 print:pb-10 page-break-after">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary print:text-black print:bg-none print:h-auto print:w-auto">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold tracking-widest text-primary uppercase print:text-black">Capítulo 4</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 print:text-black">
                Fases de Desarrollo Técnico y Arquitectura
              </h2>

              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4 print:text-gray-800 print:prose-neutral text-sm leading-relaxed">
                <p>
                  El ciclo de ingeniería de software para proyectos de representación digital se estructura en etapas metodológicas:
                </p>

                <ol className="space-y-6 my-6 list-none pl-0">
                  <li className="relative pl-12">
                    <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary print:border-gray-300 print:text-black">1</div>
                    <strong className="text-foreground print:text-black font-bold block mb-1">Ingeniería de Requerimientos y Modelado Funcional</strong>
                    <p className="text-xs">
                      Se definen los roles de usuario, permisos y reglas condicionales en coordinación con los asesores legales del proyecto, traduciendo los requerimientos normativos a especificaciones técnicas claras.
                    </p>
                  </li>
                  
                  <li className="relative pl-12">
                    <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary print:border-gray-300 print:text-black">2</div>
                    <strong className="text-foreground print:text-black font-bold block mb-1">Desarrollo y Testing en Solidity</strong>
                    <p className="text-xs">
                      Implementación de contratos inteligentes basados en estándares abiertos. Desarrollo de suites de pruebas unitarias y de integración con Hardhat y Foundry para verificar la lógica de permisos y optimizar el consumo de gas.
                    </p>
                  </li>

                  <li className="relative pl-12">
                    <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary print:border-gray-300 print:text-black">3</div>
                    <strong className="text-foreground print:text-black font-bold block mb-1">Integración de Interfaces y APIs</strong>
                    <p className="text-xs">
                      Desarrollo de paneles de administración y conexión frontend mediante bibliotecas web3 (ethers.js, viem) para la consulta transparente de eventos y estados on-chain.
                    </p>
                  </li>

                  <li className="relative pl-12">
                    <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-bold text-xs text-primary print:border-gray-300 print:text-black">4</div>
                    <strong className="text-foreground print:text-black font-bold block mb-1">Despliegue en Redes de Prueba y Entrega Técnica</strong>
                    <p className="text-xs">
                      Despliegue controlado en testnets, verificación del código fuente en exploradores de bloques y entrega de documentación técnica completa para auditorías externas.
                    </p>
                  </li>
                </ol>
              </div>
            </article>

            {/* CAPÍTULO 5 */}
            <article id="cap5" className="scroll-mt-28 border-b border-border/20 pb-16 print:border-gray-200 print:pb-10 page-break-after">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary print:text-black print:bg-none print:h-auto print:w-auto">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold tracking-widest text-primary uppercase print:text-black">Capítulo 5</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 print:text-black">
                Validación de Permisos y Control de Transferencias
              </h2>

              <div className="prose prose-invert max-w-none text-muted-foreground space-y-4 print:text-gray-800 print:prose-neutral text-sm leading-relaxed">
                <p>
                  El principal valor técnico de utilizar estándares de tokens con permisos es asegurar que cada transacción entre cuentas respete las condiciones de elegibilidad programadas.
                </p>

                <div className="bg-card/40 border border-border/40 p-6 rounded-2xl my-6 space-y-4 print:bg-gray-50 print:border-gray-200 print:text-black">
                  <h4 className="text-foreground font-bold text-xs uppercase tracking-wider print:text-black flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Mecanismo de Verificación en Smart Contracts
                  </h4>
                  <p className="text-xs">
                    Cuando se inicia una operación de transferencia entre dos direcciones:
                  </p>
                  <ul className="list-disc pl-5 text-xs space-y-2">
                    <li>El Smart Contract valida que la dirección de destino esté registrada en el Identity Registry correspondiente.</li>
                    <li>Verifica que los atributos de la cuenta sigan vigentes según los parámetros configurados.</li>
                    <li>Si la cuenta receptora cumple con las condiciones, la transferencia se ejecuta de forma determinista.</li>
                    <li>Si la validación resulta negativa, la transacción revierte a nivel de EVM sin alterar los saldos.</li>
                  </ul>
                </div>

                <p className="font-semibold text-foreground print:text-black">
                  Conclusión:
                </p>
                <p>
                  La tokenización institucional de activos requiere una clara separación de responsabilidades: un encuadre legal formal provisto por abogados especialistas y una arquitectura de smart contracts testeada y modular que modele con precisión los requerimientos funcionales del proyecto.
                </p>
              </div>
            </article>

            {/* CALL TO ACTION FINAL: CONSULTA TÉCNICA (Oculto en Impresión) */}
            <article id="cta-consultoria" className="scroll-mt-28 bg-gradient-to-br from-primary/10 via-amber-500/5 to-transparent border border-primary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl print:hidden animate-in fade-in duration-1000">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
              
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary mb-4 border border-primary/30">
                  <User className="h-3.5 w-3.5" />
                  <span>CONSULTA TÉCNICA DE PRODUCTO</span>
                </span>
                
                <h3 className="text-3xl font-extrabold text-foreground mb-4">
                  Evoluciona tu Arquitectura de Software
                </h3>
                
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                  ¿Tienes una iniciativa de activos digitales, smart contracts o integración con IA? Agenda una sesión técnica preliminar con nuestro equipo de ingeniería y producto.
                </p>

                {ctaSubmitted ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center animate-in fade-in zoom-in duration-500">
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-1">¡Consulta Solicitada!</h4>
                    <p className="text-xs text-muted-foreground">Nos pondremos en contacto a la brevedad para coordinar la evaluación técnica.</p>
                  </div>
                ) : (
                  <form onSubmit={handleCtaSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-foreground/80 mb-1">Nombre Completo *</label>
                        <input 
                          type="text" 
                          placeholder="Ej. Juan Pérez" 
                          required
                          value={ctaData.nombre}
                          onChange={(e) => setCtaData({ ...ctaData, nombre: e.target.value })}
                          className="w-full h-11 bg-background/60 border border-border/50 rounded-xl px-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-foreground/80 mb-1">Correo Corporativo *</label>
                        <input 
                          type="email" 
                          placeholder="Ej. juan@empresa.com" 
                          required
                          value={ctaData.email}
                          onChange={(e) => setCtaData({ ...ctaData, email: e.target.value })}
                          className="w-full h-11 bg-background/60 border border-border/50 rounded-xl px-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-foreground/80 mb-1">Teléfono Móvil (Opcional)</label>
                        <input 
                          type="tel" 
                          placeholder="Ej. +54 381 540 0016" 
                          value={ctaData.telefono}
                          onChange={(e) => setCtaData({ ...ctaData, telefono: e.target.value })}
                          className="w-full h-11 bg-background/60 border border-border/50 rounded-xl px-4 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-foreground/80 mb-1">Tipo de Requerimiento Técnico</label>
                        <select 
                          className="w-full h-11 bg-background/60 border border-border/50 rounded-xl px-4 text-xs text-foreground focus:border-primary/80 focus:ring-1 focus:ring-primary/80 transition-all outline-none"
                          onChange={(e) => setCtaData({ ...ctaData, mensaje: `Requerimiento: ${e.target.value}` })}
                        >
                          <option value="smart-contracts">Smart Contracts & Solidity</option>
                          <option value="arquitectura-rwa">Arquitectura Funcional RWA</option>
                          <option value="agentes-ia">Agentes IA & Automatización</option>
                          <option value="full-stack">Desarrollo Web / Micro-SaaS</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmittingCTA}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(var(--primary),0.3)] mt-2 text-xs"
                    >
                      {isSubmittingCTA ? (
                        <>
                          <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          <span>Procesando solicitud...</span>
                        </>
                      ) : (
                        <>
                          <span>Solicitar Evaluación Técnica</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </article>

          </main>
        </div>
      </div>

      {/* FOOTER DEL PORTE DE LA GUÍA */}
      <footer className="border-t border-border/20 py-10 bg-card/20 print:border-t print:border-gray-200 print:bg-none print:py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground print:text-gray-500">
          <p>© 2026 LexiaCode. Todos los derechos reservados. Material corporativo confidencial.</p>
          <div className="flex gap-4 print:hidden">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <span>•</span>
            <a href="https://www.linkedin.com/in/julio-antonio-villalobo-770b22296" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-1">
              LinkedIn <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </footer>

      {/* ESTILOS ESPECÍFICOS PARA LA IMPRESIÓN (PDF PREMIUM) */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
            font-size: 12pt !important;
            line-height: 1.5 !important;
          }
          /* Ocultar elementos innecesarios */
          .print\\:hidden {
            display: none !important;
          }
          /* Forzar fondo blanco y texto oscuro */
          .bg-background, .bg-card, .bg-card\\/40, .bg-card\\/20, .bg-muted\\/50 {
            background-color: transparent !important;
            background: transparent !important;
          }
          .text-foreground, .text-muted-foreground, .text-amber-200\\/90 {
            color: black !important;
          }
          .border, .border-border\\/40, .border-border\\/20, .border-y, .divide-y {
            border-color: #e5e7eb !important;
          }
          /* Paginación limpia */
          .page-break-after {
            page-break-after: always !important;
            break-after: page !important;
          }
          h1, h2, h3 {
            color: black !important;
            page-break-inside: avoid !important;
          }
          pre, code, svg {
            page-break-inside: avoid !important;
          }
          svg {
            max-width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>

    </div>
  )
}
