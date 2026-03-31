import { z } from 'zod';

export const createConsignmentSchema = z.object({
  clientId: z.string().uuid(),
  warehouseId: z.string().uuid().optional(),
  shipDate: z.string().datetime().optional(),
  dueDate: z.string().datetime().optional(),
  notes: z.string().optional(),
  items: z.array(z.object({
    variantId: z.string().uuid(),
    quantitySent: z.number().int().min(1),
    unitPrice: z.number().min(0),
  })).min(1, 'At least one item is required'),
});

export const updateConsignmentSchema = z.object({
  status: z.enum(['PENDING', 'ACTIVE', 'PARTIAL_RETURN', 'COMPLETED', 'CANCELLED']).optional(),
  items: z.array(z.object({
    id: z.string().uuid(),
    quantitySold: z.number().int().min(0).optional(),
    quantityReturned: z.number().int().min(0).optional(),
  })).optional(),
});

export const createClientSchema = z.object({
  companyName: z.string().optional(),
  contactName: z.string().min(1, 'Contact name is required'),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  taxId: z.string().optional(),
  type: z.enum(['RETAIL', 'WHOLESALE', 'DISTRIBUTOR']).optional().default('RETAIL'),
  creditLimit: z.number().min(0).optional(),
});

export const createWarehouseSchema = z.object({
  name: z.string().min(1, 'Warehouse name is required'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  managerName: z.string().optional(),
});

export const inventoryMovementSchema = z.object({
  variantId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  type: z.enum(['ENTRADA', 'SALIDA', 'AJUSTE', 'TRANSFER']),
  quantity: z.number().int().min(1),
  reason: z.string().optional(),
  referenceId: z.string().optional(),
});

export type CreateConsignmentInput = z.infer<typeof createConsignmentSchema>;
export type UpdateConsignmentInput = z.infer<typeof updateConsignmentSchema>;
export type CreateClientInput = z.infer<typeof createClientSchema>;
export type CreateWarehouseInput = z.infer<typeof createWarehouseSchema>;
export type InventoryMovementInput = z.infer<typeof inventoryMovementSchema>;
