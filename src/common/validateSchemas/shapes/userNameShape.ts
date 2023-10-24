import * as yup from 'yup';

export const userNameShape = yup
  .string()
  .required('The field "Name" is required')
  .min(1, 'The name must contain at least 1 character')
  .max(150, 'The name must contain no more than 150 characters')
  .trim();
