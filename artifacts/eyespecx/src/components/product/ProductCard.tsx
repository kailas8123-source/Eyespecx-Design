import { Link } from "wouter";
import { Product } from "@workspace/api-client-react";
import { Heart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useAddToCart,
  useAddToWishlist,
  useRemoveWishlistItem,
  useGetWishlist,
  getGetCartQueryKey,
  getGetWishlistQueryKey
} from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: Product }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: wishlist } = useGetWishlist();
  const wishlistItem = wishlist?.find((item) => item.productId === product.id);
  const isWishlisted = !!wishlistItem;

  const addToCart = useAddToCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        toast({
          title: "Added to Cart",
          description: `${product.name} has been added to your cart.`,
        });
      },
    }
  });

  const addToWishlist = useAddToWishlist({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetWishlistQueryKey() });
        toast({
          title: "Saved to Wishlist",
          description: `${product.name} has been saved.`,
        });
      }
    }
  });

  const removeFromWishlist = useRemoveWishlistItem({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetWishlistQueryKey() });
        toast({
          title: "Removed from Wishlist",
          description: `${product.name} has been removed.`,
        });
      }
    }
  });

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist.mutate({ id: wishlistItem.id });
    } else {
      addToWishlist.mutate({ data: { productId: product.id } });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart.mutate({ data: { productId: product.id, quantity: 1 } });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col gap-4"
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-secondary/30">
        <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" data-testid={`link-product-${product.id}`} />
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 right-3 z-20">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={handleWishlistToggle}
            data-testid={`btn-wishlist-${product.id}`}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-primary text-primary" : "text-foreground"}`} />
          </Button>
        </div>

        <div className="absolute bottom-3 left-3 right-3 z-20 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button 
            className="w-full shadow-lg" 
            onClick={handleAddToCart}
            disabled={addToCart.isPending || !product.inStock}
            data-testid={`btn-add-cart-${product.id}`}
          >
            {addToCart.isPending ? "Adding..." : !product.inStock ? "Out of Stock" : (
              <>
                <Plus className="mr-2 h-4 w-4" /> Add to Bag
              </>
            )}
          </Button>
        </div>

        {product.isNew && (
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              New
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-medium text-base truncate">{product.name}</h3>
          <p className="font-semibold text-base whitespace-nowrap">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-muted-foreground truncate">{product.brand}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {product.frameColor} {product.lensColor ? `• ${product.lensColor}` : ''}
        </p>
      </div>
    </motion.div>
  );
}
