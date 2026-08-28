"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Bot, X, MessageSquare, Send, Calendar, HelpCircle, RefreshCw } from "lucide-react"

type Message = {
  id: string
  text: string
  sender: "bot" | "user"
  timestamp: Date
}

// Estructura de dudas sugeridas interactivas para combatir la negatividad y educar al usuario
const SUGGESTED_DUDAS = [
  {
    id: "viable",
    icon: "🔍",
    question: "¿Mi activo puede tokenizarse?",
    queryKeyword: "viable"
  },
  {
    id: "estafa",
    icon: "🚨",
    question: "¿Es una estafa o humo crypto?",
    queryKeyword: "estafa"
  },
  {
    id: "hackeo",
    icon: "🔒",
    question: "¿Si me hackean o pierdo la clave?",
    queryKeyword: "hackeo"
  },
  {
    id: "legal",
    icon: "⚖️",
    question: "¿Es legal en Argentina con la CNV?",
    queryKeyword: "legal"
  },
  {
    id: "costos",
    icon: "💰",
    question: "¿Tiene costos muy elevados?",
    queryKeyword: "costo"
  },
  {
    id: "confianza",
    icon: "🌱",
    question: "¿Por qué confiar en LexiaCode?",
    queryKeyword: "confianza"
  }
]

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  
  // Estados para el diagnóstico técnico preliminar
  const [diagStep, setDiagStep] = useState<"none" | "asking-asset" | "asking-docs" | "asking-scope" | "asking-stage" | "result">("none")
  const [diagData, setDiagData] = useState<{ assetType?: string; docsState?: string; techScope?: string; devStage?: string }>({})

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hola 👋 Soy LexiaBot, asistente técnico de LexiaCode. Puedo orientarte sobre arquitectura de smart contracts, flujos de desarrollo Web3 y ayudarte a realizar un diagnóstico técnico preliminar de tu iniciativa.",
      sender: "bot",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Redirección fluida al calendario de contacto
  const handleScheduleClick = () => {
    setIsOpen(false)
    const contactSection = document.getElementById("contact") || document.getElementById("contacto")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Manejar el clic en una duda sugerida de la sesión de dudas
  const handleDudaClick = (questionText: string, queryKeyword: string) => {
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: questionText,
      sender: "user",
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, newUserMsg])
    setIsTyping(true)

    // Simular escritura de la IA para dar un efecto premium
    setTimeout(() => {
      setIsTyping(false)
      
      let responseText = getBotResponse(queryKeyword)
      
      if (queryKeyword === "viable") {
        setDiagStep("asking-asset")
        responseText = "Iniciemos un **diagnóstico técnico preliminar** (orientativo, no legal ni financiero).\n\n1. ¿Qué tipo de activo o proceso buscas modelar? (Ej: Inmobiliario, agropecuario, industrial o software SaaS)"
      }
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, botResponse])
    }, 850)
  }

  // Reiniciar la sesión de dudas interactivas
  const handleResetDudas = () => {
    setDiagStep("none")
    setDiagData({})
    setMessages([
      {
        id: "1",
        text: "Hola 👋 Soy LexiaBot, asistente técnico de LexiaCode. Puedo orientarte sobre arquitectura de smart contracts, flujos de desarrollo Web3 y ayudarte a realizar un diagnóstico técnico preliminar de tu iniciativa.",
        sender: "bot",
        timestamp: new Date()
      }
    ])
    setIsTyping(false)
  }

  // Función interna de respaldo estático determinista (robustecida e hiper-persuasiva)
  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase()
    
    if (q.includes("viable") || q.includes("puede tokenizarse") || q.includes("puedo tokenizar") || q.includes("mi activo")) {
      return "Para evaluar la viabilidad técnica de una iniciativa RWA, consideramos 3 criterios principales:\n\n1️⃣ **Definición Funcional**: Tener claridad sobre la estructura física o los derechos operativos que se buscan modelar.\n2️⃣ **Workflows de Smart Contracts**: Determinar si las reglas de acceso, permisos y eventos pueden automatizarse mediante Solidity de forma eficiente.\n3️⃣ **Marco Legal Coordinado**: Contar con asesoramiento legal especializado para definir el vehículo y el aislamiento patrimonial adecuado."
    }
    
    if (q.includes("hola") || q.includes("buen") || q.includes("que tal") || q.includes("cómo estás") || q.includes("como estas")) {
      return "¡Hola! Qué gusto saludarte. Soy el asistente de LexiaCode. Somos un estudio de producto y tecnología especializado en arquitectura funcional Web3, smart contracts e inteligencia artificial.\n\n¿En qué te podemos ayudar hoy? Puedes consultarnos sobre viabilidad técnica de proyectos o escribirnos mediante el formulario de contacto."
    }

    if (q.includes("estafa") || q.includes("humo") || q.includes("burbuja") || q.includes("cripto") || q.includes("crypto") || q.includes("mentira") || q.includes("ponzi") || q.includes("perder dinero")) {
      return "Es una consulta sumamente válida. En LexiaCode trabajamos con un enfoque de ingeniería y producto:\n\nNos enfocamos en el modelado técnico de smart contracts, arquitectura funcional y automatización de procesos. No comercializamos valores ni garantizamos rentabilidades. Cada iniciativa debe evaluarse rigurosamente en su viabilidad técnica y legal antes de implementarse."
    }

    if (q.includes("hackeo") || q.includes("hackear") || q.includes("clave") || q.includes("perder") || q.includes("robo") || q.includes("billetera") || q.includes("seguro") || q.includes("seguridad") || q.includes("recuperar") || q.includes("robar")) {
      return "Diseñamos contratos inteligentes siguiendo buenas prácticas de la industria, incluyendo el estándar ERC-3643 como referencia para gestión condicional de identidades y permisos.\n\nEsto permite modelar mecanismos de recuperación o contingencia técnica siempre que estén previstos en la especificación funcional y en coordinación con los administradores del proyecto."
    }

    if (q.includes("legal") || q.includes("regulacion") || q.includes("regulación") || q.includes("cnv") || q.includes("uif") || q.includes("ley") || q.includes("norma") || q.includes("normativa") || q.includes("ilegal") || q.includes("prohibir")) {
      return "El desarrollo de contratos inteligentes debe realizarse con principios de compliance-by-design, considerando marcos regulatorios vigentes (como las normativas de la CNV en Argentina).\n\nEn LexiaCode nos encargamos de la arquitectura técnica y funcional, y coordinamos el análisis jurídico con abogados especializados para cada caso."
    }

    if (q.includes("costo") || q.includes("precio") || q.includes("cuánto") || q.includes("valora") || q.includes("presupuesto") || q.includes("caro") || q.includes("presupuestar") || q.includes("cuanto")) {
      return "El costo y tiempo de desarrollo dependen de la complejidad funcional del proyecto, la cantidad de smart contracts requeridos y las integraciones de software necesarias.\n\nEstructuramos el trabajo por etapas e hitos de entrega verificables. ¿Te gustaría coordinar una evaluación técnica para estimar el alcance de tu proyecto?"
    }

    if (q.includes("confianza") || q.includes("joven") || q.includes("nuevos") || q.includes("experiencia") || q.includes("trayectoria") || q.includes("edad") || q.includes("quienes son") || q.includes("quiénes son")) {
      return "En LexiaCode basamos nuestra credibilidad en el rigor técnico y la transparencia:\n\n1. **Desarrollo y Pruebas**: Smart contracts en Solidity con suite de pruebas unitarias y revisión de código.\n2. **Arquitectura Funcional**: Enfoque de compliance-by-design para facilitar la posterior revisión legal.\n3. **Entrega por Etapas**: Metodología iterativa con hitos y documentación clara.\n\n¿Te gustaría coordinar una reunión técnica con nuestro equipo?"
    }

    if (q.includes("quién") || q.includes("quien") || q.includes("equipo") || q.includes("lider") || q.includes("líder") || q.includes("número 1") || q.includes("numero 1") || q.includes("latinoamerica") || q.includes("latinoamérica")) {
      return "LexiaCode es liderado por Julio Antonio Villalobo (Managing Director | Technology, AI & Product Lead), especializado en dirección de producto, arquitectura funcional Web3, smart contracts en Solidity e integraciones de IA.\n\nCoordinamos además con especialistas externos independientes según los requerimientos de cada proyecto."
    }

    if (q.includes("tokeni") || q.includes("activo") || q.includes("rwa")) {
      return "La tokenización de activos del mundo real (RWA) consiste en modelar la representación digital de activos o iniciativas mediante contratos inteligentes.\n\nEn LexiaCode diseñamos la arquitectura funcional, los flujos de smart contracts y las integraciones necesarias para evaluar y desarrollar proyectos por etapas."
    }
    
    if (q.includes("web3") || q.includes("blockchain") || q.includes("smart contract") || q.includes("contrato") || q.includes("tecnolog") || q.includes("ethereum") || q.includes("polygon")) {
      return "Trabajamos con redes compatibles con EVM (Ethereum, Polygon), diseñando smart contracts en Solidity y suites de pruebas para asegurar que la lógica cumpla con las especificaciones del producto."
    }
    
    if (q.includes("inmobil") || q.includes("real estate") || q.includes("propiedad") || q.includes("casa") || q.includes("edificio") || q.includes("terren")) {
      return "En Real Estate evaluamos el modelado funcional para digitalización de participaciones y automatización de flujos operativos entre partes interesadas."
    }
    
    if (q.includes("agro") || q.includes("cosecha") || q.includes("campo") || q.includes("cultivo") || q.includes("trigo") || q.includes("tierra")) {
      return "En el sector agropecuario diseñamos arquitectura de software y trazabilidad on-chain para seguimiento de etapas productivas y acuerdos comerciales."
    }
    
    if (q.includes("reunion") || q.includes("agendar") || q.includes("llamada") || q.includes("contacto") || q.includes("turno") || q.includes("conversar") || q.includes("reunión")) {
      return "¡Excelente! Puedes escribirnos directamente a través de la sección de contacto en la web o enviarnos un mensaje por WhatsApp para coordinar una reunión de evaluación técnica."
    }
    
    return "En LexiaCode somos un estudio de producto y tecnología especializado en arquitectura Web3, smart contracts en Solidity y agentes de IA aplicados. Ayudamos a evaluar la viabilidad técnica de iniciativas y desarrollar soluciones por etapas. ¿Sobre qué tema te gustaría consultar?"
  }

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim()) return

    const userQuery = inputValue
    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: userQuery,
      sender: "user",
      timestamp: new Date()
    }

    setMessages((prev) => [...prev, newUserMsg])
    setInputValue("")
    setIsTyping(true)

    // Flujo del diagnóstico técnico preliminar conversacional
    if (diagStep === "asking-asset") {
      setTimeout(() => {
        setIsTyping(false)
        setDiagData((prev) => ({ ...prev, assetType: userQuery }))
        const botResponse: Message = {
          id: Date.now().toString(),
          text: `Anotado: **${userQuery}**.\n\n2. ¿En qué estado se encuentra la documentación técnica o especificación del proyecto? (Ej: Borrador preliminar, relevamiento de requerimientos o validada por especialistas)`,
          sender: "bot",
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, botResponse])
        setDiagStep("asking-docs")
      }, 700)
      return
    }

    if (diagStep === "asking-docs") {
      setTimeout(() => {
        setIsTyping(false)
        setDiagData((prev) => ({ ...prev, docsState: userQuery }))
        const botResponse: Message = {
          id: Date.now().toString(),
          text: `3. ¿Qué componentes técnicos requeriría el prototipo?\n\n- Smart contracts en Solidity (ej. ERC-3643)\n- Aplicación web / Dashboard administrativo\n- Agentes de IA / Automatización de datos`,
          sender: "bot",
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, botResponse])
        setDiagStep("asking-scope")
      }, 700)
      return
    }

    if (diagStep === "asking-scope") {
      setTimeout(() => {
        setIsTyping(false)
        setDiagData((prev) => ({ ...prev, techScope: userQuery }))
        const botResponse: Message = {
          id: Date.now().toString(),
          text: `4. ¿En qué etapa se encuentra actualmente la iniciativa?\n\n- Conceptual / Idea inicial\n- Prototipo funcional / MVP\n- Desarrollo para producción`,
          sender: "bot",
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, botResponse])
        setDiagStep("asking-stage")
      }, 700)
      return
    }

    if (diagStep === "asking-stage") {
      setTimeout(() => {
        setIsTyping(false)
        setDiagData((prev) => ({ ...prev, devStage: userQuery }))
        const botResponse: Message = {
          id: Date.now().toString(),
          text: `📋 **Resumen de Diagnóstico Técnico Preliminar**\n\n- **Iniciativa/Activo:** ${diagData.assetType || "Especificado"}\n- **Estado documental:** ${diagData.docsState || "En proceso"}\n- **Alcance técnico:** ${diagData.techScope || "Smart contracts / Web"}\n- **Etapa:** ${userQuery}\n\n*Nota: Este diagnóstico es de carácter puramente técnico y orientativo. No constituye determinación de viabilidad legal, financiera ni regulatoria, la cual debe ser realizada por profesionales habilitados.*\n\n¿Te gustaría coordinar una sesión de evaluación técnica detallada con nuestro equipo?`,
          sender: "bot",
          timestamp: new Date()
        }
        setMessages((prev) => [...prev, botResponse])
        setDiagStep("result")
      }, 800)
      return
    }

    // Respuesta estática y determinista local sin requerimiento de red ni backend
    setTimeout(() => {
      setIsTyping(false)
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userQuery),
        sender: "bot",
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, botResponse])
    }, 450)
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        aria-label="Abrir chat"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
      </button>

      {/* Ventana de chat */}
      <div 
        className={`fixed bottom-6 right-6 z-50 w-[350px] sm:w-[380px] transition-all duration-300 origin-bottom-right ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"}`}
      >
        <Card className="flex h-[530px] flex-col overflow-hidden border-primary/20 shadow-2xl bg-card/95 backdrop-blur-xl">
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 bg-muted/30 px-4 py-3 space-y-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">LexiaBot</h3>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  En línea
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetDudas}
                className="h-8 text-[10px] text-primary hover:text-primary/80 hover:bg-primary/5 px-2 rounded-lg font-mono gap-1 cursor-pointer flex items-center"
                title="Volver a abrir la sesión de dudas"
              >
                <RefreshCw className="h-3 w-3" /> Asistente de Tokenización
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full hover:bg-background/50">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Área de mensajes */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line leading-relaxed ${msg.sender === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-muted text-foreground border border-border/40 rounded-bl-none"}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Indicador de escritura */}
            {isTyping && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-muted border border-border/40 rounded-2xl rounded-bl-none px-4 py-3 max-w-[80%] flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}

            {/* Sesión Interactiva de Consultas Rápidas (Glassmorphism, visible solo en el paso inicial de dudas) */}
            {messages.length === 1 && !isTyping && (
              <div className="p-3.5 rounded-2xl border border-primary/25 bg-primary/5 backdrop-blur-md animate-fadeIn mt-2 shadow-[0_4px_20px_rgba(var(--primary),0.05)]">
                <p className="text-[11px] font-bold text-primary font-mono uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <HelpCircle className="h-3.5 w-3.5 text-primary" /> Sesión de Consultas RWA
                </p>
                <p className="text-[11px] text-muted-foreground font-light mb-3 leading-relaxed">
                  Hacé clic en cualquiera de las objeciones o temores más habituales sobre la tokenización para ver nuestra respuesta técnica y honesta:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {SUGGESTED_DUDAS.map((duda) => (
                    <button
                      key={duda.id}
                      onClick={() => handleDudaClick(duda.question, duda.queryKeyword)}
                      className="w-full text-left flex items-center gap-2.5 p-2.5 rounded-xl border border-border/30 bg-background/40 hover:bg-primary/10 hover:border-primary/40 text-xs text-foreground/90 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99] font-light shadow-sm"
                    >
                      <span className="text-sm shrink-0">{duda.icon}</span>
                      <span className="flex-1 font-semibold text-[11px]">{duda.question}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Botón rápido de contacto / reunión sugerido después de que el usuario interactúa */}
            {messages.length > 1 && !isTyping && (
              <div className="flex flex-col gap-2 mt-2 animate-fadeIn">
                {diagStep === "result" ? (
                  <Button 
                    onClick={() => {
                      setIsOpen(false)
                      const contactSection = document.getElementById("contact") || document.getElementById("contacto")
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" })
                        
                        // Rellenar automáticamente el formulario de contacto con los datos del diagnóstico técnico
                        setTimeout(() => {
                          const messageTextarea = document.querySelector('textarea[placeholder*="Tell us about your project"], textarea[placeholder*="mensaje"]') as HTMLTextAreaElement;
                          const companyInput = document.querySelector('input[placeholder*="Acme Corp"], input[placeholder*="Empresa"]') as HTMLInputElement;
                          
                          if (companyInput) {
                            companyInput.value = "Iniciativa Técnica Web3 / RWA";
                            companyInput.dispatchEvent(new Event('input', { bubbles: true }));
                          }
                          
                          if (messageTextarea) {
                            messageTextarea.value = `Hola, completé el diagnóstico técnico preliminar en el chat. Iniciativa: ${diagData.assetType || "No especificado"}, Estado documental: ${diagData.docsState || "En proceso"}, Alcance técnico: ${diagData.techScope || "Smart contracts"}, Etapa: ${diagData.devStage || "En evaluación"}. Me gustaría coordinar una sesión de evaluación técnica.`;
                            messageTextarea.dispatchEvent(new Event('input', { bubbles: true }));
                          }
                        }, 500);
                      }
                    }}
                    size="sm" 
                    className="w-full bg-primary hover:bg-[#e87722] text-white gap-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform py-3"
                  >
                    Coordinar Evaluación Técnica
                  </Button>
                ) : messages.filter(m => m.sender === 'user').length >= 2 ? (
                  // Si el usuario ha enviado al menos 2 mensajes en general, mostrar también el CTA de evaluación/diagnóstico
                  <Button 
                    onClick={() => {
                      setIsOpen(false)
                      const contactSection = document.getElementById("contact") || document.getElementById("contacto")
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" })
                        
                        setTimeout(() => {
                          const messageTextarea = document.querySelector('textarea[placeholder*="Tell us about your project"], textarea[placeholder*="mensaje"]') as HTMLTextAreaElement;
                          if (messageTextarea) {
                            messageTextarea.value = "Hola, me gustaría solicitar una sesión de evaluación técnica preliminar para un proyecto de software / smart contracts.";
                            messageTextarea.dispatchEvent(new Event('input', { bubbles: true }));
                          }
                        }, 500);
                      }
                    }}
                    size="sm" 
                    className="w-full bg-primary hover:bg-[#e87722] text-white gap-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform py-3"
                  >
                    Solicitar Evaluación Técnica
                  </Button>
                ) : null}
                
                <Button 
                  onClick={handleScheduleClick}
                  variant="outline" 
                  size="sm" 
                  className="bg-background/60 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 gap-2 rounded-xl text-[11px] font-semibold cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  <Calendar className="h-3 w-3" /> Agendar Consulta Técnica
                </Button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Footer */}
          <CardFooter className="border-t border-border/40 bg-muted/10 p-3">
            <form onSubmit={handleSend} className="flex w-full items-center gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe tu activo o consulta sobre tokenización..."
                className="flex-1 rounded-full bg-background/50 border-border/50 text-sm h-10 focus-visible:ring-primary/50"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping} className="h-10 w-10 rounded-full shrink-0 shadow-lg cursor-pointer">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
