import * as yup from 'yup';
import {VALIDATION} from '@/common/validation-messages';
export default yup.object().shape({
  email: yup.string().email().required(VALIDATION.required),
  full_name: yup.string().required(VALIDATION.required),
  image: yup
    .object()
    .test('required-images', VALIDATION.required, function (value) {
      const hasUploaded = value.uri.length !== 0;
      return hasUploaded !== 0;
    }),
  phone: yup.string().required(VALIDATION.required),
  interest: yup
    .string()
    .transform(value => (!!value ? value : ''))
    .trim()
    .required(VALIDATION.required),
  country: yup.string().required(VALIDATION.required),
  username: yup.string().notRequired(),
  password: yup.string().notRequired(),
});
