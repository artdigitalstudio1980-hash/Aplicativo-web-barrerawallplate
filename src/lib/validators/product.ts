import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(200),
  slug: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  basePrice: z.number().min(0, 'Price must be positive'),
  sku: z.string().min(1, 'SKU is required').max(50),
  metadata: z.record(z.unknown()).optional(),
});

export const updateProductSchema = createProductSchema.partial();

export const createVariantSchema = z.object({
  name: z.string().min(1, 'Variant name is required'),
  sku: z.string().min(1, 'SKU is required'),
  price: z.number().min(0),
  stockQuantity: z.number().int().min(0).optional().default(0),
  minStockAlert: z.number().int().min(0).optional().default(5),
  imageUrl: z.string().url().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateVariantInput = z.infer<typeof createVariantSchema>;
