import {z} from 'zod';
import {isValidABN} from '../isValidABN';

export const ZCreateAccountSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().email('Invalid email format'),
  address: z.string().min(1, 'Street Address is required'),
  suburb: z.string().min(1, 'Suburb is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().regex(/^\d{4,6}$/, 'Postal Code must be 4-6 digits'),
  role: z.string(),
});

export const ZVehicleSchema = z.object({
  make: z.string().min(2, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z
    .string()
    .regex(/^\d{4}$/, 'Year must be a 4-digit number')
    .refine(year => {
      const currentYear = new Date().getFullYear();
      return Number(year) >= 1980 && Number(year) <= currentYear;
    }, 'Year must be between 1980 and the current year'),
  licensePlate: z.string().min(3, 'License plate number is required'),
  registrationExpiry: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD required)')
    .refine(
      date => new Date(date) > new Date(),
      'Registration expiry date must be in the future',
    ),
});

export const ZABNSchema = z.object({
  abn: z
    .string()
    .regex(/^\d{11}$/, {message: 'ABN must be exactly 11 digits'})
    .refine(val => isValidABN(val), {message: 'Invalid ABN'}),
});

export const ZDriverLicenseSchema = z.object({
  driverLicenseNumber: z
    .string()
    .min(5, "Driver's license number must be at least 5 characters")
    .max(20, "Driver's license number must be at most 20 characters")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Driver's license number must contain only letters and numbers",
    ),

  driverLicenseExpiryDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD required)')
    .refine(
      date => new Date(date) > new Date(),
      'Expiry date must be in the future',
    ),
});
