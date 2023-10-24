import * as yup from 'yup';

export const emailShape = yup
  .string()
  .required('The field "Email" is required')
  .email('Invalid e-mail address')
  .min(1, 'The email must contain at least 1 character')
  .max(254, 'The name must contain no more than 254 characters');
