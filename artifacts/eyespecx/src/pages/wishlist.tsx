import { Link } from "wouter";
import { useGetWishlist } from "@workspace/api-client-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";

export default function Wishlist() {
  const { data: wishlistItems, isLoading } = useGetWishlist();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-serif font-bold mb-8">Your Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4">Your Saved Styles</h1>
        
        {(!wishlistItems || wishlistItems.length === 0) ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              You haven't saved any items to your wishlist yet.
            </p>
            <Button asChild size="lg" className="h-14 px-8 text-base">
              <Link href="/shop">Discover Styles</Link>
            </Button>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-12 text-lg">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
              {wishlistItems.map((item) => (
                <ProductCard key={item.id} product={item.product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
