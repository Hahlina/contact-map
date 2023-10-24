import * as yup from 'yup';
import { userNameShape } from './shapes/userNameShape';
import { passwordShape } from './shapes/passwordShape';

export const loginSchema = yup.object().shape({
  username: userNameShape,
  password: passwordShape,
});
