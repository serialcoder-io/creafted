import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative bg-linear-to-br from-rose-50 via-orange-50 to-amber-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="text-primary/80" size={55} />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Handmade with Love
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover unique crochet items, custom phone cases, and beautiful
                crafts made just for you
              </p>
              <Button  className="px-8 py-6 text-lg" asChild>
                <Link href="/shop" className="flex items-center">
                  <span className="text-xl">Shop now</span>
                  <ArrowRight className="w-8 h-6" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
    )
}