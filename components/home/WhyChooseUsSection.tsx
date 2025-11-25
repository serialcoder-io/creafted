import { HandMetal, Heart, Sparkles } from "lucide-react";

export default function WhyChooseUseSection() {
    return (
        <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HandMetal className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Handmade Quality</h3>
              <p className="text-gray-600">Every item is crafted with care and attention to detail</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unique Designs</h3>
              <p className="text-gray-600">One-of-a-kind pieces you won&apos;t find anywhere else</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-gray-600">Supporting small artisans and sustainable crafting</p>
            </div>
          </div>
        </div>
      </section>
    )
}