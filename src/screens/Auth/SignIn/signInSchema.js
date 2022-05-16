import * as yup from "yup";
import { VALIDATION } from "@/common/validation-messages";
export default yup.object().shape({
    email: yup.string().required(VALIDATION.required),
    password: yup.string().required(VALIDATION.required),
});
