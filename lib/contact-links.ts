export interface ContactPayload {
  name: string
  email: string
  company?: string
  assetType?: string
  message: string
}

export const OFFICIAL_CONTACT = {
  email: "juliov@lexiacode.com",
  phone: "+54 381 540 0016",
  whatsAppNumber: "5493815400016",
  whatsAppBaseUrl: "https://wa.me/5493815400016",
}

export function buildMailtoUrl(payload: ContactPayload): string {
  const asset = payload.assetType?.trim() || "No especificado"
  const company = payload.company?.trim() || payload.name?.trim() || "LexiaCode"
  const subject = `Consulta técnica - ${company}`
  const body = `Nombre: ${payload.name}\nEmail: ${payload.email}\nOrganización/Iniciativa: ${payload.company || "No especificada"}\nTipo de Activo/Proceso: ${asset}\n\nConsulta o requerimiento:\n${payload.message}`

  return `mailto:${OFFICIAL_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function buildWhatsAppUrl(payload: Partial<ContactPayload> = {}): string {
  const asset = payload.assetType?.trim() || "No especificado"
  const text = `Hola Julio, te contacto desde la web de LexiaCode.\nNombre: ${payload.name?.trim() || "No especificado"}\nEmail: ${payload.email?.trim() || "No especificado"}\nOrganización: ${payload.company?.trim() || "No especificada"}\nActivo/Interés: ${asset}\nConsulta: ${payload.message?.trim() || "Quisiera coordinar una evaluación técnica."}`

  return `${OFFICIAL_CONTACT.whatsAppBaseUrl}?text=${encodeURIComponent(text)}`
}
