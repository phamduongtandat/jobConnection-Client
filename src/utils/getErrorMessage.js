import _ from 'lodash';

const getErrorMessage = (errors, fieldName) => {
  const error = _.get(errors, fieldName);
  if (!error || typeof error.message !== 'string') return undefined;

  return error.message;
};

export { getErrorMessage };
