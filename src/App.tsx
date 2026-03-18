/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, Settings, Video, Palette, Smartphone, ShoppingBag, 
  BrainCircuit, User, Mail, MessageCircle, Instagram, 
  ChevronUp, Menu, X, CheckCircle2, Star, Zap, TrendingUp,
  Award, Users, PlayCircle, BookOpen, ExternalLink, Send
} from 'lucide-react';

// --- Constants & Data ---
const BUSINESS_NAME = "EBMG 360 Digital";
const OWNER_NAME = "Ezequiel Medina";
const WHATSAPP_NUMBER = "584129126548";
const INSTAGRAM_URL = "https://ig.me/m/ezequielbenjamin1202";
const TIKTOK_URL = "https://www.tiktok.com/@ezequielmedina630";

const DEFAULT_MSG = encodeURIComponent("¡Hola! 🚀 Visité la página web de EBMG 360 Digital y me interesa saber más sobre sus servicios. ¿Podrían darme más información?");

const SERVICES = [
  {
    id: 'web',
    icon: <Globe className="w-10 h-10 text-accent" />,
    title: "Creación de Páginas Web 🌐",
    desc: "Diseñamos y desarrollamos páginas web modernas, atractivas, responsive y optimizadas para buscadores. Creamos landing pages, portafolios profesionales, páginas corporativas, blogs y tiendas online.",
    features: ["Diseño personalizado", "100% Responsive", "Optimización SEO", "Velocidad de carga", "Soporte post-entrega"],
    msg: "¡Hola! Soy de EBMG 360 Digital. Me interesa el servicio de creación de páginas web. ¿Podrían darme más información sobre precios y tiempos de entrega? 🌐"
  },
  {
    id: 'systems',
    icon: <Settings className="w-10 h-10 text-primary" />,
    title: "Desarrollo de Sistemas Web ⚙️",
    desc: "Desarrollamos sistemas web a medida: inventarios, CRM, paneles administrativos, sistemas de reservas, plataformas de cursos, facturación y puntos de venta.",
    features: ["Desarrollo a medida", "Base de datos segura", "Panel intuitivo", "Escalable", "Capacitación incluida"],
    msg: "¡Hola! Contacto desde EBMG 360 Digital. Necesito un sistema web personalizado para mi negocio. ¿Podemos hablar sobre mi proyecto? ⚙️"
  },
  {
    id: 'video',
    icon: <Video className="w-10 h-10 text-secondary" />,
    title: "Edición de Videos 🎬",
    desc: "Servicio profesional para YouTube, TikTok, Reels, Facebook y presentaciones corporativas. Cortes, montaje, efectos y corrección de color.",
    features: ["Montaje profesional", "Motion graphics", "Corrección de color", "Subtítulos animados", "Formatos optimizados"],
    msg: "¡Hola! Escribo desde EBMG 360 Digital. Me interesa el servicio de edición de videos profesional. ¿Cuáles son sus precios y tiempos de entrega? 🎬"
  }
];

const CANVA_DESIGNS = [
  { name: "Logos e identidad", price: "5", icon: "🎨" },
  { name: "Flyers y publicidad", price: "3", icon: "📄" },
  { name: "Posts redes sociales", price: "2", icon: "📱" },
  { name: "Historias IG/WA", price: "2", icon: "📖" },
  { name: "Tarjetas presentación", price: "3", icon: "💼" },
  { name: "Invitaciones eventos", price: "4", icon: "💌" },
  { name: "Menús restaurantes", price: "5", icon: "🍽️" },
  { name: "Portadas YouTube", price: "4", icon: "🎬" },
  { name: "Portadas Facebook", price: "3", icon: "📘" },
  { name: "Currículum vitae", price: "5", icon: "📝" },
  { name: "Certificados", price: "3", icon: "🏆" },
  { name: "Catálogos productos", price: "8", icon: "📦" },
  { name: "Presentaciones", price: "6", icon: "📊" },
];

