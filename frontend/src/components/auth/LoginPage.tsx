import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik"
import LoginModel from "../../models/login_model.ts"
import {LoginValidationSchema} from "../../models/schemas.ts"
import {Label} from "flowbite-react"
import './loginpage.css'
import {HiOutlineLockClosed} from "react-icons/hi"
import http_common from "../../common/http_common.ts"
import {AxiosError} from "axios"

const initialValues = {
    email: "",
    password: "",
}

export default function LoginPage() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            navigate('/account')
        }
    }, [])

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<string | null>()

    const onSubmit = async (
        values: LoginModel, 
        {setSubmitting}: FormikHelpers<LoginModel>
    ) => {
        try {
            const res = await http_common.post('/auth/login', values)
            localStorage.setItem('auth', "true")
            localStorage.setItem('role', res.data)
            navigate('/')
        } catch (error: AxiosError | any) {
            if (error.code==='ERR_NETWORK' || error.code==='ECONNREFUSED') {
                setError("Server is unreachable. Check your connection")
            } else {
                setError("Invalid credentials")
            }
        }
        finally {
            setSubmitting(false)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LoginValidationSchema}
            onSubmit={onSubmit}>
            {({isSubmitting}) => (
                <Form className="login-form">
                    <div className="login-container">
                        <h2>Login</h2>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Your email"/>
                            </div>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required/>
                        </div>
                        <ErrorMessage name="email" component="div" className="error"/>
                        <div className="block relative">
                            <Field
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Your password"/>
                            <HiOutlineLockClosed
                                onClick={() => setShowPassword(!showPassword)}
                                className="icon"/>
                        </div>
                        <ErrorMessage name="password" component="div" className="error"/>
                        <button type="submit">{
                            isSubmitting ? "Loading..." : "Login"
                        }</button>
                        {error && <div className="error">{error}</div>}
                    </div>
                </Form>
            )}
        </Formik>
    )
}
