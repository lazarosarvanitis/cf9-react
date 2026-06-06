import {z} from "zod";

export const productSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1, {error: "Name is required"}),
  slug: z
    .string()
    .min(1, {error: "Slug is required"})
    .regex(/^[a-zA-Z0-9-_]+$/, {error: "Slug must use only Latin letters, numbers, - or _"}),
  description: z
    .string()
    .optional(),
  image: z
    .string()
    .optional(),
  price: z
    .number()
    .nonnegative({error: "Price must be a non-negative number"}),
  sort: z
    .number()
    .int()
    .min(1, {error: "Sort for the product"}),
  is_active: z.boolean(),
  is_favorite: z.boolean(),
  category_id: z
    .number()
    .int()
    .min(1, {error: "Category is required"}),

})

export type Product = z.infer<typeof productSchema>;

export const productFormSchema = productSchema.omit({id: true});

export type ProductFormData = z.infer<typeof productFormSchema>;