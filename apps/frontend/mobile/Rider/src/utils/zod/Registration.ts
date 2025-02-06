import { z } from 'zod';
import { isValidABN } from '../isValidABN';

export const ZCreateAccountSchema = z.object({
    firstName: z.string().min(1, 'First Name is required'),
    lastName: z.string().min(1, 'Last Name is required'),
    email: z.string().email('Invalid email format'),
    address: z.string().min(1, 'Street Address is required'),
    suburb: z.string().min(1, 'Suburb is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().regex(/^\d{4,6}$/, 'Postal Code must be 4-6 digits'),
    role:z.string()
  });

  export const ZVehicleSchema = z.object({
    make: z.string().nonempty({ message: "Vehicle make is required" }),
    model: z.string().nonempty({ message: "Vehicle model is required" }),
    year: z
      .string()
      .regex(/^\d{4}$/, { message: "Enter a valid 4-digit year" }),
  });

  export const ZABNSchema = z.object({
    abn: z
      .string()
      .regex(/^\d{11}$/, { message: 'ABN must be exactly 11 digits' })
      .refine((val) => isValidABN(val), { message: 'Invalid ABN' }),
  });
  
  