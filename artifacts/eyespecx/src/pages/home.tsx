import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { 
  useGetFeaturedProducts, 
  useGetNewArrivals, 
  useGetTrendingProducts,
  useListCategories
} from "@workspace/api-client-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: featuredProducts, isLoading: isLoadingFeatured } = useGetFeaturedProducts();
  const { data: newArrivals, isLoading: isLoadingNew } = useGetNewArrivals();
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
              See the world <br/>with clarity.
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
            <h2 className="text-3xl font-serif font-bold tracking-tight">Shop by Shape</h2>
          </div>
          
          {isLoadingCategories ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
              ))}
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
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
              ))}
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

      {/* Editorial Banner */}
      <section className="py-24">
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
                Discover our latest collection of premium Italian acetate frames. Hand-polished to a brilliant shine and designed to stand out. Bold proportions meet timeless silhouettes in a collection that redefines everyday eyewear.
              </p>
              <Button asChild size="lg" className="h-14 px-8 text-base">
                <Link href="/collections">Explore Collection</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold tracking-tight">Trending Now</h2>
            <Link href="/shop" className="text-sm font-medium hover:text-primary flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          {isLoadingTrending ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
              ))}
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
