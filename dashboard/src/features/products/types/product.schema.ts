import { z } from 'zod';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, and dashes only'),
  description: z.string(),
  category_id: z.string(), // category name, or '' for none
  status: z.enum(['draft', 'published', 'archived']),
  base_price: z.coerce.number().min(0, 'Price must be 0 or more'),
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_IMAGE_SIZE,
      'Image must be 2 MB or smaller',
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only JPG, PNG, or WebP',
    )
    .nullable()
    .optional(),
});

export type ProductFormValues = z.input<typeof productSchema>;
