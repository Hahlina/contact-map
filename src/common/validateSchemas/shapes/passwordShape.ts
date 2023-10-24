import * as yup from 'yup';

export const passwordShape = yup
  .string()
  .required('The "Password" field is required')
  .min(1, 'Password must contain at least 1 character')
  .max(128, 'The password must contain no more than 128 characters');
