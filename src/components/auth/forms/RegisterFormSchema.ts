
import { z } from 'zod';

export const registerFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  accountType: z.enum(['athlete', 'college', 'agency'], { 
    required_error: "Please select an account type." 
  }),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
