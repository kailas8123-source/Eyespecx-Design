import { Link } from "wouter";
import { 
  useGetCart, 
  useUpdateCartItem, 
  useRemoveCartItem,
  getGetCartQueryKey,
  useCreateOrder
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { data: cartItems, isLoading } = useGetCart();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateCartItem = useUpdateCartItem({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
      }
    }
  });

  const removeCartItem = useRemoveCartItem({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        toast({ title: "Item removed from cart" });
      }
    }
  });

  const createOrder = useCreateOrder({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey() });
        toast({ 
          title: "Order Placed Successfully", 
          description: "Thank you for shopping with Eyespecx!" 
        });
      }
    }
  });

  const subtotal = cartItems?.reduce((acc, item) => acc + (item.product.price * item.quantity), 0) || 0;
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    createOrder.mutate({
      data: {
        shippingAddress: "123 Main St, New York, NY 10001" // Hardcoded for mockup
      }
    });
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-24 text-center">Loading cart...</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-4">Your Bag is Empty</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          Looks like you haven't added any eyewear to your bag yet. Discover your new signature look.
        </p>
        <Button asChild size="lg" className="h-14 px-8 text-base">
          <Link href="/shop">Explore Collection</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
      <h1 className="text-4xl font-serif font-bold tracking-tight mb-10">Your Bag</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cartItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-secondary/20"
            >
              <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                <Link href={`/product/${item.product.id}`}>
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover mix-blend-multiply hover:scale-105 transition-transform" 
                  />
                </Link>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">{item.product.brand}</div>
                    <Link href={`/product/${item.product.id}`} className="font-semibold text-lg hover:underline decoration-1 underline-offset-4">
                      {item.product.name}
                    </Link>
                    <div className="text-sm text-muted-foreground mt-1">Color: {item.product.frameColor}</div>
                  </div>
                  <div className="font-semibold text-lg">${(item.product.price * item.quantity).toFixed(2)}</div>
                </div>
                
                <div className="flex justify-between items-end mt-6">
                  <div className="flex items-center border rounded-xl h-10 bg-background overflow-hidden">
                    <button 
                      className="px-3 h-full flex items-center justify-center hover:bg-secondary/50 transition-colors"
                      onClick={() => updateCartItem.mutate({ id: item.id, data: { quantity: Math.max(1, item.quantity - 1) } })}
                      disabled={updateCartItem.isPending}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      className="px-3 h-full flex items-center justify-center hover:bg-secondary/50 transition-colors"
                      onClick={() => updateCartItem.mutate({ id: item.id, data: { quantity: item.quantity + 1 } })}
                      disabled={updateCartItem.isPending}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeCartItem.mutate({ id: item.id })}
                    disabled={removeCartItem.isPending}
                    className="text-sm font-medium text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-secondary/10 p-8 rounded-2xl border sticky top-24">
            <h2 className="text-xl font-serif font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
            </div>
            
            <Separator className="mb-6" />
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-2xl">${total.toFixed(2)}</span>
            </div>
            
            <Button 
              size="lg" 
              className="w-full h-14 text-base shadow-md group"
              onClick={handleCheckout}
              disabled={createOrder.isPending}
              data-testid="btn-checkout"
            >
              {createOrder.isPending ? "Processing..." : "Proceed to Checkout"} 
              {!createOrder.isPending && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              Secure checkout. Free shipping over $150.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
