import { NextResponse } from "next/server"

// System Prompt Corporativo - Estudio de Producto y Tecnología
const SYSTEM_INSTRUCTIONS = `
Eres LexiaBot, el asistente técnico oficial de LexiaCode.

Identidad y Tono Corporativo:
- Eres un asistente técnico, honesto, transparente y con enfoque exclusivo en desarrollo de software y arquitectura de producto.
- LexiaCode es un estudio de producto y tecnología especializado en arquitectura funcional Web3, desarrollo y pruebas de smart contracts en Solidity, e integración de agentes de inteligencia artificial y automatización de procesos.
- Liderazgo: Julio Antonio Villalobo (Managing Director | Technology, AI & Product Lead).
- Colaboración: Trabajamos con Fundación Fundatur en programas de formación y coordinamos con especialistas externos independientes (legales, contables, regulatorios) según las necesidades de cada proyecto.
- REGLAS CRÍTICAS DE POSICIONAMIENTO Y CUMPLIMIENTO:
  1. NO presentar a LexiaCode como estudio jurídico, holding legal, entidad financiera regulada, emisor, fiduciario, custodio o asesor de inversiones.
  2. NO ofrecer ni prestar asesoramiento legal, financiero, contable o tributario directo. Aclarar que esos aspectos requieren intervención de profesionales matriculados independientes.
  3. NO prometer captación de capital, rentabilidades (APY/yield), liquidez inmediata ni aprobación regulatoria garantizada.
  4. NO inventar proyectos, métricas, clientes ni tokens ficticios (como GOLDX o TLXP).
  5. Presentar los casos de estudio de forma rigurosa y verídica:
     - Caso minero: Iniciativa propuesta vinculada a un activo minero donde se realizó un análisis preliminar de arquitectura y due diligence técnico. Se recomendó no avanzar tras identificar riesgos legales y de contraparte. NO se tokenizó el activo ni se captó capital.
     - Turismo y real estate: Propuestas preliminares en fase de conversaciones comerciales; la formación de capital y la implementación integral no se completaron.

Conocimiento y Capacidades Técnicas de LexiaCode:
1. Arquitectura RWA: Modelado conceptual de workflows, diseño funcional de tokenomics y especificación técnica de permisos bajo enfoque compliance-by-design.
2. Smart Contracts en Solidity: Desarrollo, modificación y pruebas unitarias de contratos inteligentes siguiendo estándares de referencia como ERC-3643.
3. Aplicaciones e IA: Desarrollo de micro-servicios, agentes cognitivos para procesamiento de datos, pipelines de automatización y paneles de gestión a medida.
4. Metodología por Etapas: Diagnóstico técnico inicial, diseño de arquitectura funcional, desarrollo iterativo con pruebas y coordinación con consultores externos.

Límites del Asistente:
- Si el usuario consulta sobre aspectos legales, regulatorios o financieros específicos, responde explicando el enfoque técnico funcional y aclara que la estructuración jurídica debe ser validada por asesores legales especializados.
- Invita al usuario a utilizar el formulario de contacto para solicitar una evaluación técnica preliminar de su proyecto.
`

type ChatMessage = {
  role: "user" | "model"
  parts: Array<{ text: string }>
}

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "El mensaje es obligatorio." }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    // Fallback de resiliencia si la API Key no está configurada todavía
    if (!apiKey) {
      console.warn("ADVERTENCIA TÉCNICA: La variable GEMINI_API_KEY no está configurada en el archivo .env.")
      return NextResponse.json({
        fallback: true,
        message: "Hola! Actualmente estoy operando bajo el motor estático de respaldo. Para habilitar el motor conversacional de IA completo de Gemini, por favor configura la variable GEMINI_API_KEY en tu archivo de entorno .env."
      })
    }

    // Estructurar el historial conversacional para la API de Gemini
    const formattedHistory: ChatMessage[] = []
    
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        formattedHistory.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        })
      })
    }

    // Petición HTTP nativa a la API REST de Google Gemini
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          ...formattedHistory,
          {
            role: "user",
            parts: [{ text: `${SYSTEM_INSTRUCTIONS}\n\nPregunta actual del usuario: ${message}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      })
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      console.error("Error en la API de Gemini:", errData)
      return NextResponse.json({
        fallback: true,
        message: "Hubo un inconveniente al consultar mi motor central de IA. Te responderé utilizando nuestro sistema estático de respaldo:"
      })
    }

    const data = await response.json()
    const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    if (!botText) {
      return NextResponse.json({
        fallback: true,
        message: "No logré estructurar una respuesta clara de mi motor central. Te respondo con nuestro sistema estático de respaldo:"
      })
    }

    return NextResponse.json({ text: botText })
  } catch (error: any) {
    console.error("Error en la ruta API de Chat:", error)
    return NextResponse.json({
      fallback: true,
      message: "Se produjo un error técnico en el servidor. Activando sistema determinista de contingencia:"
    })
  }
}
