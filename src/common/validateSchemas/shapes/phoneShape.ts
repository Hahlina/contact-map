import * as yup from 'yup';
import { REGEXPS } from '@/common/constants/regexps';

export const phoneShape = yup
  .string()
  .required('The field "Phone" is required')
  .matches(REGEXPS.PHONE, 'Invalid phone number format. Use 10 digits');
