import * as yup from "yup";
import { VALIDATION } from "@/common/validation-messages";
export default yup.object().shape({
  full_name: yup.string().required(VALIDATION.required),
  username: yup.string().required(VALIDATION.required),
  dob: yup.string().required(VALIDATION.required),
  phone: yup.string().required(VALIDATION.required),
  address: yup.string().required(VALIDATION.required),
  state: yup.string().required(VALIDATION.required),
  zip_code: yup.string().required(VALIDATION.required),
  country: yup.string().required(VALIDATION.required),
  email: yup.string().required(VALIDATION.required),
  password: yup.string().required(VALIDATION.required),
  confirmedPassword: yup
    .string()
    .required(VALIDATION.required)
    .oneOf([yup.ref("password"), null], "your password does not match"),
  profile_visibility: yup.number().default(true),
});
