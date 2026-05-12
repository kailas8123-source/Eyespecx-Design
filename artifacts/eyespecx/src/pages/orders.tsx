import { Link } from "wouter";
import { useListOrders } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Orders() {
  const { data: orders, isLoading } = useListOrders();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-24 text-center">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 max-w-4xl">
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-4">Order History</h1>
        
        {(!orders || orders.length === 0) ? (
          <div className="py-16 text-center border rounded-2xl bg-secondary/10 mt-8">
            <h2 className="text-2xl font-semibold mb-3">No orders yet</h2>
            <p className="text-muted-foreground mb-8">When you purchase items, they will appear here.</p>
            <Button asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8 mt-12">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-xl overflow-hidden bg-card shadow-sm">
                <div className="bg-secondary/30 p-6 flex flex-wrap justify-between items-center gap-4 border-b">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order Placed</p>
                      <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total</p>
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Order #</p>
                      <p className="font-medium">ORD-{order.id.toString().padStart(6, '0')}</p>
                    </div>
                  </div>
                  <div>
                    <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'} className="px-3 py-1 text-sm capitalize">
                      {order.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-6">
                        <div className="w-24 h-24 rounded-lg bg-secondary flex-shrink-0 overflow-hidden">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name}
                            className="w-full h-full object-cover mix-blend-multiply"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <Link href={`/product/${item.product.id}`} className="font-semibold hover:underline text-lg">
                                {item.product.name}
                              </Link>
                              <p className="text-muted-foreground text-sm mt-1">{item.product.brand}</p>
                            </div>
                            <p className="font-semibold">${item.priceAtPurchase.toFixed(2)}</p>
                          </div>
                          <div className="mt-4 text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex justify-between items-center text-sm">
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Shipping to:</span> {order.shippingAddress}
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/product/${order.items[0]?.productId}`}>Buy Again</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
