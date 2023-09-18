import { object, string } from 'yup';
import { account_type, email, name, phone } from './auth.schema.js';

const role = string().oneOf(['admin', 'user']).required();

const createNewAdminSchema = object({
  name,
  email,
  phone,
  role,
});

const updateUserByIdSchema = object({
  name: name.required(),
  phone: phone.required(),
  role,
  account_type: account_type.default('personal'),
});

const updateUserStatusSchema = object({
  status: string().oneOf(['active', 'blocked']).required(),
});

export { createNewAdminSchema, updateUserByIdSchema, updateUserStatusSchema };
