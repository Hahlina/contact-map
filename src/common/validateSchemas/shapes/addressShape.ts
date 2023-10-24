import * as yup from 'yup';

export const addressShape = yup
  .string()
  .min(1, 'The addressShape must contain at least 1 character')
  .max(254, 'The addressShape must contain no more than 254 characters');
