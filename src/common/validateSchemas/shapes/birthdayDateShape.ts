import * as yup from 'yup';
import { REGEXPS } from '@/common/constants/regexps';

export const birthdayDateShape = yup
  .string()
  .required('The field "Birthday" is required')
  .matches(REGEXPS.DATE, 'Invalid date format');
