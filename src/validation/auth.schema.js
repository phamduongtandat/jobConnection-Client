import { array, object, ref, string } from 'yup';

// ============ schema properties

export const email = string()
  .email('Địa chỉ email không hợp lệ')
  .max(100)
  .required('Email là bắt buộc');

export const phone = string()
  .required('Số điện thoại là bắt buộc')
  .matches(
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
    'Số điện thoại không hợp lệ',
  );

export const name = string().max(100).required('Tên là bắt buộc');
export const address = string().max(200).required('Địa chỉ là bắt buộc');

export const fields = array()
  .of(string().length(24).required())
  .min(1, 'Hãy chọn ít nhất 1 lĩnh vực kinh doanh')
  .required('Lĩnh vực kinh doanh là bắt buộc');

export const overview = string().max(1000).required('Mô tả là bắt buộc');

export const account_type = string()
  .oneOf(['personal', 'business'], 'Loại tài khoản là bắt buộc')
  .required();

export const password = string()
  .matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{4,}$/,
    'Mật khẩu ít nhất phải bao gồm 1 ký tự in hoa, 1 ký tự in thường, 1 chữ số và 1 ký tự đặc biệt (!@#$%^&*)',
  )
  .min(8, 'Mật khẩu ít nhất phải dài 8 ký tự')
  .max(100, 'Mật khẩu không thể vượt qua 100 ký tự')
  .required('Mật khẩu là bắt buộc');

// ============= schemas
const registerUserSchema = object({
  email,
  password,
  confirmPassword: string()
    .oneOf([ref('password')], 'Mật khẩu xác nhận không đúng')
    .label('confirm password'),
  account_type,
});

const signInSchema = object({
  email,
  password: string().min(8, 'Mật khẩu ít nhất 8 ký tự'),
});

const updateCurrentUserSchema = object({
  name,
  phone,
  address,
  fields,
  overview,
});

const updatePasswordSchema = object({
  oldPassword: string()
    .required('Mật khẩu cũ là bắt buộc')
    .min(8, 'Mật khẩu ít nhất 8 ký tự'),
  newPassword: password,
  newPasswordConfirm: string()
    .oneOf([ref('newPassword')], 'Mật khẩu xác nhận không đúng')
    .required('Xác nhận mật khẩu mới là bắt buộc'),
});

const createResetPasswordTokenSchema = object({
  email,
});

const resetPasswordWithTokenSchema = object({
  newPassword: password.label('new password'),
  confirmPassword: string()
    .oneOf([ref('newPassword')], 'Mật khẩu xác nhận không đúng')
    .required(),
});

export {
  createResetPasswordTokenSchema,
  registerUserSchema,
  resetPasswordWithTokenSchema,
  signInSchema,
  updateCurrentUserSchema,
  updatePasswordSchema,
};
