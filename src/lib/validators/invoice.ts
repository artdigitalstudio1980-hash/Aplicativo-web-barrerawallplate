import { z } from 'zod';

export const createInvoiceSchema = z.object({
  saleId: z.string().uuid().optional(),
  clientId: z.string().uuid(),
  subtotal: z.number().min(0),
  taxAmount: z.number().min(0),
  total: z.number().min(0),
  dueDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export const updateInvoiceStatusSchema = z.object({
  status: z.enum(['DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED']),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>;
export type UpdateInvoiceStatusInput = z.infer<typeof updateInvoiceStatusSchema>;
