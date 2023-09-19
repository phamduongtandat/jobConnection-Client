/**
 * get account type in vietnamese
 */

const getAccountType = (role, account_type) => {
  if (role === 'admin') return 'quản trị viên';
  if (account_type === 'personal') return 'người lao động';
  return 'nhà tuyển dụng';
};

export default getAccountType;
