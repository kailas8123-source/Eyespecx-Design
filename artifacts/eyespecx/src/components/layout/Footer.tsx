import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-2xl font-serif font-bold tracking-tighter">
              Eyespecx
            </Link>
            <p className="text-primary-foreground/70 text-sm max-w-xs">
              Premium eyewear designed for the discerning individual. Precision crafted, beautifully worn.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Shop</h3>
            <Link href="/shop" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">All Eyewear</Link>
            <Link href="/shop?gender=men" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Men</Link>
            <Link href="/shop?gender=women" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Women</Link>
            <Link href="/collections" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Collections</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">About</h3>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Our Story</Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Materials</Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Sustainability</Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Journal</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">FAQ</Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Shipping & Returns</Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Fit Guide</Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary-foreground text-sm transition-colors">Contact Us</Link>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/50 text-xs">
            © {new Date().getFullYear()} Eyespecx. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-xs transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-primary-foreground/50 hover:text-primary-foreground text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
