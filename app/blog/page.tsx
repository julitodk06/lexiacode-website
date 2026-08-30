"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { LanguageProvider } from "@/lib/language-context"
import { Calendar, User, Newspaper, ArrowRight, ArrowLeft, Video, Play, ExternalLink, CalendarDays } from "lucide-react"

type Article = {
  id: number
  category: string
  date: string
  author: string
  title: string
  desc: string
  image: string
  videoUrl?: string
  content: React.ReactNode
}

export default function BlogPage() {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null)

  const articles: Article[] = [
    {
      id: 1,
      category: "Video Guía",
      date: "20 Mayo, 2026",
      author: "LexiaCode Team",
      title: "Video Guía: Panorama y Evolución de la Tokenización en Argentina",
      desc: "Analizamos el informe y debate de Infobae sobre cómo la tokenización de activos del mundo real (RWA) plantea nuevas oportunidades y desafíos tecnológicos en la región.",
      image: "/blog/video-guia-rwa.png",
      videoUrl: "QDFQw4sw9W0", // ID real de Infobae
      content: (
        <div className="space-y-6 text-foreground/90 font-light leading-relaxed">
          <p>
            El desarrollo de software aplicado a finanzas corporativas explora nuevos modelos de registro. En este informe periodístico de Infobae, analistas y profesionales debaten el rol de la **tokenización de activos del mundo real (RWA)** y su impacto en la infraestructura tecnológica del país.
          </p>
          <div className="my-8 rounded-xl overflow-hidden border border-primary/20 bg-background/40 backdrop-blur p-4">
            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> Temáticas clave abordadas en el informe:
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>Representación digital y fraccionamiento lógico de derechos sobre activos de la economía real.</li>
              <li>Estandarización de procesos operativos y reducción de tiempos de conciliación mediante registros distribuidos.</li>
              <li>Modelado de reglas de acceso y validación de permisos en redes públicas y permisionadas.</li>
              <li>La importancia de la coordinación entre ingeniería de software y encuadres normativos locales.</li>
            </ul>
          </div>
          <h3 className="text-xl font-bold text-foreground pt-4">Perspectivas Técnicas de la Representación Digital</h3>
          <p>
            Como se expone en el video de Infobae, los aspectos técnicos centrales de los proyectos de activos digitales abarcan:
          </p>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Fraccionamiento Lógico:</strong> Representación de participaciones en contratos inteligentes con trazabilidad auditable y control de decimales.
            </li>
            <li>
              <strong>Trazabilidad y Registro:</strong> Disponibilidad de registros on-chain inmutables para verificar eventos de transferencia y estados operativos.
            </li>
            <li>
              <strong>Respaldo y Especificación Funcional:</strong> Vinculación lógica entre el estado digital en smart contracts y los requerimientos funcionales documentados del activo.
            </li>
          </ol>
          <p>
            Esta video guía ilustra el estado del debate sobre la modernización de infraestructuras de registro digital y los desafíos de ingeniería que implica su adopción.
          </p>
        </div>
      )
    },
    {
      id: 2,
      category: "Video Guía",
      date: "08 Mayo, 2026",
      author: "LexiaCode Team",
      title: "Video Guía: Tokenización en Argentina de la teoría a la práctica",
      desc: "Revisamos el panel del Argentina Fintech Forum sobre la transición de los activos digitales desde conceptos abstractos hasta implementaciones tecnológicas estructuradas.",
      image: "/blog/erc-comparison.png",
      videoUrl: "dwvtQHo05ME", // ID real de Fintech Forum
      content: (
        <div className="space-y-6 text-foreground/90 font-light leading-relaxed">
          <p>
            ¿Cómo está pasando la tokenización de ser una teoría conceptual a una arquitectura tecnológica aplicable en el mercado? En esta video guía interactiva, analizamos la mesa de debate del **Argentina Fintech Forum**, donde líderes del sector analizan los aspectos técnicos y operativos de los proyectos Web3.
          </p>
          <p>
            El ecosistema explora cómo conectar de forma estructurada contratos inteligentes en redes compatibles con EVM con la documentación y requerimientos funcionales de cada caso.
          </p>
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border/40 bg-card/10 p-5 rounded-xl">
              <h4 className="font-bold text-foreground mb-2 text-sm uppercase tracking-wide text-primary">Teoría y Modelos Iniciales</h4>
              <p className="text-xs text-muted-foreground">
                Modelos conceptuales de smart contracts sin especificación funcional detallada, limitados a pruebas preliminares.
              </p>
            </div>
            <div className="border border-primary/20 bg-primary/5 p-5 rounded-xl">
              <h4 className="font-bold text-foreground mb-2 text-sm uppercase tracking-wide text-amber-500">Arquitectura Estructurada</h4>
              <p className="text-xs text-muted-foreground">
                Modelado de permisos bajo estándares de referencia como ERC-3643, validación de reglas de acceso y diseño orientado a compliance-by-design.
              </p>
            </div>
          </div>
          <h3 className="text-xl font-bold text-foreground pt-4">Puntos de Discusión Técnicos del Fintech Forum</h3>
          <p>
            El video detalla consideraciones técnicas clave para estructurar iniciativas de digitalización:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Conectores On-Chain / Off-Chain:</strong> El diseño técnico para registrar de forma auditable los eventos de contratos y estados en redes distribuidas.</li>
            <li><strong>Modelado de Permisos:</strong> Cómo los smart contracts pueden incorporar validaciones condicionales de acceso para restringir operaciones a billeteras autorizadas.</li>
            <li><strong>Interfaces Funcionales:</strong> El desarrollo de aplicaciones web intuitivas que faciliten la interacción con contratos inteligentes sin fricción innecesaria.</li>
          </ul>
          <p>
            Esta charla del Fintech Forum aporta una perspectiva valiosa sobre la evolución tecnológica del sector.
          </p>
        </div>
      )
    },
    {
      id: 3,
      category: "Video Guía",
      date: "15 Mayo, 2026",
      author: "LexiaCode Team",
      title: "Video Guía: Charla de Tokenización con Sebastián Heredia Querro",
      desc: "Análisis conceptual de la charla de Sebastián Heredia Querro sobre la estructuración jurídica, casos de uso prácticos y el futuro de la tokenización inmobiliaria.",
      image: "/blog/real-estate-latam.jpg",
      videoUrl: "W72nzm0zWFk", // ID real de Sebastián Heredia Querro con PROACO
      content: (
        <div className="space-y-6 text-foreground/90 font-light leading-relaxed">
          <p>
            La tokenización inmobiliaria requiere un entendimiento riguroso tanto de la arquitectura de smart contracts como de los marcos jurídicos aplicables. En esta video guía, revisamos los conceptos expuestos por **Sebastián Heredia Querro** en la charla organizada por Grupo PROACO.
          </p>
          <p>
            Se analiza cómo los desarrolladores pueden modelar la representación digital de participaciones mediante contratos inteligentes vinculados a estructuras contractuales adecuadas.
          </p>
          <blockquote>
            <p className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
              "El token no reemplaza la ley; la optimiza. La blockchain actúa como un registro digital inmutable que hace que los derechos sean más trazables y estructurados."
            </p>
          </blockquote>
          <h3 className="text-xl font-bold text-foreground pt-4">Aspectos de Estructuración Analizados</h3>
          <p>
            En la charla se analizan consideraciones clave para el diseño de estas iniciativas:
          </p>
          <ol className="list-decimal pl-5 space-y-3">
            <li>
              <strong>Aislamiento Patrimonial:</strong> La necesidad de contar con vehículos y contratos formalmente encuadrados por profesionales del derecho.
            </li>
            <li>
              <strong>Marcos Normativos:</strong> La importancia de estructurar las iniciativas conforme a la normativa vigente en cada jurisdicción.
            </li>
            <li>
              <strong>Validación de Identidad y Compliance:</strong> La inclusión de validaciones de identidad en los flujos funcionales del producto.
            </li>
          </ol>
          <p>
            En LexiaCode diseñamos la arquitectura técnica y el código de smart contracts en coordinación con asesores legales independientes que validan el encuadre normativo de cada proyecto.
          </p>
        </div>
      )
    },
    {
      id: 4,
      category: "Video Guía",
      date: "02 Mayo, 2026",
      author: "LexiaCode Team",
      title: "Video Guía: Sandboxes Regulatorios y Marcos de Innovación",
      desc: "Revisamos el debate sobre entornos de prueba controlados para evaluar tecnologías de smart contracts y activos digitales.",
      image: "/blog/compliance-tokens.jpg",
      videoUrl: "16GQtsiisLE",
      content: (
        <div className="space-y-6 text-foreground/90 font-light leading-relaxed">
          <p>
            La innovación en tecnología financiera se beneficia de marcos donde puedan probarse soluciones en entornos controlados. Analizamos el debate de la **Cámara Argentina Fintech** respecto a modelos de **Sandbox Regulatorio** para iniciativas de activos digitales.
          </p>
          <p>
            Especialistas del sector dialogan sobre la importancia del diálogo técnico entre desarrolladores y organismos reguladores para fomentar la innovación responsable.
          </p>
          <div className="my-8 rounded-xl overflow-hidden border border-primary/20 bg-background/40 backdrop-blur p-4">
            <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> ¿Qué es un Sandbox Regulatorio?
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Es un marco experimental donde empresas y desarrolladores pueden evaluar smart contracts y arquitecturas funcionales bajo supervisión y diálogo con los reguladores competentes.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-muted-foreground">
              <li>Permite evaluar la interacción funcional de contratos inteligentes y flujos de datos.</li>
              <li>Facilita el intercambio técnico entre equipos de ingeniería y especialistas en compliance.</li>
              <li>Promueve la adopción de buenas prácticas de desarrollo y auditoría de código.</li>
            </ul>
          </div>
          <h3 className="text-xl font-bold text-foreground pt-4">Perspectivas para el Ecosistema Tecnológico</h3>
          <p>
            La implementación de entornos de prueba permite validar la solidez técnica y operativa de soluciones de software antes de despliegues productivos a gran escala.
          </p>
        </div>
      )
    },
    {
      id: 5,
      category: "Video Guía",
      date: "24 Abril, 2026",
      author: "LexiaCode Team",
      title: "Video Guía: Trazabilidad y Digitalización en Sectores Productivos",
      desc: "Análisis sobre el potencial de la tecnología blockchain para trazabilidad y gestión de activos en agricultura y energía.",
      image: "/blog/agrotech.jpg",
      videoUrl: "muCr51g2eI0",
      content: (
        <div className="space-y-6 text-foreground/90 font-light leading-relaxed">
          <p>
            El sector agropecuario y la infraestructura energética representan áreas con alto potencial para la aplicación de contratos inteligentes y trazabilidad digital. En esta video guía, revisamos las aplicaciones de blockchain en cadenas de valor productivas.
          </p>
          <p>
            Se analiza cómo la digitalización de inventarios y certificados operativos permite optimizar flujos comerciales y facilitar la integración entre productores, acopiadores y empresas.
          </p>
          <h3 className="text-xl font-bold text-foreground pt-4">Aplicaciones en la Economía Real</h3>
          <p>
            Casos de uso y consideraciones arquitectónicas:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Trazabilidad de Estados:</strong> Registro inmutable de etapas productivas, certificaciones de origen y transferencias de derechos operativos.</li>
            <li><strong>Automatización de Acuerdos:</strong> Ejecución de reglas condicionales mediante smart contracts para agilizar transacciones comerciales entre partes.</li>
            <li><strong>Modelado de Datos:</strong> Conexión de sensores y oráculos para alimentar estados de contratos inteligentes con información verídica del mundo físico.</li>
          </ul>
        </div>
      )
    },
    {
      id: 6,
      category: "Video Guía",
      date: "10 Abril, 2026",
      author: "LexiaCode Team",
      title: "Video Guía: Consideraciones Técnicas y Marcos de Compliance en RWA",
      desc: "Guía técnica sobre diseño de smart contracts y principios de compliance-by-design para iniciativas de activos digitales.",
      image: "/blog/regulation-cnv.jpg",
      videoUrl: "vzL66EXFS8s",
      content: (
        <div className="space-y-6 text-foreground/90 font-light leading-relaxed">
          <p>
            El desarrollo de contratos inteligentes para la representación de activos debe diseñarse con rigor técnico y principios de compliance-by-design, considerando los marcos normativos aplicables en cada jurisdicción.
          </p>
          <p>
            En esta guía técnica analizamos cómo modelar permisos, roles de administración y eventos on-chain para que la arquitectura de software responda fielmente a los requerimientos especificados por los especialistas legales del proyecto.
          </p>
          <h3 className="text-xl font-bold text-foreground pt-4">Arquitectura Técnica y Coordinación Legal</h3>
          <p>
            En LexiaCode diseñamos el software, smart contracts y suites de pruebas unitarias, y coordinamos con consultores legales independientes para validar que la implementación técnica se ajuste a los requerimientos normativos.
          </p>
        </div>
      )
    }
  ]

  const activeArticle = articles.find(a => a.id === selectedArticleId)

  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-transparent overflow-x-hidden pt-28 pb-12">
        {/* Decorative ambient glows */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[700px] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-2/4 right-0 w-[400px] h-[700px] bg-accent/5 blur-[120px] rounded-full pointer-events-none z-0" />

        <Header />

        <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
          
          {/* VISTA DETALLE DEL ARTÍCULO */}
          {activeArticle ? (
            <div className="bg-card/40 backdrop-blur-xl border border-border/30 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.4)] animate-fadeIn">
              {/* Back Button */}
              <button
                onClick={() => setSelectedArticleId(null)}
                className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-primary/80 transition-colors uppercase tracking-wider mb-8 border border-primary/20 bg-primary/5 px-4 py-2 rounded-full cursor-pointer hover:scale-105"
              >
                <ArrowLeft className="h-4 w-4" /> Volver al Blog
              </button>

              {/* Category & Date */}
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1 font-semibold text-primary">
                  {activeArticle.category}
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <CalendarDays className="h-3.5 w-3.5 text-muted-foreground/75" />
                  {activeArticle.date}
                </span>
              </div>

              {/* Article Title */}
              <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl md:text-5xl leading-tight mb-6">
                {activeArticle.title}
              </h1>

              {/* Author Strip */}
              <div className="flex items-center gap-3 py-4 border-y border-border/10 mb-8">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary border border-primary/30">
                  {activeArticle.author[0]}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Escrito por</p>
                  <p className="text-sm font-semibold text-foreground">{activeArticle.author}</p>
                </div>
              </div>

              {/* Embeber video de YouTube si existe */}
              {activeArticle.videoUrl && (
                <div className="mb-10">
                  <div className="group relative rounded-2xl overflow-hidden border border-primary/30 bg-black/60 shadow-2xl">
                    {/* Aspect ratio 16:9 */}
                    <div className="aspect-video w-full">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${activeArticle.videoUrl}?autoplay=0&rel=0&enablejsapi=1`}
                        title={`Video guía: ${activeArticle.title}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      ></iframe>
                    </div>
                    <div className="absolute top-3 left-3 pointer-events-none bg-red-600/90 text-white font-mono text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Play className="h-2.5 w-2.5 fill-white" /> Reproductor de Guía RWA
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <a
                      href={`https://www.youtube.com/watch?v=${activeArticle.videoUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono cursor-pointer"
                    >
                      <ExternalLink className="h-3 w-3" /> Ver directamente en YouTube
                    </a>
                  </div>
                </div>
              )}

              {/* Imagen principal (si no tiene video o debajo como cabecera si no hay video) */}
              {!activeArticle.videoUrl && (
                <div className="relative h-[300px] md:h-[450px] w-full rounded-2xl overflow-hidden border border-border/30 mb-10 shadow-lg">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-invert max-w-none">
                {activeArticle.content}
              </div>

              {/* Call to Action corporativo final */}
              <div className="mt-16 border-t border-primary/20 pt-10 text-center max-w-2xl mx-auto">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-4">
                  <Newspaper className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">¿Quieres evaluar tu iniciativa con nuestro equipo?</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                  En LexiaCode nos especializamos en arquitectura de producto, smart contracts en Solidity e integraciones de IA para proyectos tecnológicos.
                </p>
                <Link
                  href="/#contact"
                  onClick={() => setSelectedArticleId(null)}
                  className="inline-flex items-center justify-center bg-primary hover:bg-[#e87722] text-white text-xs font-bold font-mono uppercase px-6 py-3 rounded-xl transition-all shadow-md hover:scale-105"
                >
                  Contactar al Equipo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            
            /* VISTA GRILLA DE ARTÍCULOS */
            <div>
              {/* Encabezado */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-3">Publicaciones Técnicas</p>
                <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
                  Blog & Recursos de Arquitectura RWA
                </h1>
                <p className="mt-4 text-lg text-muted-foreground font-light">
                  Análisis técnicos, estándares de contratos inteligentes y reflexiones sobre el desarrollo de soluciones Web3.
                </p>
              </div>

              {/* Grilla */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {articles.map(article => (
                  <div
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    className="group flex flex-col justify-between rounded-2xl border border-border/30 bg-card/20 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-card/40 hover:-translate-y-1 cursor-pointer shadow-lg"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-background/50 border border-border/40 mb-4">
                        <img
                          src={article.videoUrl ? `https://img.youtube.com/vi/${article.videoUrl}/hqdefault.jpg` : article.image}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                        
                        {/* Play Indicator if it's a Video Guide */}
                        {article.videoUrl && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/95 text-white shadow-xl border border-primary/20 transition-transform group-hover:scale-110">
                              <Play className="h-5 w-5 fill-white ml-0.5" />
                            </div>
                          </div>
                        )}

                        <span className="absolute top-3 left-3 inline-flex items-center rounded-lg bg-background/90 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold font-mono text-primary border border-border/40 uppercase shadow-sm">
                          {article.category}
                        </span>
                      </div>

                      {/* Info & Title */}
                      <div className="pt-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground mb-2">
                          <span>{article.date}</span>
                        </div>
                        <h3 className="text-md font-bold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="mt-2 text-xs text-muted-foreground leading-relaxed font-light line-clamp-3">
                          {article.desc}
                        </p>
                      </div>
                    </div>

                    {/* Footer del Post */}
                    <div className="mt-6 pt-4 border-t border-border/20 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs text-primary border border-primary/30">
                          {article.author[0]}
                        </div>
                        <span className="text-[10px] font-medium text-muted-foreground">{article.author}</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-primary group-hover:translate-x-1 transition-transform">
                        {article.videoUrl ? "Ver Video" : "Leer Más"} <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <Footer />
      </main>
    </LanguageProvider>
  )
}
