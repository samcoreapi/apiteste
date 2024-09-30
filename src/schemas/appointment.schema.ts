import { z } from "zod";

export const appointmentSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(100),
  plan: z.string().max(100),
  date: z
    .string()
    .refine((data) => !isNaN(Date.parse(data)), {
      message: "Invalid date format.",
    })
    .transform((data) => new Date(data)),
  phone_number: z.string().refine((data) => /^\d{8,15}$/.test(data), {
    message: "Phone number must contain 8 to 15 digits.",
  }),
  exam_type: z.enum(
    [
      "Ultrassom",
      "Ecocardiograma",
      "Tomografia",
      "ultrassom",
      "ecocardiograma",
      "tomografia",
    ],
    {
      errorMap: () => ({
        message:
          "Invalid exam type. Must be 'ultrassom', 'ucocardiograma', or 'tomografia'.",
      }),
    }
  ),
  exam_name: z.string().max(100),
  deleted_at: z.date().nullable(),
});

export const appointmentCreateSchema = appointmentSchema.pick({
  name: true,
  plan: true,
  date: true,
  phone_number: true,
  exam_type: true,
  exam_name: true,
});

export const appointmentResponseSchema = appointmentSchema.pick({
  id: true,
  name: true,
  plan: true,
  date: true,
  phone_number: true,
  exam_type: true,
  exam_name: true,
  deleted_at: true,
});

export const appointmentReadAllSchema = appointmentResponseSchema.array();

export const appointmentUpdateSchema = z.object({
  name: z.string().max(100).optional(),
  plan: z.string().max(100).optional(),
  date: z
    .string()
    .refine((data) => !isNaN(Date.parse(data)), {
      message: "Invalid date format.",
    })
    .transform((data) => new Date(data)),
  phone_number: z
    .string()
    .optional()
    .refine((data) => data === undefined || /^\d{8,15}$/.test(data), {
      message: "Phone number must contain 8 to 15 digits or be undefined.",
    }),
  exam_type: z
    .enum(["ultrassom", "ecocardiograma", "tomografia"], {
      errorMap: () => ({
        message:
          "Invalid exam type. Must be 'ultrassom', 'ecocardiograma', or 'tomografia'.",
      }),
    })
    .optional(),
  exam_name: z.string().max(100).optional(),
});
