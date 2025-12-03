import prisma from "@/lib/prisma";
import ProductGallery from "@/components/shop/ProductGallery";
import HeaderSection from "@/components/common/HeaderSection";
import ProductDetails from "@/components/shop/ProductDetails";

type Props = {
  params: Promise<{ id: string }>; 
};

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
 

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  /**
   * Prepare product images for gallery
   * - If no images, use default image or placeholder
   */
  const productImages = product?.images?.length
    ? product.images.map((img) => ({
        url: img.url,
        alt: img.alt,
        sortOrder: img.sortOrder,
      }))
    : [
        {
          url: product?.defaultImage || "/no_image_available.jpg",
          alt: product?.name || "No Image Available",
          sortOrder: 1,
        },
      ];

  /**
   * Convert product data for client use
   * - Converts Decimal to number for price
   * - Converts Date to ISO string for created_at and updated_at
   */
  const productForClient = product
  ? {
      ...product,
      price: Number(product.price),
      created_at: product.created_at.toISOString(),
      updated_at: product.updated_at.toISOString(),
    }
  : null;


  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-b from-rose-50 via-amber-50 to-orange-50 flex items-center justify-center">
        <p className="text-xl text-foreground/80">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-primary/10 via-amber-50 to-orange-50">
      <HeaderSection />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 bg-background p-8 rounded-3xl shadow-lg">
          <ProductGallery images={productImages} />

          <ProductDetails product={productForClient!} />
        </div>
      </div>
    </div>
  );
}
