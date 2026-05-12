import { Link } from "wouter";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import {
  useGetFeaturedProducts,
  useGetNewArrivals,
  useGetTrendingProducts,
  useListCategories
} from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { useState } from "react";

const TUTORIAL_VIDEOS = [
  {
    id: "IHzAbv4CxiQ",
    title: "How to Choose Glasses for Your Face Shape",
    duration: "5:24",
    views: "2.1M views",
    channel: "Eyespecx Guide",
  },
  {
    id: "FU1iHBa_dGc",
    title: "Lens Coatings Explained — AR, Blue Light & More",
    duration: "7:02",
    views: "890K views",
    channel: "Optics by Eyespecx",
  },
  {
    id: "fT7E_B3yMzE",
    title: "How to Properly Clean & Care for Your Frames",
    duration: "3:48",
    views: "1.4M views",
    channel: "Eyespecx Guide",
  },
  {
    id: "LN-GHf_KGF0",
    title: "Reading Your Prescription — Complete Beginner Guide",
    duration: "8:15",
    views: "3.2M views",
    channel: "Optics by Eyespecx",
  },
];

const INSTAGRAM_REELS = [
  {
    id: 1,
    thumb: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&q=80",
    views: "182K",
    caption: "The Architect frame — all day, everyday.",
    tag: "#EyespecxStyle",
  },
  {
    id: 2,
    thumb: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
    views: "94K",
    caption: "Sun's out, frames out. Sol Aviator.",
    tag: "#SummerFrames",
  },
  {
    id: 3,
    thumb: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=400&q=80",
    views: "247K",
    caption: "Cat-eye season is never over.",
    tag: "#EyespecxWomen",
  },
  {
    id: 4,
    thumb: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=400&q=80",
    views: "310K",
    caption: "Blush, pink, and you.",
    tag: "#NewArrivals",
  },
  {
    id: 5,
    thumb: "https://images.unsplash.com/photo-1473496169904-658ba7574b0d?w=400&q=80",
    views: "128K",
    caption: "Golden hour deserves golden frames.",
    tag: "#EyespecxSun",
  },
];

const BRANDS = [
  {
    name: "Ray-Ban",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Ray-Ban_logo.svg/320px-Ray-Ban_logo.svg.png",
    tagline: "Since 1937",
    color: "#c8102e",
  },
  {
    name: "Oakley",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Oakley_logo.svg/320px-Oakley_logo.svg.png",
    tagline: "High Performance",
    color: "#e8251f",
  },
  {
    name: "Tom Ford",
    logo: null,
    tagline: "Luxury Eyewear",
    color: "#8b7355",
  },
  {
    name: "Persol",
    logo: null,
    tagline: "Italian Craftsmanship",
    color: "#1a3a5c",
  },
  {
    name: "Lindberg",
    logo: null,
    tagline: "Danish Minimalism",
    color: "#2c3e50",
  },
  {
    name: "Warby Parker",
    logo: null,
    tagline: "Modern Vision",
    color: "#1b4f72",
  },
  {
    name: "Gucci",
    logo: null,
    tagline: "Italian Fashion",
    color: "#1a1a1a",
  },
  {
    name: "Prada",
    logo: null,
    tagline: "Milano",
    color: "#333333",
  },
];

function TutorialCard({ video, index }: { video: typeof TUTORIAL_VIDEOS[0]; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex flex-col rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-300 hover:shadow-lg"
      data-testid={`card-tutorial-${index}`}
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <button
                onClick={() => setPlaying(true)}
                data-testid={`button-play-${index}`}
                className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                }}
              >
                <Play className="h-5 w-5 text-foreground ml-0.5" fill="currentColor" />
              </button>
            </div>
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
              {video.duration}
            </span>
          </>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <p className="text-[11px] text-muted-foreground font-medium tracking-wide uppercase">{video.channel}</p>
        <h3 className="font-semibold text-sm leading-snug line-clamp-2">{video.title}</h3>
        <p className="text-xs text-muted-foreground">{video.views}</p>
      </div>
    </motion.div>
  );
}

