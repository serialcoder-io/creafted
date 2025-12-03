"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";

type ImageType = {
  url: string;
  alt: string;
  sortOrder: number;
};

interface ProductGalleryProps {
  images: ImageType[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <Card className="relative overflow-hidden rounded-3xl shadow-lg border-0 bg-background backdrop-blur py-0">
        <div className="aspect-square w-full relative rounded-2xl">
          <Image
            src={images[currentSlide].url}
            alt={`${images[currentSlide].alt} - Image ${currentSlide + 1}`}
            className="w-full h-full object-cover"
            fill
          />

          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-slate-700" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-slate-700" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-6 gap-3 py-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative aspect-square rounded-2xl overflow-hidden transition-all ${
              index === currentSlide
                ? "ring-1 ring-primary ring-offset-1 scale-105"
                : "hover:scale-105 opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              fill
            />
          </button>
        ))}
      </div>
    </div>
  );
}
