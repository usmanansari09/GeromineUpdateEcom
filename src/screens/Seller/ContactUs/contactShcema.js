import * as yup from "yup";
import { VALIDATION } from "@/common/validation-messages";

export default yup.object().shape({
    name: yup.string().required(VALIDATION.required),
    email: yup.string().email().required(VALIDATION.required),
    subject: yup.string().required(VALIDATION.required),
    message: yup.string().required(VALIDATION.required),
});
