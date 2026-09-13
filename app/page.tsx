"use client";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SmoothScroll from "@/components/SmoothScroll";
import FabricCanvas from "@/components/FabricCanvas";
import { 
  ArrowUpRight, 
  Heart, 
  SlidersHorizontal, 
  ArrowRight, 
  ShieldCheck, 
  X, 
  Sun, 
  Moon, 
  Check, 
  Truck, 
  RotateCcw
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  desc: string;
  specs: string[];
  shopierUrl: string;
  image: string;
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const floatingTeeRef = useRef<HTMLDivElement>(null);
  const leftTeeRef = useRef<HTMLDivElement>(null);
  const rightTeeRef = useRef<HTMLDivElement>(null);

  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightSpecRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const categories = [
    { name: "T-Shirts", count: "8 Parça", img: "/beyazz.png" },
    { name: "Hoodies", count: "5 Parça", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop" },
    { name: "Sweatshirts", count: "6 Parça", img: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=600&auto=format&fit=crop" },
    { name: "Accessories", count: "4 Parça", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop" },
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Essential Logo Tee",
      category: "T-Shirts",
      price: "1.250 TL",
      colors: [
        { name: "Off-White", hex: "#ECEAE4" },
        { name: "Charcoal", hex: "#161616" },
        { name: "Carmine Red", hex: "#C84B31" }
      ],
      sizes: ["S", "M", "L", "XL"],
      desc: "280 GSM %100 saf kompakt penye pamuk. Formunu koruyan dikişsiz yaka ve düşük omuz mimarisi.",
      specs: ["%100 Ring Pamuk", "Oversized Kalıp", "Unisex Form"],
      shopierUrl: "https://www.shopier.com/",
      image: "/beyazz.png"
    },
    {
      id: 2,
      name: "Heavy Structure Hoodie",
      category: "Hoodies",
      price: "1.950 TL",
      colors: [
        { name: "Bone White", hex: "#DCD9D1" },
        { name: "Pitch Black", hex: "#141414" }
      ],
      sizes: ["S", "M", "L", "XL"],
      desc: "480 GSM şardonlu kompakt polar dokuma. Çift katmanlı dik duran kapüşon ve gizli yan cepler.",
      specs: ["480 GSM Ağırlık", "İçi Şardonlu Doku", "Kordon Detaylı"],
      shopierUrl: "https://www.shopier.com/",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Studio Relaxed Sweat",
      category: "Sweatshirts",
      price: "1.650 TL",
      colors: [
        { name: "Raw Sand", hex: "#ECEAE4" },
        { name: "Slate Grey", hex: "#524F4A" }
      ],
      sizes: ["M", "L", "XL"],
      desc: "Özel enzim yıkamalı pürüzsüz doku. Ağır gramajlı dökümlü mimari stüdyo kesimi.",
      specs: ["Enzim Yıkamalı", "Dökümlü Kesim", "Tüylenmez Kumaş"],
      shopierUrl: "https://www.shopier.com/",
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Canvas Minimalist Cap",
      category: "Accessories",
      price: "750 TL",
      colors: [
        { name: "Matte Black", hex: "#161616" },
        { name: "Stone Dust", hex: "#B3ADA3" }
      ],
      sizes: ["Standart"],
      desc: "Mat fırçalanmış metal tokalı ayarlanabilir arka kayış. Formunu koruyan 6 panel.",
      specs: ["%100 Pamuk Kanvas", "Mat Metal Toka", "Yapılandırılmış Form"],
      shopierUrl: "https://www.shopier.com/",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const filteredProducts = activeCategory === "Tümü"
    ? products
    : products.filter(p => p.category === activeCategory);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)",
    }, (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean };

      // MOBİL İÇİN YAVAŞ, ADIM ADIM İLERLEYEN ZAMAN ÇİZELGESİ
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: "top top",
          end: isMobile ? "+=550%" : "+=240%", // Mobilde mesafeyi 5.5 katına çıkarıp yavaşlattık
          scrub: isMobile ? 1.5 : 0.8,         // Yüksek scrub parmak kaydırmasını toklaştırır
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. KAYDIRMA: Yazılar kaybolur, beyaz tişört sola hafifçe meyledip sahneye yerleşir
      tl.to([leftTextRef.current, rightSpecRef.current], {
        y: -40,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      })
      .to(watermarkRef.current, {
        opacity: 0.01,
        scale: 1.05,
        duration: 1
      }, "<")
      .to(floatingTeeRef.current, {
        rotateZ: isMobile ? -5 : -6,
        x: isMobile ? -15 : -35,
        scale: isMobile ? 1.08 : 1.15,
        duration: 1.2,
        ease: "power1.inOut"
      }, "<")

      // 2. KAYDIRMA: Sol arkadan Kırmızı tişört süzülerek gelir
      .fromTo(leftTeeRef.current, 
        { 
          opacity: 0, 
          x: isMobile ? -160 : -320, 
          rotateZ: -12,
          scale: isMobile ? 0.8 : 0.95
        },
        { 
          opacity: 1, 
          x: isMobile ? -75 : -190, 
          rotateZ: -5, 
          scale: isMobile ? 0.92 : 1.02, 
          duration: 1.5, 
          ease: "power2.out" 
        }
      )

      // 3. KAYDIRMA: Sağ arkadan Siyah tişört süzülerek gelir (3'lü deste kilitlenir)
      .fromTo(rightTeeRef.current,
        { 
          opacity: 0, 
          x: isMobile ? 160 : 320, 
          rotateZ: 10,
          scale: isMobile ? 0.8 : 0.95
        },
        { 
          opacity: 1, 
          x: isMobile ? 75 : 190, 
          rotateZ: -8, 
          scale: isMobile ? 0.92 : 1.02, 
          duration: 1.5, 
          ease: "power2.out" 
        }
      );
    });

  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <SmoothScroll>
      <div 
        ref={containerRef} 
        className={`min-h-screen font-sans transition-colors duration-500 overflow-x-hidden w-full ${
          isDarkMode ? "bg-[#0D0D0D] text-[#F5F4F0]" : "bg-[#F8F7F4] text-[#141414]"
        }`}
      >
        
        {/* Header */}
        <header className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-8 md:px-16 py-4 md:py-6 border-b backdrop-blur-md transition-colors duration-500 ${
          isDarkMode ? "bg-[#0D0D0D]/85 border-white/[0.08]" : "bg-[#F8F7F4]/85 border-black/[0.04]"
        }`}>
          <a href="#" className="font-serif tracking-[0.25em] text-xs sm:text-sm md:text-base font-semibold uppercase">
            GMore & Co
          </a>

          <nav className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.25em] font-medium opacity-60">
            <a href="#kategoriler" className="hover:opacity-100 transition-opacity">Katalog</a>
            <a href="#koleksiyon" className="hover:opacity-100 transition-opacity">Seçki</a>
            <a href="#lookbook" className="hover:opacity-100 transition-opacity">Lookbook</a>
            <a href="#manifesto" className="hover:opacity-100 transition-opacity">Manifesto</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border transition-all duration-300 ${
                isDarkMode 
                  ? "border-neutral-800 bg-neutral-900 text-amber-300 hover:border-neutral-700" 
                  : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300 shadow-sm"
              }`}
              title={isDarkMode ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a
              href="#koleksiyon"
              className={`text-[10px] sm:text-[11px] tracking-[0.2em] uppercase border-b pb-0.5 transition-all ${
                isDarkMode ? "border-white/40 hover:border-white text-neutral-200" : "border-black/40 hover:border-black text-neutral-800"
              }`}
            >
              Vitrin
            </a>
          </div>
        </header>

        {/* 1. KISIM: KATMANLI, BÜYÜK VE TOK MOBİL HERO ALANI */}
        <section ref={heroWrapperRef} className="relative w-full h-[100svh] min-h-[580px] flex items-center justify-center overflow-hidden px-4">
          
          <FabricCanvas isDarkMode={isDarkMode} />

          <div 
            ref={watermarkRef} 
            className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none text-[22vw] md:text-[18vw] font-serif font-light tracking-tight uppercase transition-colors duration-500 z-0 ${
              isDarkMode ? "text-white/[0.02]" : "text-black/[0.035]"
            }`}
          >
            Edition
          </div>

          <div ref={leftTextRef} className="absolute top-20 sm:top-24 md:top-auto md:left-20 z-10 text-center md:text-left max-w-xs md:max-w-sm pointer-events-none px-2">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] opacity-40 block mb-1 md:mb-3">
              01 // Koleksiyon
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.1]">
              Pure Form.
            </h1>
            <p className="hidden sm:block text-xs opacity-60 mt-3 md:mt-4 leading-relaxed tracking-wide">
              Ağırlık yapmayan, bedene oturan mimari hatlar ve saf pamuk dokuma.
            </p>
          </div>

          {/* SIKIŞMAYA İZİN VERMEYEN KATMANLI (ABSOLUTE) TİŞÖRT SAHNESİ */}
          <div className="relative z-20 flex items-center justify-center pointer-events-none w-full h-[380px] md:h-[460px] mt-6 sm:mt-0">
            
            {/* 1. Sol: Kırmızı Tişört (Arkada, z-10) */}
            <div 
              ref={leftTeeRef} 
              className="absolute w-[50vw] max-w-[280px] md:w-[320px] flex items-center justify-center opacity-0 will-change-transform z-10"
            >
              <img
                src="/red.png"
                alt="GMore Tee Red"
                className="w-full h-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.08)]"
                onError={(e) => {
                  e.currentTarget.src = "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvMzg4LXBhbGxvLTQxNDEtbXlyLTAzLnBuZw.png";
                  e.currentTarget.style.filter = "saturate(1.4) hue-rotate(320deg)";
                }}
              />
            </div>

            {/* 2. Merkez: Beyaz Tişört (Önde, z-20, DEV BOYUTTA w-[72vw]) */}
            <div 
              ref={floatingTeeRef} 
              className="relative w-[72vw] max-w-[340px] md:w-[390px] flex items-center justify-center will-change-transform z-20"
            >
              <img
                src="/beyazz.png"
                alt="GMore Tee White"
                className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.12)]"
                onError={(e) => {
                  e.currentTarget.src = "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvMzg4LXBhbGxvLTQxNDEtbXlyLTAzLnBuZw.png";
                }}
              />
            </div>

            {/* 3. Sağ: Siyah Tişört (Arkada, z-10) */}
            <div 
              ref={rightTeeRef} 
              className="absolute w-[50vw] max-w-[280px] md:w-[320px] flex items-center justify-center opacity-0 will-change-transform z-10"
            >
              <img
                src="/black.png"
                alt="GMore Tee Black"
                className="w-full h-auto object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.08)]"
                onError={(e) => {
                  e.currentTarget.src = "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvMzg4LXBhbGxvLTQxNDEtbXlyLTAzLnBuZw.png";
                  e.currentTarget.style.filter = "brightness(0.25)";
                }}
              />
            </div>

          </div>

          <div ref={rightSpecRef} className="absolute bottom-16 md:bottom-auto md:right-20 z-10 text-center md:text-right max-w-xs pointer-events-none hidden sm:block">
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 block mb-1 md:mb-2">Spesifikasyon</span>
            <p className="text-xs font-mono opacity-80 tracking-wider uppercase">280 GSM Ring Pamuk</p>
            <p className="text-xs font-mono opacity-60 tracking-wider uppercase mt-0.5">Dikişsiz Omuz Formu</p>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.3em] opacity-40 whitespace-nowrap z-10">
            Scroll ile keşfet ↓
          </div>
        </section>

        {/* KESİNTİSİZ KAYAN KUMAŞ BANDI */}
        <div className={`py-3.5 border-y overflow-hidden whitespace-nowrap select-none transition-colors duration-500 flex items-center ${
          isDarkMode ? "bg-black/80 border-white/[0.08] text-neutral-400" : "bg-[#EFECE6] border-black/[0.05] text-neutral-700"
        }`}>
          <div className="flex shrink-0 animate-marquee items-center gap-8 text-[11px] uppercase tracking-[0.25em] font-mono">
            <span>• 100% RING-SPUN KOMPAKT PAMUK</span>
            <span>• 280-480 GSM AĞIR DOKUMA</span>
            <span>• DİKİŞSİZ MİMARİ SİLÜET</span>
            <span>• SHOPIER 256-BIT GÜVENLİ ÖDEME</span>
            <span>• ZAMANSIZ FORM & RAHAT KALIP</span>
            <span>• 14 GÜN KOŞULSUZ İADE</span>
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-8 text-[11px] uppercase tracking-[0.25em] font-mono" aria-hidden="true">
            <span>• 100% RING-SPUN KOMPAKT PAMUK</span>
            <span>• 280-480 GSM AĞIR DOKUMA</span>
            <span>• DİKİŞSİZ MİMARİ SİLÜET</span>
            <span>• SHOPIER 256-BIT GÜVENLİ ÖDEME</span>
            <span>• ZAMANSIZ FORM & RAHAT KALIP</span>
            <span>• 14 GÜN KOŞULSUZ İADE</span>
          </div>
        </div>

        {/* 2. KISIM: Kategori Blokları */}
        <section id="kategoriler" className="py-16 sm:py-24 px-4 sm:px-8 md:px-20 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8 sm:mb-10">
            <div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase opacity-40">Katalog</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light mt-1">Kategorilere Göz At</h3>
            </div>
            <button 
              onClick={() => setActiveCategory("Tümü")}
              className="text-xs opacity-60 hover:opacity-100 flex items-center gap-1.5 transition-all group"
            >
              <span>Tümünü Gör</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`group cursor-pointer p-4 rounded-3xl transition-all duration-300 flex flex-col items-center justify-between aspect-square border ${
                  activeCategory === cat.name
                    ? isDarkMode 
                      ? "bg-neutral-900 border-white/20 shadow-lg" 
                      : "bg-white border-black/10 shadow-md ring-1 ring-black/5"
                    : isDarkMode
                      ? "bg-neutral-900/40 border-white/[0.04] hover:bg-neutral-900 hover:border-white/10"
                      : "bg-[#EFECE6]/70 border-transparent hover:bg-white hover:shadow-sm"
                }`}
              >
                <div className="w-full flex-1 flex items-center justify-center p-2 overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="max-h-20 sm:max-h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="text-center mt-2">
                  <h4 className="text-xs tracking-wider uppercase font-medium">{cat.name}</h4>
                  <span className="text-[10px] opacity-40 mt-0.5 block">{cat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. KISIM: 3D Tilt Ürün Izgarası */}
        <section id="koleksiyon" className="py-12 sm:py-16 px-4 sm:px-8 md:px-20 max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-current/10">
            <div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase opacity-40">Seçki</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light mt-1">
                {activeCategory === "Tümü" ? "Tüm Parçalar" : activeCategory}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
              <span className="hidden sm:flex text-xs opacity-40 mr-2 items-center gap-1 shrink-0">
                <SlidersHorizontal size={13} /> {filteredProducts.length} Ürün
              </span>
              {["Tümü", "T-Shirts", "Hoodies", "Sweatshirts", "Accessories"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] tracking-wider whitespace-nowrap transition-all shrink-0 ${
                    activeCategory === cat
                      ? isDarkMode ? "bg-white text-black font-medium" : "bg-black text-white font-medium shadow-sm"
                      : isDarkMode ? "bg-neutral-900 text-neutral-400 hover:bg-neutral-800" : "bg-[#EFECE6] text-neutral-600 hover:bg-[#e4e1da]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((item) => (
              <div 
                key={item.id} 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`group relative rounded-3xl p-4 flex flex-col justify-between transition-all duration-200 border will-change-transform ${
                  isDarkMode 
                    ? "bg-neutral-900/60 border-white/[0.05] hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]" 
                    : "bg-[#ECEAE4]/60 border-black/[0.03] hover:bg-white hover:border-black/5 hover:shadow-2xl"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`relative w-full aspect-[4/5] overflow-hidden rounded-2xl flex items-center justify-center p-4 mb-4 transition-colors ${
                  isDarkMode ? "bg-neutral-950/80" : "bg-white"
                }`}>
                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md shadow-sm transition-all ${
                      favorites.includes(item.id) 
                        ? "bg-red-500/10 text-red-500 scale-110" 
                        : isDarkMode ? "bg-neutral-900/80 text-neutral-400 hover:text-white" : "bg-white/80 text-neutral-400 hover:text-black"
                    }`}
                  >
                    <Heart size={14} fill={favorites.includes(item.id) ? "currentColor" : "none"} />
                  </button>

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-serif text-base font-normal tracking-tight leading-snug">
                      {item.name}
                    </h4>
                    <span className="font-mono text-xs font-semibold tracking-tight">{item.price}</span>
                  </div>

                  <p className="text-[11px] opacity-50 line-clamp-1">{item.desc}</p>

                  <div className="flex items-center gap-1.5 py-1">
                    {item.colors.map((c, i) => (
                      <span 
                        key={i} 
                        className="w-2.5 h-2.5 rounded-full border border-black/10 shadow-inner" 
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>

                  <div className="pt-3 border-t border-current/10 mt-1 flex items-center justify-between">
                    <span className="text-[9px] tracking-widest uppercase opacity-40">GMore Store</span>
                    <button
                      onClick={() => {
                        setSelectedProduct(item);
                        setSelectedColorIndex(0);
                        setSelectedSize(item.sizes[0]);
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] tracking-wider uppercase transition-all shadow-sm ${
                        isDarkMode 
                          ? "bg-white text-black hover:bg-neutral-200" 
                          : "bg-black text-white hover:bg-neutral-800"
                      }`}
                    >
                      <span>İncele</span>
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lookbook Bölümü */}
        <section id="lookbook" className={`py-24 px-4 sm:px-8 md:px-20 border-t transition-colors duration-500 ${
          isDarkMode ? "border-white/[0.06] bg-black/40" : "border-black/[0.04] bg-[#F2EFE9]"
        }`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              
              <div className="max-w-md">
                <span className="text-[10px] tracking-[0.35em] uppercase opacity-40 block mb-2">Lookbook 2026</span>
                <h3 className="font-serif text-3xl sm:text-4xl font-light tracking-tight leading-snug">
                  Mimariden İlham Alan Saf Kesimler.
                </h3>
                <p className="text-xs opacity-60 mt-4 leading-relaxed">
                  Her parça, stüdyodan sokağa günün her anında üzerinizde bir ağırlık hissettirmeden tok kalmak üzere tasarlandı.
                </p>
                <div className="flex gap-4 mt-6">
                  <div className="p-3 rounded-2xl border border-current/10 text-center flex-1">
                    <span className="font-mono text-sm font-semibold block">480 GSM</span>
                    <span className="text-[9px] uppercase tracking-wider opacity-50">Ağır Polar</span>
                  </div>
                  <div className="p-3 rounded-2xl border border-current/10 text-center flex-1">
                    <span className="font-mono text-sm font-semibold block">%100 Saf</span>
                    <span className="text-[9px] uppercase tracking-wider opacity-50">Kompakt Pamuk</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg group">
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" 
                    alt="Lookbook 1" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-lg group mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop" 
                    alt="Lookbook 2" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. KISIM: Manifesto */}
        <section id="manifesto" className={`py-24 px-6 sm:px-8 text-center flex flex-col items-center justify-center transition-colors duration-500 ${
          isDarkMode ? "bg-[#080808] text-white" : "bg-[#141414] text-[#F8F7F4]"
        }`}>
          <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase opacity-40 mb-3 sm:mb-4">GMore Standardı</span>
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-tight max-w-xl leading-relaxed">
            "Sadelik, karmaşanın elenip saf formun ortaya çıkmasıdır."
          </h3>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-10 px-4 sm:px-8 text-center text-xs opacity-40 border-t border-current/10">
          <div className="flex justify-center items-center gap-2 mb-2">
            <ShieldCheck size={14} />
            <span className="text-[10px] tracking-wider uppercase">Shopier Güvenli Ödeme Altyapısı</span>
          </div>
          <p className="text-[10px] tracking-widest uppercase">© {new Date().getFullYear()} GMore & Co. Tüm Hakları Saklıdır.</p>
        </footer>

        {/* Pop-up Modal */}
        {selectedProduct && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedProduct(null);
            }}
          >
            <div 
              data-lenis-prevent="true"
              className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border max-h-[85vh] overflow-y-auto overscroll-contain transition-all ${
                isDarkMode ? "bg-[#121212] border-white/10 text-white" : "bg-[#F8F7F4] border-black/5 text-neutral-900"
              }`}
            >
              
              <button 
                onClick={() => setSelectedProduct(null)}
                className={`absolute top-5 right-5 p-2 rounded-full transition-colors z-20 ${
                  isDarkMode ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-300" : "bg-neutral-200 hover:bg-neutral-300 text-neutral-700"
                }`}
              >
                <X size={17} />
              </button>

              <div className={`w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 flex items-center justify-center p-4 ${
                isDarkMode ? "bg-neutral-950" : "bg-white"
              }`}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex justify-between items-baseline mb-2">
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">{selectedProduct.category}</span>
                  <h4 className="font-serif text-2xl font-light mt-0.5">{selectedProduct.name}</h4>
                </div>
                <span className="font-mono text-xl font-medium tracking-tight">{selectedProduct.price}</span>
              </div>

              <p className="text-xs opacity-65 leading-relaxed mb-5">{selectedProduct.desc}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProduct.specs.map((spec, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-mono border ${
                      isDarkMode ? "border-white/10 bg-white/5 text-neutral-300" : "border-black/5 bg-black/5 text-neutral-700"
                    }`}
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="mb-5">
                <span className="text-[10px] uppercase tracking-wider opacity-40 block mb-2 font-mono">
                  Renk: <strong className="opacity-100">{selectedProduct.colors[selectedColorIndex].name}</strong>
                </span>
                <div className="flex items-center gap-2.5">
                  {selectedProduct.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColorIndex(i)}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                        selectedColorIndex === i 
                          ? "ring-2 ring-current scale-110" 
                          : "border-black/10 opacity-70 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColorIndex === i && (
                        <Check size={12} className={c.hex === "#161616" || c.hex === "#141414" ? "text-white" : "text-black"} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase tracking-wider opacity-40 font-mono">Beden</span>
                  <span className="text-[10px] underline opacity-40 cursor-pointer hover:opacity-80">Beden Rehberi</span>
                </div>
                <div className="flex gap-2">
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-mono font-medium transition-all border ${
                        selectedSize === s
                          ? isDarkMode 
                            ? "bg-white text-black border-white shadow-md" 
                            : "bg-black text-white border-black shadow-md"
                          : isDarkMode 
                            ? "bg-neutral-900 border-white/10 text-neutral-300 hover:border-white/30" 
                            : "bg-white border-black/10 text-neutral-700 hover:border-black/30"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-3 rounded-2xl border mb-6 flex justify-around text-center text-[10px] opacity-70 ${
                isDarkMode ? "border-white/10 bg-white/5" : "border-black/5 bg-black/5"
              }`}>
                <div className="flex items-center gap-1.5">
                  <Truck size={13} />
                  <span>Aynı Gün Ücretsiz Kargo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw size={13} />
                  <span>14 Gün Kolay İade</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href={selectedProduct.shopierUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-full text-center text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center gap-2 shadow-lg ${
                    isDarkMode 
                      ? "bg-white text-black hover:bg-neutral-200" 
                      : "bg-black text-white hover:bg-neutral-800"
                  }`}
                >
                  <span>Shopier İle Güvenle Satın Al</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </SmoothScroll>
  );
}