import { z } from 'zod';

export const createSaleSchema = z.object({
  clientId: z.string().uuid().optional(),
  warehouseId: z.string().uuid().optional(),
  paymentMethod: z.enum(['CASH', 'CARD', 'TRANSFER', 'CREDIT']).optional().default('CASH'),
  notes: z.string().optional(),
  items: z.array(z.object({
    variantId: z.string().uuid(),
    quantity: z.number().int().min(1),
    unitPrice: z.number().min(0),
    discount: z.number().min(0).optional().default(0),
  })).min(1, 'At least one item is required'),
});

export const updateSaleStatusSchema = z.object({
  status: z.enum(['DRAFT', 'CONFIRMED', 'COMPLETED', 'CANCELLED']),
});

export type CreateSaleInput = z.infer<typeof createSaleSchema>;
export type UpdateSaleStatusInput = z.infer<typeof updateSaleStatusSchema>;