const EARNING_APPS = [
  { name: "Gamony", tag: "🔥 Popular", desc: "Juega minijuegos y gana premios.", icon: "🎮", url: "https://gamony.com" },
  { name: "JumpTask", tag: "🔥 Recomendado", desc: "Microtareas y encuestas pagadas.", icon: "📋", url: "https://www.jumptask.io" },
  { name: "Cashzine", tag: "✅ Gratis", desc: "Gana dinero leyendo noticias.", icon: "📰", url: "https://www.cashzine.com" },
  { name: "Poll Pay", tag: "✅ Gratis", desc: "Encuestas pagadas fáciles.", icon: "📊", url: "https://pollpay.app" },
  { name: "Sweatcoin", tag: "✅ Gratis", desc: "Gana por caminar y estar activo.", icon: "🚶", url: "https://sweatco.in" },
  { name: "Google Rewards", tag: "🔥 Google", desc: "Créditos por encuestas cortas.", icon: "🔍", url: "https://play.google.com/store/apps/details?id=com.google.android.apps.paidtasks" },
  { name: "Kwai", tag: "✅ Gratis", desc: "Crea y mira videos cortos.", icon: "📹", url: "https://www.kwai.com" },
  { name: "TikTok Lite", tag: "🆕 Nuevo", desc: "Mira videos y gana recompensas.", icon: "🎵", url: "https://www.tiktok.com/lite/" },
  { name: "Honeygain", tag: "💤 Pasivo", desc: "Gana compartiendo tu internet.", icon: "📡", url: "https://www.honeygain.com" },
  { name: "AttaPoll", tag: "✅ Gratis", desc: "Encuestas con retiro bajo.", icon: "✅", url: "https://attapoll.com" },
];

const OFFERS = {
  shein: [
    { title: "Ropa de Moda", discount: "-70% OFF", desc: "Últimas tendencias", url: "https://www.shein.com" },
    { title: "Accesorios", discount: "-60% OFF", desc: "Bolsos y joyería", url: "https://www.shein.com" },
    { title: "Cupón Descuento", discount: "Extra", desc: "Código referido", url: "https://www.shein.com" },
  ],
  komvii: [
    { title: "Tecnología", discount: "Gadgets", desc: "Accesorios celular", url: "https://www.komvii.com" },
    { title: "Hogar", discount: "Decoración", desc: "Cocina y más", url: "https://www.komvii.com" },
    { title: "Más Vendidos", discount: "Top", desc: "Mejor valorados", url: "https://www.komvii.com" },
  ],
  guaybo: [
    { title: "Destacados", discount: "Ofertas", desc: "Mejores precios", url: "https://www.guaybo.com" },
    { title: "Promociones", discount: "-80% OFF", desc: "Semanales", url: "https://www.guaybo.com" },
    { title: "Catálogo", discount: "Full", desc: "Miles de productos", url: "https://www.guaybo.com" },
  ]
};

const AI_COURSES = {
  free: [
    { title: "ChatGPT desde Cero", time: "4h", platform: "YouTube", level: "Básico", color: "bg-green-500" },
    { title: "Google Gemini", time: "3h", platform: "Google", level: "Básico", color: "bg-green-500" },
    { title: "Qwen AI (Alibaba)", time: "2.5h", platform: "YouTube", level: "Intermedio", color: "bg-yellow-500" },
    { title: "Claude AI (Anthropic)", time: "2h", platform: "YouTube", level: "Básico", color: "bg-green-500" },
    { title: "Microsoft Copilot", time: "3h", platform: "MS Learn", level: "Básico", color: "bg-green-500" },
    { title: "IA para Imágenes", time: "5h", platform: "YouTube", level: "Intermedio", color: "bg-yellow-500" },
    { title: "Prompt Engineering", time: "3h", platform: "Coursera", level: "Básico", color: "bg-green-500" },
  ],
  premium: [
    { title: "ChatGPT Masterclass", price: "12.99", old: "89.99", level: "Avanzado", color: "bg-red-500" },
    { title: "IA para Negocios", price: "29.99", old: "149.99", level: "Intermedio", color: "bg-yellow-500" },
    { title: "Automatización IA", price: "19.99", old: "99.99", level: "Avanzado", color: "bg-red-500" },
    { title: "Marketing con IA", price: "14.99", old: "59.99", level: "Intermedio", color: "bg-yellow-500" },
    { title: "Prompt Engineering Pro", price: "24.99", old: "129.99", level: "Avanzado", color: "bg-red-500" },
    { title: "IA para Programadores", price: "34.99", old: "199.99", level: "Avanzado", color: "bg-red-500" },
  ]
};

