import { Link } from "wouter";
import { useListCollections } from "@workspace/api-client-react";
import { motion } from "framer-motion";

export default function Collections() {
  const { data: collections, isLoading } = useListCollections();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-secondary/30 py-24 mb-16">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6">Curated Collections</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Discover our thoughtfully curated edits. Each collection tells a story, grouped by design philosophy, material innovation, and aesthetic mood.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {isLoading ? (
          <div className="space-y-24">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col lg:flex-row gap-12 items-center">
                <div className={`w-full lg:w-1/2 aspect-[4/3] bg-muted animate-pulse rounded-2xl ${i % 2 !== 0 ? 'lg:order-2' : ''}`} />
                <div className="w-full lg:w-1/2 space-y-4">
                  <div className="h-10 bg-muted animate-pulse rounded w-1/2" />
                  <div className="h-24 bg-muted animate-pulse rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : collections && collections.length > 0 ? (
          <div className="space-y-32">
            {collections.map((collection, index) => (
              <motion.div 
                key={collection.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center group"
              >
                <div className={`w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden relative ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <Link href={`/shop?category=${collection.slug}`} className="absolute inset-0 z-10" />
                  <img 
                    src={collection.imageUrl} 
                    alt={collection.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="w-full lg:w-1/2 flex flex-col items-start">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-6">{collection.name}</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                    {collection.description}
                  </p>
                  <Link 
                    href={`/shop?category=${collection.slug}`} 
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-base shadow-sm"
                  >
                    Shop the Collection
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">No collections found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
