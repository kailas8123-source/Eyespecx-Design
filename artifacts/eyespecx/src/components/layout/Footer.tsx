import { Link } from "wouter";
import { motion } from "framer-motion";
import { Instagram, Youtube, Twitter } from "lucide-react";

const logoSrc = "/logo.png";

export function Footer() {
  return (
    <footer className="relative overflow-hidden" data-testid="footer">
      {/* Full-bleed dark image footer */}
      <div
        className="relative"
        style={{
          background: "linear-gradient(135deg, #090b10 0%, #0f1628 40%, #1a2040 70%, #090b10 100%)",
          minHeight: 420,
        }}
      >
        {/* Decorative blurred orbs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            filter: "blur(48px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(200,185,150,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Eyewear silhouette watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.04 }}
        >
          <img src={logoSrc} alt="" className="w-[600px] max-w-[80vw]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-8 py-16 md:py-20">
          {/* Top: logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center mb-14"
          >
            <img src={logoSrc} alt="Eyespecx" className="h-16 mb-5" style={{ filter: "brightness(0) invert(1)" }} />
            <p className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium mb-6">
              An Exclusive Optics Showroom
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Instagram className="h-4 w-4 text-white/70" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-youtube"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Youtube className="h-4 w-4 text-white/70" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-twitter"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Twitter className="h-4 w-4 text-white/70" />
              </a>
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-14"
          >
            {[
              { href: "/shop", label: "Shop All" },
              { href: "/collections", label: "Collections" },
              { href: "/shop?gender=men", label: "Men" },
              { href: "/shop?gender=women", label: "Women" },
              { href: "/orders", label: "Orders" },
              { href: "/cart", label: "Cart" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-white/50 hover:text-white/90 text-sm tracking-wide transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </motion.div>

          {/* Divider */}
          <div
            className="w-full mb-8"
            style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
          />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-white/25 text-xs tracking-widest">
              © {new Date().getFullYear()} EYESPECX. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-white/25 hover:text-white/60 text-xs tracking-wide transition-colors">Privacy</Link>
              <Link href="#" className="text-white/25 hover:text-white/60 text-xs tracking-wide transition-colors">Terms</Link>
              <Link href="#" className="text-white/25 hover:text-white/60 text-xs tracking-wide transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
