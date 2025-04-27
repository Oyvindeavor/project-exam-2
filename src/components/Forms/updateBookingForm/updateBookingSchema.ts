import { z } from 'zod'

// Helper function to get today's date at midnight
const getTodayAtMidnight = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set time to the beginning of the day
  return today
}

// --- Zod Schema for Validation ---
export const updateBookingSchema = z
  .object({
    dateFrom: z
      .string()
      .min(1, 'Check in date is required')
      .date('Invalid date format')
      .refine(
        (dateStr) => {
          const dateFrom = new Date(dateStr)
          return !isNaN(dateFrom.valueOf()) && dateFrom > getTodayAtMidnight()
        },
        {
          message: 'Start date must be in the future (after today)',
        }
      ),
    dateTo: z.string().min(1, 'Date To is required').date('Invalid date format'),
    guests: z.coerce
      .number({ invalid_type_error: 'Guests must be a number' })
      .int('Guests must be a whole number')
      .positive('Guests must be positive'),
  })
  .refine(
    (data) => {
      const from = new Date(data.dateFrom)
      const to = new Date(data.dateTo)
      return !isNaN(from.valueOf()) && !isNaN(to.valueOf()) && from < to
    },
    {
      message: 'End date must be valid and after start date',
      path: ['dateTo'],
    }
  )

// Rest of your action file (interface, function export) remains the same...
