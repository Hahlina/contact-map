import * as yup from 'yup';

export const nameShape = yup
  .string()
  .required('The field "Name" is required')
  .min(1, 'The name must contain at least 1 character')
  .max(254, 'The name must contain no more than 254 characters');
