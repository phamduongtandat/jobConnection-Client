import { object, string } from 'yup';

const createMessageSchema = object({
  content: string()
    .min(1, 'Tin nhắn ít nhất bao gồm một ký tự.')
    .trim()
    .required('Content is required'),
  to: string().trim().length(24),
  messageType: string().when('to', {
    is: (to) => !!to,
    // receiver is defined
    then: (schema) => schema.default('business'),
    // receiver is not defined
    otherwise: (schema) => schema.default('support'),
  }),
});

export { createMessageSchema };
