import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Preguntas Frecuentes (FAQ) | LexiaCode",
  description:
    "Respuestas a las preguntas más frecuentes sobre la tokenización de activos reales (RWA), auditorías de Smart Contracts y agentes autónomos de Inteligencia Artificial.",
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children
}
