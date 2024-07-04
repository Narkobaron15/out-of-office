import * as Yup from "yup"

const LoginValidationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required").min(8, "Password must be at least 8 characters"),
})

export { LoginValidationSchema }
