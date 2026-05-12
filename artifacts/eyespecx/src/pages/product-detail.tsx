import { useRoute } from "wouter";
import { Link } from "wouter";
import { 
  useGetProduct, 
  useAddToCart, 
  useGetCart,
  getGetCartQueryKey,
  useListReviews,
  useCreateReview,
  getListReviewsQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Heart, Minus, Plus, Shield, Truck, Undo2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const id = parseInt(params?.id || "0");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useGetProduct(id, { 
    query: { enabled: !!id, queryKey: [`/api/products/${id}`] } 
  });

  const { data: reviews } = useListReviews({ productId: id }, {
    query: { enabled: !!id, queryKey: getListReviewsQueryKey({ productId: id }) }
  });

  const addToCart = useAddToCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        toast({
          title: "Added to Cart",
          description: `${quantity}x ${product?.name} has been added to your cart.`,
        });
      }
    }
  });

  const createReview = useCreateReview({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListReviewsQueryKey({ productId: id }) });
        toast({
          title: "Review Submitted",
          description: "Thank you for your feedback!",
        });
        setReviewForm({ rating: 5, comment: "", authorName: "" });
      }
    }
  });

  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "", authorName: "" });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-muted animate-pulse rounded-xl" />
        <div className="space-y-6">
          <div className="h-10 bg-muted animate-pulse rounded w-2/3" />
          <div className="h-6 bg-muted animate-pulse rounded w-1/4" />
          <div className="h-24 bg-muted animate-pulse rounded w-full" />
        </div>
      </div>
    );
  }

  if (!product) return <div className="p-24 text-center">Product not found</div>;

  const images = [product.imageUrl, ...(product.images || [])];

  const handleAddToCart = () => {
    addToCart.mutate({ data: { productId: product.id, quantity } });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.comment || !reviewForm.authorName) return;
    createReview.mutate({ data: { productId: product.id, ...reviewForm } });
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Breadcrumbs */}
      <div className="border-b">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center text-sm text-muted-foreground gap-2">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 lg:sticky lg:top-24 lg:h-max">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden bg-secondary transition-all ${
                    selectedImage === idx ? "ring-2 ring-primary ring-offset-2" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>
            
            <motion.div 
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 aspect-square rounded-2xl bg-secondary/50 overflow-hidden relative flex items-center justify-center"
            >
              <img 
                src={images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover mix-blend-multiply"
              />
              {!product.inStock && (
                <div className="absolute top-6 left-6">
                  <span className="inline-flex items-center rounded-sm bg-destructive/10 px-3 py-1 text-sm font-medium text-destructive">
                    Out of Stock
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* Details */}
          <div className="flex flex-col pt-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-widest font-medium">
              {product.brand}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-balance">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.description || "A timeless classic reimagined. These frames combine vintage-inspired design with modern materials for unparalleled comfort and style."}
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Color: <span className="text-muted-foreground">{product.frameColor}</span></span>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-black ring-2 ring-primary ring-offset-2" />
                  <div className="w-10 h-10 rounded-full bg-amber-900 border border-border" />
                  <div className="w-10 h-10 rounded-full bg-slate-300 border border-border" />
                </div>
              </div>
            </div>

            <Separator className="mb-8" />

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border rounded-md w-32 h-14 bg-background">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-full px-3 rounded-none" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center font-medium">{quantity}</div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-full px-3 rounded-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                size="lg" 
                className="flex-1 h-14 text-base"
                onClick={handleAddToCart}
                disabled={!product.inStock || addToCart.isPending}
                data-testid="btn-add-to-cart-detail"
              >
                {addToCart.isPending ? "Adding..." : !product.inStock ? "Out of Stock" : `Add to Bag - ${(product.price * quantity).toFixed(2)}`}
              </Button>
              
              <Button variant="outline" size="icon" className="h-14 w-14 flex-shrink-0 border-input">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 py-6 border-y">
              <div className="flex flex-col gap-2 text-center sm:text-left items-center sm:items-start">
                <Truck className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">Free Shipping</span>
                <span className="text-xs text-muted-foreground">On orders over $150</span>
              </div>
              <div className="flex flex-col gap-2 text-center sm:text-left items-center sm:items-start">
                <Undo2 className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">30-Day Returns</span>
                <span className="text-xs text-muted-foreground">No questions asked</span>
              </div>
              <div className="flex flex-col gap-2 text-center sm:text-left items-center sm:items-start">
                <Shield className="h-5 w-5 text-primary mb-1" />
                <span className="text-sm font-medium">1-Year Warranty</span>
                <span className="text-xs text-muted-foreground">Against manufacturing defects</span>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger className="text-base font-medium">Product Details</AccordionTrigger>
                <AccordionContent className="text-muted-foreground space-y-2 leading-relaxed">
                  <p>Shape: <span className="text-foreground">{product.shape || 'Standard'}</span></p>
                  <p>Material: <span className="text-foreground">{product.material || 'Premium Acetate'}</span></p>
                  <p>Type: <span className="text-foreground">{product.type}</span></p>
                  <p>Gender: <span className="text-foreground">{product.gender}</span></p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-base font-medium">Shipping & Returns</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Standard shipping is free for orders over $150. Delivery takes 3-5 business days. You can return any frame within 30 days of receipt, provided they are in original condition.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t bg-secondary/10">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <h2 className="text-3xl font-serif font-bold tracking-tight mb-10">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="bg-background p-8 rounded-xl border shadow-sm">
                <h3 className="font-semibold text-xl mb-4">Write a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rating</label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star} 
                          type="button"
                          onClick={() => setReviewForm(prev => ({...prev, rating: star}))}
                          className="focus:outline-none"
                        >
                          <Star className={`h-6 w-6 ${star <= reviewForm.rating ? "fill-primary text-primary" : "text-muted"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input 
                      required 
                      value={reviewForm.authorName} 
                      onChange={e => setReviewForm(prev => ({...prev, authorName: e.target.value}))}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Review</label>
                    <Textarea 
                      required 
                      value={reviewForm.comment} 
                      onChange={e => setReviewForm(prev => ({...prev, comment: e.target.value}))}
                      placeholder="What did you think of these frames?"
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={createReview.isPending} data-testid="btn-submit-review">
                    {createReview.isPending ? "Submitting..." : "Submit Review"}
                  </Button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {reviews && reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id} className="bg-background p-6 rounded-xl border shadow-sm flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-lg">{review.authorName}</p>
                        <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-background rounded-xl border border-dashed">
                  <p className="text-muted-foreground mb-2">No reviews yet.</p>
                  <p className="text-sm">Be the first to review this product!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
