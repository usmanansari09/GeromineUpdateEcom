import * as yup from "yup";
import { VALIDATION } from "@/common/validation-messages";
export default yup.object().shape({
    images: yup
        .array()
        .test("required-images", VALIDATION.required, function (value) {
            const hasUploaded = value.filter((val) => val.uri).length;

            return hasUploaded !== 0;
        }),
    name: yup.string().required(VALIDATION.required),
    description: yup.string().required(VALIDATION.required),
    size: yup.string().required(VALIDATION.required),
});
