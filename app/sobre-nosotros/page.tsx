import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { LanguageProvider } from "@/lib/language-context"
import { ShieldCheck, Heart, Award, Zap, Users, Sparkles, ChevronDown } from "lucide-react"

export const metadata = {
  title: "Sobre Nosotros - LexiaCode",
  description: "Conocé la empresa, nuestra visión, misión y los valores que impulsan la tokenización y estructuración de activos reales (RWA).",
}

export default function SobreNosotrosPage() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-[#07080a] overflow-x-hidden pt-28 pb-12">
        {/* Glows decorativos laterales */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[800px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-2/4 right-0 w-[400px] h-[800px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none z-0" />

        <Header />

        {/* Contenedor Boxed Layout Principal */}
        <div className="relative z-10 mx-auto max-w-5xl bg-white text-gray-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden rounded-2xl border border-gray-800/10">
          
          {/* ═══════════════════════ HERO SECTION (Blanco Puro) ═══════════════════════ */}
          <section className="bg-white py-20 px-8 lg:px-16 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 block mb-3">
              La Empresa
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl uppercase mb-8">
              Sobre Nosotros
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed font-light mb-12">
              Somos un estudio de producto y tecnología especializado en Web3, RWA e inteligencia artificial. Diseñamos la estrategia de producto, la arquitectura funcional y los flujos de smart contracts necesarios para evaluar y desarrollar iniciativas de tokenización por etapas.
            </p>
            
            {/* Foto ancha horizontal (Separador visual) */}
            <div className="relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=70&w=800&auto=format&fit=crop"
                alt="LexiaCode Corporate"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </section>

          {/* ═══════════════════════ MISIÓN & VISIÓN (Fondo Oscuro) ═══════════════════════ */}
          <section className="relative bg-[#111215] text-white py-24 px-8 lg:px-16 overflow-hidden">
            {/* Sutil textura técnica de fondo */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
              {/* Visión */}
              <div className="space-y-4">
                <h2 className="text-2xl tracking-wide uppercase text-gray-400 font-light">
                  NUESTRA <span className="font-bold text-white">VISIÓN</span>
                </h2>
                <div className="h-1 w-12 bg-primary rounded-full mb-6" />
                <p className="text-base text-gray-300 leading-relaxed font-light">
                  Consolidarnos como un estudio de referencia en arquitectura funcional Web3, smart contracts e inteligencia artificial, facilitando que empresas y desarrolladores evalúen e implementen soluciones tecnológicas sólidas, trazables y auditables por etapas.
                </p>
              </div>

              {/* Misión */}
              <div className="space-y-4">
                <h2 className="text-2xl tracking-wide uppercase text-gray-400 font-light">
                  NUESTRA <span className="font-bold text-white">MISIÓN</span>
                </h2>
                <div className="h-1 w-12 bg-primary rounded-full mb-6" />
                <p className="text-base text-gray-300 leading-relaxed font-light">
                  LexiaCode desarrolla software robusto, arquitectura de smart contracts con enfoque de compliance-by-design y agentes de inteligencia artificial aplicados, priorizando el análisis de viabilidad técnica y la calidad en cada entrega de producto.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════ TRANSICIÓN (Imagen horizontal) ═══════════════════════ */}
          <section className="relative w-full h-[220px] md:h-[300px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=70&w=800&auto=format&fit=crop"
              alt="LexiaCode Team Dynamics"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent mix-blend-multiply" />
          </section>

          {/* ═══════════════════════ VALORES GENÉTICOS (Gris Claro) ═══════════════════════ */}
          <section className="bg-[#f9f9f9] py-20 px-8 lg:px-16 text-center border-t border-gray-200">
            <div className="flex justify-center mb-4">
              <ChevronDown className="h-5 w-5 text-primary animate-bounce" />
            </div>
            
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase">
              Nuestros Valores Genéticos
            </h2>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary block mt-2 mb-16">
              Lo que somos
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {/* Pasión */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-primary shrink-0" />
                  <h3 className="text-lg font-extrabold uppercase tracking-wider text-gray-900">Pasión</h3>
                </div>
                {/* Línea horizontal delgada de color naranja corporativo (100% de ancho) */}
                <div className="h-0.5 w-full bg-[#e87722]" />
                <p className="text-sm text-gray-600 leading-relaxed font-light pt-2">
                  Nuestra pasión distingue todo lo que somos y todo lo que hacemos como grupo humano. Somos intensamente dedicados con la realización de nuestras ideas y esperamos la misma intensidad de quienes colaboran con nosotros.
                </p>
              </div>

              {/* Innovación */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary shrink-0" />
                  <h3 className="text-lg font-extrabold uppercase tracking-wider text-gray-900">Innovación</h3>
                </div>
                <div className="h-0.5 w-full bg-[#e87722]" />
                <p className="text-sm text-gray-600 leading-relaxed font-light pt-2">
                  Nos resistimos a la idea de que las cosas no pueden ser siempre mejores de lo que son. Nos une la innovación, el desarrollo de soluciones de vanguardia y la creación de valor constante en cada línea de código.
                </p>
              </div>

              {/* Acción */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-primary shrink-0" />
                  <h3 className="text-lg font-extrabold uppercase tracking-wider text-gray-900">Acción</h3>
                </div>
                <div className="h-0.5 w-full bg-[#e87722]" />
                <p className="text-sm text-gray-600 leading-relaxed font-light pt-2">
                  Jamás renunciamos a nuestra decidida tendencia a la acción. Actuamos, resolvemos y consolidamos. La capacidad de ejecución ágil es el gen que nos permite diseñar soluciones eficientes, robustas y de alta calidad técnica.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════ VALORES CORPORATIVOS (Blanco Puro) ═══════════════════════ */}
          <section className="bg-white py-20 px-8 lg:px-16 text-center border-t border-gray-100">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase">
              Nuestros Valores Corporativos
            </h2>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary block mt-2 mb-16">
              Cómo gestionamos
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              {/* Orientación al Cliente */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary shrink-0" />
                  <h3 className="text-lg font-extrabold uppercase tracking-wider text-gray-900">Orientación al Cliente</h3>
                </div>
                <div className="h-0.5 w-full bg-[#e87722]" />
                <p className="text-sm text-gray-600 leading-relaxed font-light pt-2">
                  Trabajamos a partir de las necesidades de usuarios, organizaciones y stakeholders, orientando el diseño de producto a soluciones tecnológicas claras, útiles y defendibles.
                </p>
              </div>

              {/* Excelencia Tecnológica */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-primary shrink-0" />
                  <h3 className="text-lg font-extrabold uppercase tracking-wider text-gray-900">Mejora Continua</h3>
                </div>
                <div className="h-0.5 w-full bg-[#e87722]" />
                <p className="text-sm text-gray-600 leading-relaxed font-light pt-2">
                  Nos desafiamos día tras día en la excelencia de nuestra gestión e infraestructura on-chain, incorporando mejoras rigurosas a los procesos e impulsando el aprendizaje tecnológico continuo.
                </p>
              </div>

              {/* Confianza */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                  <h3 className="text-lg font-extrabold uppercase tracking-wider text-gray-900">Confianza</h3>
                </div>
                <div className="h-0.5 w-full bg-[#e87722]" />
                <p className="text-sm text-gray-600 leading-relaxed font-light pt-2">
                  Construimos confianza respetando y honrando nuestros compromisos, aplicando mecanismos de trazabilidad, control y transparencia acordes con la arquitectura de cada solución.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════ NUESTRO EQUIPO (Gris Claro) ═══════════════════════ */}
          <section className="bg-[#f9f9f9] py-20 px-8 lg:px-16 text-center border-t border-gray-200">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase">
              Dirección de Producto &amp; Tecnología
            </h2>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary block mt-2 mb-12">
              Liderazgo de Producto y Arquitectura
            </span>

            <div className="max-w-md mx-auto text-left mb-12">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:border-primary transition-all duration-300 flex flex-col items-center text-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-gray-100 shrink-0 mb-6 bg-gray-50 shadow-md">
                  <img src="/ceo1.webp" alt="Julio A. Villalobo" className="h-full w-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Julio A. Villalobo</h3>
                <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-4">Managing Director | Technology, AI &amp; Product Lead</p>
                <p className="text-xs text-gray-600 leading-relaxed font-light mb-6">
                  Dirige la estrategia de producto, arquitectura funcional, coordinación técnica, QA, seguridad y entrega por etapas. Diseña, escribe y modifica contratos en Solidity (apoyado en herramientas de IA), desarrolla pruebas de software, revisa lógica contractual y riesgos comunes de seguridad, y documenta hallazgos técnicos.
                </p>
                <div className="flex gap-4 items-center justify-center">
                  <a href="https://www.linkedin.com/in/julio-antonio-villalobo-770b22296/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0A66C2]/40 bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                  </a>
                  <a href="https://wa.me/5493815400016" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 hover:scale-110 transition-all duration-300" aria-label="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872 .118 .571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Nota institucional */}
            <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 text-xs text-gray-600 leading-relaxed font-light">
              <strong className="text-gray-900 block mb-1">Nota Institucional sobre Coordinación Externa:</strong>
              Según el alcance de cada iniciativa, LexiaCode puede coordinar profesionales independientes especializados en aspectos legales, regulatorios, compliance, seguridad y desarrollo. Su participación se define y contrata específicamente para cada proyecto.
            </div>
          </section>

          {/* ═══════════════════════ RED DE TALENTO (Blanco Puro) ═══════════════════════ */}
          <section id="careers" className="bg-white py-20 px-8 lg:px-16 text-center border-t border-gray-100">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 uppercase">
              Red de Talento y Colaboradores
            </h2>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary block mt-2 mb-8">
              Red de Especialistas
            </span>
            <p className="max-w-2xl mx-auto text-sm text-gray-600 font-light leading-relaxed mb-10">
              LexiaCode mantiene contacto con profesionales independientes de producto, desarrollo, Solidity, inteligencia artificial, seguridad y regulación para posibles colaboraciones futuras. Actualmente no se publican vacantes laborales activas.
            </p>
          </section>

        </div>

        <Footer />
      </main>
    </LanguageProvider>
  )
}