function ReelCard({ reel, index }: { reel: typeof INSTAGRAM_REELS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group relative flex-shrink-0 w-44 md:w-52 rounded-2xl overflow-hidden cursor-pointer"
      style={{ aspectRatio: "9/16" }}
      data-testid={`card-reel-${reel.id}`}
    >
      <img
        src={reel.thumb}
        alt={reel.caption}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}
        >
          <Play className="h-5 w-5 text-white ml-0.5" fill="white" />
        </div>
      </div>

      {/* Instagram icon top-right */}
      <div className="absolute top-3 right-3">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/80">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-xs font-medium leading-tight line-clamp-2 mb-1">{reel.caption}</p>
        <div className="flex items-center justify-between">
          <span className="text-white/60 text-[10px]">{reel.tag}</span>
          <span className="text-white/60 text-[10px]">{reel.views}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { data: featuredProducts, isLoading: isLoadingFeatured } = useGetFeaturedProducts();
  const { data: newArrivals } = useGetNewArrivals();
  const { data: trendingProducts, isLoading: isLoadingTrending } = useGetTrendingProducts();
  const { data: categories, isLoading: isLoadingCategories } = useListCategories();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Editorial eyewear"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-start text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-6 leading-tight">
              See the world <br />with clarity.
            </h1>
            <p className="text-lg md:text-xl font-medium mb-10 max-w-lg opacity-90 leading-relaxed">
              Premium eyewear designed for the discerning individual. Precision crafted, beautifully worn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 text-base h-14 px-8" data-testid="link-shop-all-hero">
                <Link href="/shop">Explore Collection</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black bg-transparent text-base h-14 px-8" data-testid="link-shop-men-hero">
                <Link href="/shop?gender=men">Shop Men</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold tracking-tight">Shop by Category</h2>
          </div>
          {isLoadingCategories ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories?.slice(0, 4).map((category, i) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/shop?category=${category.slug}`} className="group block relative aspect-square overflow-hidden rounded-lg bg-secondary/50">
                    <img
                      src={category.imageUrl || '/images/collection-1.png'}
                      alt={category.name}
                      className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                      <div className="text-white">
                        <h3 className="text-xl font-medium mb-1">{category.name}</h3>
                        <p className="text-sm opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                          Explore <ArrowRight className="h-3 w-3" />
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold tracking-tight">Curated Selection</h2>
            <Link href="/shop" className="text-sm font-medium hover:text-primary flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts?.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── TUTORIAL VIDEOS ── */}
      <section className="py-24 bg-background" data-testid="section-tutorials">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-xs tracking-[0.25em] uppercase font-semibold text-muted-foreground mb-3">Learn & Explore</p>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">Eyewear Guides</h2>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                See all videos <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TUTORIAL_VIDEOS.map((video, i) => (
              <TutorialCard key={video.id} video={video} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM REELS ── */}
      <section
        className="py-24 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #090b10 0%, #0f1628 100%)" }}
        data-testid="section-reels"
      >
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-xs tracking-[0.25em] uppercase font-semibold text-white/40 mb-3">Follow the Look</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-white">
                @eyespecx on Instagram
              </h2>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors"
              data-testid="link-instagram-follow"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Follow Us
            </a>
          </motion.div>

          {/* Horizontal scroll reel strip */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
            {INSTAGRAM_REELS.map((reel, i) => (
              <ReelCard key={reel.id} reel={reel} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="py-24 bg-background" data-testid="section-brands">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.25em] uppercase font-semibold text-muted-foreground mb-3">Our Partners</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mb-4">Brands at Eyespecx</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We stock the world's most celebrated eyewear houses — each chosen for exceptional craft, design vision, and lasting quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
            {BRANDS.map((brand, i) => (
              <motion.div
                key={brand.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
              >
                <Link
                  href={`/shop?search=${encodeURIComponent(brand.name)}`}
                  className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-border/50 bg-card hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300 hover:shadow-md min-h-[130px]"
                  data-testid={`card-brand-${i}`}
                >
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                    />
                  ) : (
                    <span
                      className="text-xl font-serif font-bold tracking-tight transition-colors duration-300"
                      style={{ color: brand.color, opacity: 0.7 }}
                    >
                      {brand.name}
                    </span>
                  )}
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground tracking-wide">{brand.tagline}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] rounded-xl overflow-hidden"
            >
              <img src="/images/collection-2.png" alt="Editorial" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start max-w-xl"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">The Acetate Edit</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Discover our latest collection of premium Italian acetate frames. Hand-polished to a brilliant shine and designed to stand out. Bold proportions meet timeless silhouettes.
              </p>
              <Button asChild size="lg" className="h-14 px-8 text-base">
                <Link href="/collections">Explore Collection</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold tracking-tight">Trending Now</h2>
            <Link href="/shop" className="text-sm font-medium hover:text-primary flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {isLoadingTrending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {trendingProducts?.slice(0, 4).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