// --- Components ---

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-white/60 max-w-2xl mx-auto text-lg"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offerTab, setOfferTab] = useState<'shein' | 'komvii' | 'guaybo'>('shein');
  const [courseTab, setCourseTab] = useState<'free' | 'premium'>('free');

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => setLoading(false), 1500);
    const popupTimer = setTimeout(() => setShowPopup(true), 4000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      clearTimeout(popupTimer);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    const formData = new FormData(formRef.current);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !subject || !message) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const waMsg = `¡Hola! 🚀 EBMG 360 Digital\n📋 *MENSAJE DESDE LA WEB*\n\n👤 *Nombre:* ${name}\n📧 *Email:* ${email}\n📌 *Asunto:* ${subject}\n\n💬 *Mensaje:*\n${message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMsg)}`, '_blank');
    formRef.current.reset();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-dark-bg flex items-center justify-center z-[100]">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* --- Navigation --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark-bg/80 backdrop-blur-lg py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-primary">EBMG</span>
            <span className="gradient-text">360 Digital</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {['Inicio', 'Servicios', 'Apps', 'Ofertas', 'Cursos IA', 'Sobre Nosotros', 'Contacto'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className="text-white/70 hover:text-primary transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-8 h-8" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-dark-bg z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-2xl font-bold"><span className="text-primary">EBMG</span> 360</span>
              <button onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
            </div>
            <div className="flex flex-col gap-6 text-xl">
              {['Inicio', 'Servicios', 'Apps', 'Ofertas', 'Cursos IA', 'Sobre Nosotros', 'Contacto'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Hero Section --- */}
      <section id="inicio" className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          >
            Bienvenido a <br />
            <span className="gradient-text">EBMG 360 Digital</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-3xl mx-auto mb-10"
          >
            Tu portal integral de soluciones digitales: desarrollo web, sistemas, edición de video, diseño gráfico, apps para generar ingresos, cursos de IA y las mejores ofertas online.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-20"
          >
            <a href="#servicios" className="btn-primary">Explorar Servicios</a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("¡Hola! 🚀 Quiero información sobre los servicios de EBMG 360 Digital.")}`} target="_blank" className="btn-outline flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Contáctanos
            </a>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Proyectos Realizados", val: "100+", icon: <Zap /> },
              { label: "Apps Recomendadas", val: "10+", icon: <Smartphone /> },
              { label: "Cursos de IA", val: "20+", icon: <BrainCircuit /> },
              { label: "Clientes Satisfechos", val: "50+", icon: <Users /> },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 glass-card"
              >
                <div className="text-primary mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold mb-1">{stat.val}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="servicios" className="py-24 bg-dark-bg2">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Nuestros Servicios" 
            subtitle="En EBMG 360 Digital ofrecemos soluciones digitales completas para impulsar tu negocio o proyecto personal"
          />

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {SERVICES.map((s, i) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 glass-card flex flex-col h-full"
              >
                <div className="mb-6">{s.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-white/60 mb-6 flex-grow">{s.desc}</p>
                <ul className="space-y-3 mb-8">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(s.msg)}`}
                  target="_blank"
                  className="btn-primary text-center py-2 text-sm"
                >
                  Solicitar Cotización
                </a>
              </motion.div>
            ))}
          </div>

          {/* Canva Sub-section */}
          <div className="glass-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
              <div className="p-6 bg-primary/20 rounded-2xl">
                <Palette className="w-16 h-16 text-primary" />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-4">Diseños en Canva 🎨</h3>
                <p className="text-white/60 max-w-2xl">
                  Creamos diseños gráficos profesionales y personalizados para cualquier necesidad usando Canva Pro. Desde identidad de marca hasta material publicitario.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10">
              {CANVA_DESIGNS.map((d, i) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                  <div className="text-2xl mb-2">{d.icon}</div>
                  <div className="font-medium text-sm mb-1">{d.name}</div>
                  <div className="text-primary font-bold">Desde ${d.price}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("¡Hola! Contacto desde EBMG 360 Digital. Necesito un diseño gráfico en Canva. ¿Podrían darme más información sobre precios y tiempos? 🎨")}`}
                target="_blank"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Palette className="w-5 h-5" /> Pedir Diseño por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- Apps Section --- */}
      <section id="apps" className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Gana Dinero desde tu Celular" 
            subtitle="En EBMG 360 Digital te recomendamos las mejores apps verificadas para generar ingresos extras de forma sencilla"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {EARNING_APPS.map((app, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 glass-card flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-4">{app.icon}</div>
                <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full mb-3 uppercase tracking-wider">
                  {app.tag}
                </div>
                <h4 className="text-xl font-bold mb-2">{app.name}</h4>
                <p className="text-white/50 text-sm mb-6 flex-grow">{app.desc}</p>
                <a 
                  href={app.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-white/10 hover:bg-primary transition-colors rounded-lg font-semibold text-sm text-center"
                >
                  Registrarme
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Offers Section --- */}
      <section id="ofertas" className="py-24 bg-dark-bg3">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Las Mejores Ofertas y Productos" 
            subtitle="EBMG 360 Digital te trae descuentos exclusivos y productos increíbles de las mejores tiendas online"
          />

          <div className="max-w-4xl mx-auto">
            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-12">
              {(['shein', 'komvii', 'guaybo'] as const).map(tab => (
                <button 
                  key={tab}
                  onClick={() => setOfferTab(tab)}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${offerTab === tab ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {OFFERS[offerTab].map((offer, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 glass-card text-center relative overflow-hidden group"
                >
                  <div className={`absolute top-0 right-0 p-2 text-[10px] font-bold uppercase tracking-tighter ${offerTab === 'shein' ? 'bg-secondary' : offerTab === 'komvii' ? 'bg-accent' : 'bg-green-500'}`}>
                    {offer.discount}
                  </div>
                  <ShoppingBag className={`w-12 h-12 mx-auto mb-4 ${offerTab === 'shein' ? 'text-secondary' : offerTab === 'komvii' ? 'text-accent' : 'text-green-500'}`} />
                  <h4 className="text-xl font-bold mb-2">{offer.title}</h4>
                  <p className="text-white/50 text-sm mb-6">{offer.desc}</p>
                  <a 
                    href={offer.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-block px-6 py-2 rounded-lg font-bold text-sm transition-transform active:scale-95 ${offerTab === 'shein' ? 'bg-secondary' : offerTab === 'komvii' ? 'bg-accent' : 'bg-green-500'}`}
                  >
                    Ver Oferta
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- AI Courses Section --- */}
      <section id="cursos-ia" className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Cursos de Inteligencia Artificial" 
            subtitle="EBMG 360 Digital te selecciona los mejores cursos para dominar las herramientas de IA más poderosas del momento"
          />

          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center gap-4 mb-12">
              <button 
                onClick={() => setCourseTab('free')}
                className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${courseTab === 'free' ? 'bg-green-500 text-white' : 'bg-white/5 text-white/50'}`}
              >
                🆓 Cursos Gratis
              </button>
              <button 
                onClick={() => setCourseTab('premium')}
                className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${courseTab === 'premium' ? 'bg-primary text-white' : 'bg-white/5 text-white/50'}`}
              >
                💎 Cursos Premium
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courseTab === 'free' ? (
                AI_COURSES.free.map((c, i) => (
                  <motion.div key={i} className="p-6 glass-card flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-green-500/10 rounded-lg"><BrainCircuit className="text-green-500" /></div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold px-2 py-1 bg-green-500 rounded text-white uppercase">Gratis</span>
                        <span className="flex items-center gap-1 text-[10px] text-white/50">
                          <span className={`w-2 h-2 rounded-full ${c.color}`}></span> {c.level}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{c.title}</h4>
                    <div className="text-xs text-white/40 mb-4">{c.time} · {c.platform}</div>
                    <p className="text-sm text-white/60 mb-6 flex-grow">Aprende los fundamentos y técnicas avanzadas de esta herramienta de IA.</p>
                    <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`¡Hola! 🚀 Estoy interesado en el curso de IA: *${c.title}* (Gratis). ¿Podrías darme más información? 😊`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-green-500 hover:bg-green-600 transition-colors rounded-lg text-center font-bold text-sm"
                    >
                      Acceder Gratis
                    </a>
                  </motion.div>
                ))
              ) : (
                AI_COURSES.premium.map((c, i) => (
                  <motion.div key={i} className="p-6 glass-card flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg"><Star className="text-primary" /></div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold px-2 py-1 bg-primary rounded text-white uppercase">Premium</span>
                        <span className="flex items-center gap-1 text-[10px] text-white/50">
                          <span className={`w-2 h-2 rounded-full ${c.color}`}></span> {c.level}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{c.title}</h4>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-primary">${c.price}</span>
                      <span className="text-sm text-white/30 line-through">${c.old}</span>
                    </div>
                    <p className="text-sm text-white/60 mb-6 flex-grow">Domina herramientas avanzadas con casos reales y certificación profesional.</p>
                    <a 
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`¡Hola! 🚀 Estoy interesado en el curso de IA: *${c.title}* (Premium). ¿Podrías darme más información? 😊`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 bg-primary hover:bg-primary/80 transition-colors rounded-lg text-center font-bold text-sm"
                    >
                      Inscribirme
                    </a>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- About Us Section --- */}
      <section id="sobre-nosotros" className="py-24 bg-dark-bg2">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border-4 border-primary/30 p-2">
                <div className="w-full h-full bg-dark-bg3 flex items-center justify-center text-9xl rounded-2xl">
                  👨‍💻
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary px-6 py-3 rounded-2xl font-bold shadow-xl animate-float">
                🚀 Emprendedor Digital
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Sobre <span className="gradient-text">EBMG 360 Digital</span></h2>
              <h3 className="text-xl text-primary font-semibold mb-6">Conoce a {OWNER_NAME} y su visión</h3>
              <div className="space-y-4 text-white/70 mb-8">
                <p>EBMG 360 Digital nace de la pasión por la tecnología, el desarrollo web, la edición de video, el diseño gráfico, el emprendimiento digital y la inteligencia artificial.</p>
                <p>Nuestra misión es brindarte soluciones digitales completas: desde crear tu página web o sistema personalizado, hasta editar tus videos profesionalmente, diseñar tu marca, recomendarte las mejores apps para generar ingresos, cursos de IA de calidad y las mejores ofertas del mercado.</p>
                <p>Creemos en la transformación digital accesible para todos. Por eso ofrecemos servicios profesionales a precios justos y compartimos herramientas gratuitas para que cualquiera pueda emprender en el mundo digital.</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                {["🌐 Desarrollo Web", "⚙️ Sistemas Web", "🎬 Edición de Video", "🎨 Diseño Gráfico", "💰 Apps de Ingreso", "🤖 Inteligencia Artificial", "📱 Marketing Digital", "🛍️ E-commerce", "📊 Emprendimiento Digital"].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-white/5 rounded-full text-xs font-medium border border-white/10">{skill}</span>
                ))}
              </div>

              <div className="flex gap-4">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("¡Hola! Soy de EBMG 360 Digital. Vi su página y quiero conectar. 😊")}`} target="_blank" className="p-3 bg-green-500 rounded-xl hover:scale-110 transition-transform"><MessageCircle /></a>
                <a href={INSTAGRAM_URL} target="_blank" className="p-3 bg-linear-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-xl hover:scale-110 transition-transform"><Instagram /></a>
                <a href={TIKTOK_URL} target="_blank" className="p-3 bg-black rounded-xl hover:scale-110 transition-transform border border-white/20"><TrendingUp /></a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contacto" className="py-24">
        <div className="container mx-auto px-6">
          <SectionTitle 
            title="Ponte en Contacto" 
            subtitle="¿Tienes un proyecto en mente, necesitas un servicio o tienes alguna pregunta? ¡Escríbenos!"
          />

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Info */}
            <div>
              <div className="grid gap-4 mb-12">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="p-6 glass-card flex items-center gap-6 group">
                  <div className="p-4 bg-green-500/10 text-green-500 rounded-2xl group-hover:bg-green-500 group-hover:text-white transition-colors"><MessageCircle /></div>
                  <div>
                    <div className="font-bold">WhatsApp</div>
                    <div className="text-white/50 text-sm">+58 412 912 6548</div>
                  </div>
                </a>
                <a href={INSTAGRAM_URL} target="_blank" className="p-6 glass-card flex items-center gap-6 group">
                  <div className="p-4 bg-secondary/10 text-secondary rounded-2xl group-hover:bg-secondary group-hover:text-white transition-colors"><Instagram /></div>
                  <div>
                    <div className="font-bold">Instagram</div>
                    <div className="text-white/50 text-sm">@ezequielbenjamin1202</div>
                  </div>
                </a>
                <a href={TIKTOK_URL} target="_blank" className="p-6 glass-card flex items-center gap-6 group">
                  <div className="p-4 bg-accent/10 text-accent rounded-2xl group-hover:bg-accent group-hover:text-white transition-colors"><TrendingUp /></div>
                  <div>
                    <div className="font-bold">TikTok</div>
                    <div className="text-white/50 text-sm">@ezequielmedina630</div>
                  </div>
                </a>
              </div>

              <h3 className="text-xl font-bold mb-6">📩 Escríbenos con un solo clic:</h3>
              <div className="flex flex-col gap-4">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("¡Hola! 🚀 Escribo desde la web de EBMG 360 Digital. Estoy interesado en sus servicios. ¿Podrían darme más información?")}`} target="_blank" className="w-full py-4 bg-green-500 rounded-xl font-bold text-center flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20">
                  <MessageCircle /> Enviar Mensaje WhatsApp
                </a>
                <a href={INSTAGRAM_URL} target="_blank" className="w-full py-4 bg-linear-to-r from-secondary to-purple-600 rounded-xl font-bold text-center flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20">
                  <Instagram /> Enviar DM Instagram
                </a>
                <a href={TIKTOK_URL} target="_blank" className="w-full py-4 bg-black border border-white/20 rounded-xl font-bold text-center flex items-center justify-center gap-2 hover:bg-white/5 transition-colors">
                  <TrendingUp /> Seguir en TikTok
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="glass-card p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-2">Envíanos un mensaje</h3>
              <p className="text-white/50 mb-8">Completa el formulario y te respondemos por WhatsApp</p>
              
              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Tu nombre" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors" />
                <input type="email" name="email" placeholder="Tu email" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors" />
                <input type="text" name="subject" placeholder="Asunto" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors" />
                <textarea name="message" placeholder="Escribe tu mensaje aquí..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Enviar por WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-dark-bg3 pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <a href="#" className="text-2xl font-bold flex items-center gap-2 mb-6">
                <span className="text-primary">EBMG</span>
                <span className="gradient-text">360 Digital</span>
              </a>
              <p className="text-white/50 mb-8 max-w-sm">Tu portal digital integral para servicios web, diseño, edición de video, apps para generar ingresos, cursos de IA y las mejores ofertas online.</p>
              <div className="flex gap-4">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="text-white/50 hover:text-green-500 transition-colors"><MessageCircle /></a>
                <a href={INSTAGRAM_URL} className="text-white/50 hover:text-secondary transition-colors"><Instagram /></a>
                <a href={TIKTOK_URL} className="text-white/50 hover:text-accent transition-colors"><TrendingUp /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6">Servicios</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><a href="#servicios" className="hover:text-primary transition-colors">Páginas Web</a></li>
                <li><a href="#servicios" className="hover:text-primary transition-colors">Sistemas Web</a></li>
                <li><a href="#servicios" className="hover:text-primary transition-colors">Edición de Video</a></li>
                <li><a href="#servicios" className="hover:text-primary transition-colors">Diseños Canva</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Apps</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><a href="#apps" className="hover:text-primary transition-colors">Gamony</a></li>
                <li><a href="#apps" className="hover:text-primary transition-colors">JumpTask</a></li>
                <li><a href="#apps" className="hover:text-primary transition-colors">Honeygain</a></li>
                <li><a href="#apps" className="hover:text-primary transition-colors">Sweatcoin</a></li>
                <li><a href="#apps" className="hover:text-primary transition-colors">AttaPoll</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Cursos IA</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><a href="#cursos-ia" className="hover:text-primary transition-colors">ChatGPT</a></li>
                <li><a href="#cursos-ia" className="hover:text-primary transition-colors">Gemini</a></li>
                <li><a href="#cursos-ia" className="hover:text-primary transition-colors">Qwen</a></li>
                <li><a href="#cursos-ia" className="hover:text-primary transition-colors">Claude</a></li>
                <li><a href="#cursos-ia" className="hover:text-primary transition-colors">Copilot</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 text-center">
            <p className="text-white/30 text-sm mb-4">© 2025 EBMG 360 Digital - Todos los derechos reservados.</p>
            <p className="text-white/20 text-[10px] max-w-2xl mx-auto">⚠️ Este sitio contiene enlaces de afiliado. Al usar estos enlaces, apoyas nuestro trabajo sin costo adicional para ti.</p>
          </div>
        </div>
      </footer>

      {/* --- Floating Elements --- */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            >
              <ChevronUp className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
        
        <div className="relative group">
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MSG}`}
            target="_blank"
            className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg animate-pulse-green hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-10 h-10 fill-white text-white" />
          </a>
          <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-white text-dark-bg px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Escríbenos por WhatsApp
          </div>
        </div>
      </div>

      {/* --- Welcome Popup --- */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="relative bg-dark-bg2 p-8 md:p-12 rounded-3xl max-w-lg w-full text-center border border-white/10"
            >
              <button onClick={() => setShowPopup(false)} className="absolute top-4 right-4 text-white/50 hover:text-white"><X /></button>
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-3xl font-bold mb-4">¡Bienvenido a <br /><span className="gradient-text">EBMG 360 Digital</span>!</h2>
              <p className="text-white/60 mb-8">Descubre nuestros servicios profesionales: desarrollo web, sistemas, edición de video, diseños, apps para ganar dinero, cursos de IA y ofertas exclusivas. ¡Conéctate con nosotros!</p>
              
              <div className="flex flex-col gap-3">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MSG}`} target="_blank" className="w-full py-3 bg-green-500 rounded-xl font-bold flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" /> WhatsApp
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a href={INSTAGRAM_URL} target="_blank" className="py-3 bg-linear-to-r from-secondary to-purple-600 rounded-xl font-bold flex items-center justify-center gap-2 text-sm">
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                  <a href={TIKTOK_URL} target="_blank" className="py-3 bg-black border border-white/20 rounded-xl font-bold flex items-center justify-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4" /> TikTok
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
