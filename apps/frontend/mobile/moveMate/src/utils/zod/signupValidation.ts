import { z } from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  suburb: z.string().min(2, 'Suburb is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().regex(/^\d{4,6}$/, 'Postal code must be a number (4-6 digits)'),
});
export const addressSchema = z.object({
  addressLine1: z.string().min(3, "Street Address must be at least 3 characters"),
  addressLine2: z.string().optional(),
  suburb: z.string().min(2, "Suburb is required"),
  postalCode: z.string().regex(/^\d{4,6}$/, "Invalid Postal Code"),
  state: z.string().min(2, 'State is required'),
  landmark: z.string().optional(),
});

