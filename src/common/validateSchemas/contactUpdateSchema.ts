import * as yup from 'yup';
import { nameShape } from '@/common/validateSchemas/shapes/nameShape';
import { emailShape } from '@/common/validateSchemas/shapes/emailShape';
import { birthdayDateShape } from '@/common/validateSchemas/shapes/birthdayDateShape';
import { phoneShape } from '@/common/validateSchemas/shapes/phoneShape';
import { addressShape } from '@/common/validateSchemas/shapes/addressShape';

export const contactUpdateSchema = yup.object().shape({
  name: nameShape,
  email: emailShape,
  birthday_date: birthdayDateShape,
  phone_number: phoneShape,
  address: addressShape,
});
