import * as yup from "yup";
import { VALIDATION } from "@/common/validation-messages";

export default yup.object().shape({
    country: yup.string().required(VALIDATION.required),
    name: yup.string().required(VALIDATION.required),
    address: yup.string().required(VALIDATION.required),
    state: yup.string().required(VALIDATION.required),
    zip_code: yup
        .string()
        .required(VALIDATION.required)
        .matches(/^\d+$/, "Enter a zip code"),
    phone: yup.string().notRequired(),
});
