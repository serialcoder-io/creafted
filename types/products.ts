
/**
 * Product type for client-side (client components) usage
 * Excludes any server-only fields
 * serialized data from the server components to the client
 */
export type ProductForClient = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  defaultImage: string | null;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
  images?: {
    id: string;
    sortOrder: number;
    url: string;
    alt: string;
    productId: string;
    isDefault: boolean;
  }[];
};