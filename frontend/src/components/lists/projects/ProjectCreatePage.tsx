import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik"
import createInitialValues from "./validations/initial_values.ts"
import projectSchema from "./validations/schemas.ts"
import {Button} from "flowbite-react"
import {useEffect, useState} from "react"
import EmployeeModel from "../../../models/employee/employee_model.ts"
import http_common from "../../../common/http_common.ts"
import {toastOptions} from "../../common/toast_options.ts"
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"
import ProjectCreateModel from "../../../models/project/project_create_model.ts"

export default function ProjectCreatePage() {
    const [manager, setManager] = useState<EmployeeModel>()
    const navigate = useNavigate()

    useEffect(() => {
        http_common.get('auth/check')
            .then(({data}) => {
                setManager(new EmployeeModel(data))
                if (data.position === 'EMPLOYEE') {
                    toast.error('You are not allowed to create projects', toastOptions)
                    navigate('/')
                }
            })
            .catch(() => {
                toast.error('Some error happened', toastOptions)
                navigate('/')
            })
    }, [])

    const handleSubmit = (
        values: ProjectCreateModel,
        {setSubmitting}: FormikHelpers<ProjectCreateModel>
    ) => {
        http_common.post('projects', {...values, managerId: manager!.id})
            .then(() => {
                toast.success('Project created successfully', toastOptions)
                navigate('/projects')
            })
            .catch(() => {
                toast.error('Some error happened', toastOptions)
            })
            .finally(() => setSubmitting(false))
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Create Project</h1>
            <Formik
                initialValues={createInitialValues}
                validationSchema={projectSchema}
                onSubmit={handleSubmit}>
                {({isSubmitting}) => (
                    <Form>
                        <div className="mb-4">
                            <label htmlFor="name">Name</label>
                            <Field name="name" type="text"/>
                            <ErrorMessage name="name" component="div"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type">Type</label>
                            <Field name="type" as="select">
                                <option value="WEB">Web</option>
                                <option value="MOBILE">Mobile</option>
                                <option value="DESKTOP">Desktop</option>
                                <option value="EMBEDDED">Embedded</option>
                                <option value="CROSS_PLATFORM">Cross Platform</option>
                                <option value="GAME">Game</option>
                                <option selected value="OTHER">Other</option>
                            </Field>
                            <ErrorMessage name="type" component="div"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="start">Start Date</label>
                            <Field name="start" type="date"/>
                            <ErrorMessage name="start" component="div"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="end">End Date</label>
                            <Field name="end" type="date"/>
                            <ErrorMessage name="end" component="div"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="comment">Comment</label>
                            <Field as='textarea' name="comment" type="text"/>
                            <ErrorMessage name="comment" component="div"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status">Status</label>
                            <Field name="status" type="checkbox"/>
                            <ErrorMessage name="status" component="div"/>
                        </div>
                        <Button type="submit" disabled={isSubmitting}>Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
