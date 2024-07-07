import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {toast} from "react-toastify"
import {toastOptions} from "../../common/toast_options.ts"
import ProjectUpdateModel from "../../../models/project/project_update_model.ts"
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik"
import projectSchema from "./validations/schemas.ts"
import {Button} from "flowbite-react"

export default function ProjectEditPage() {
    const {id} = useParams()
    const [project, setProject] = useState<ProjectUpdateModel | null>()
    const navigate = useNavigate()

    useEffect(() => {
        http_common.get('auth/check')
            .then(response => {
                if (response.data.position !== 'HR_MANAGER') {
                    toast.error('You are not authorized to view this page', toastOptions)
                    navigate(-1)
                }
            })
            .catch(() => {
                toast.error('You are not authorized to view this page', toastOptions)
                navigate(-1)
            })

        http_common.get(`projects/${id}`)
            .then(({data}) => setProject(new ProjectUpdateModel(data)))
            .catch(() => {
                toast.error('Some error happened', toastOptions)
                navigate(-1)
            })
    }, [])

    const handleSubmit = (
        values: ProjectUpdateModel,
        {setSubmitting}: FormikHelpers<ProjectUpdateModel>
    ) => {
        http_common.put(`projects/${id}`, values)
            .then(() => {
                toast.success('Project updated successfully', toastOptions)
                navigate('/projects')
            })
            .catch(() => {
                toast.error('Some error happened', toastOptions)
            })
            .finally(() => setSubmitting(false))
    }

    return project ? (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Update Project</h1>
            <Formik
                initialValues={project}
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
                                <option value="">Select type</option>
                                <option value="WEB">Web</option>
                                <option value="MOBILE">Mobile</option>
                                <option value="DESKTOP">Desktop</option>
                                <option value="EMBEDDED">Embedded</option>
                                <option value="CROSS_PLATFORM">Cross Platform</option>
                                <option value="GAME">Game</option>
                                <option value="OTHER">Other</option>
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
                            <label htmlFor="managerId">Manager ID</label>
                            <Field name="managerId" type="text"/>
                            <ErrorMessage name="managerId" component="div"/>
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
    ) : <DefaultSpinner/>
}
