import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik"
import {createInitialValues} from "./validations/initial_values.ts"
import LeaveRequestCreateModel from "../../../models/leave_request/leave_request_create_model.ts"
import http_common from "../../../common/http_common.ts"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {toastOptions} from "../../common/toast_options.ts"
import validationSchema from "./validations/schemas.ts"
import './css/leave_requests.css'
import {Button} from "flowbite-react"
import {useEffect} from "react";

export default function LeaveRequestCreatePage() {
    const navigate = useNavigate()
    const handleSubmit = (
        values: LeaveRequestCreateModel,
        {setSubmitting}: FormikHelpers<LeaveRequestCreateModel>
    ) => {
        const payload: any = values
        delete payload.status
        http_common.post('leave-requests', payload)
            .then(() => {
                toast.success('Leave request created successfully', toastOptions)
                navigate('/leave-requests')
            })
            .catch(() => {
                toast.error('Some error happened', toastOptions)
            })
            .finally(() => setSubmitting(false))
    }

    useEffect(() => {
        http_common.get('auth/check')
            .then(response => {
                if (response.status > 299) {
                    toast.error('You are not authorized to view this page', toastOptions)
                    navigate(-1)
                }
            })
            .catch(() => {
                toast.error('You are not authorized to view this page', toastOptions)
                navigate(-1)
            })
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Leave Request</h1>
            <Formik
                initialValues={createInitialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                <Form className="bg-white p-4 rounded shadow">
                    <div className="mb-4">
                        <label className="block text-gray-700">Employee</label>
                        <Field name="employeeId" as="select" className="mt-1 block w-full">
                            <option value="">Select Employee</option>
                            {/* Map through employees here */}
                        </Field>
                        <ErrorMessage name="employeeId" component="div" className="text-red-600"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Absence Reason</label>
                        <Field name="absenceReason" as="select" className="mt-1 block w-full">
                            <option value="SICKNESS">Sickness</option>
                            <option value="VACATION">Vacation</option>
                            <option value="PERSONAL">Personal</option>
                            <option value="TRAINING">Training</option>
                            <option value="MATERNITY_LEAVE">Maternity leave</option>
                            <option value="OTHER">Other</option>
                        </Field>
                        <ErrorMessage name="absenceReason" component="div" className="text-red-600"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Start Date</label>
                        <Field name="start" type="date" className="mt-1 block w-full"/>
                        <ErrorMessage name="start" component="div" className="text-red-600"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">End Date</label>
                        <Field name="end" type="date" className="mt-1 block w-full"/>
                        <ErrorMessage name="end" component="div" className="text-red-600"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Short Name</label>
                        <Field name="shortName" type="text" className="mt-1 block w-full"/>
                        <ErrorMessage name="shortName" component="div" className="text-red-600"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Comment</label>
                        <Field as='textarea' name="comment" type="text" className="mt-1 block w-full"/>
                        <ErrorMessage name="comment" component="div" className="text-red-600"/>
                    </div>
                    <Button type="submit"
                            className="btn mt-4 inline-block bg-blue-500">
                        Create
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}
