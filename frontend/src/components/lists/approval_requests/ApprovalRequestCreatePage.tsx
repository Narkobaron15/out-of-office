import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik"
import validationSchema from "./validations/schemas.ts"
import ApprovalRequestCreateModel from "../../../models/approval_request/approval_request_create_model.ts"
import http_common from "../../../common/http_common.ts"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {toastOptions} from "../../common/toast_options.ts"
import checkAuth from "../check_auth.ts";

export default function ApprovalRequestCreatePage() {
    const initialValues = {
        leaveRequestId: '',
        approverId: '',
        shortName: '',
        comment: ''
    }
    const navigate = useNavigate()

    const handleSubmit = (
        values: ApprovalRequestCreateModel,
        {setSubmitting}: FormikHelpers<ApprovalRequestCreateModel>
    ) => {
        http_common.post('/approval_requests', values)
            .then(response => {
                if (response.status === 201) {
                    navigate('/approval-requests')
                }
            })
            .catch(e => {
                console.error(e)
                toast.error('Some error happened', toastOptions)
            })
            .finally(() => {
                setSubmitting(false)
            })
    }

    checkAuth(navigate)

    // TODO: Add dropdowns for leaveRequestId and approverId

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Approval Request</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({isSubmitting}) => (
                    <Form className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label className="block text-gray-700">Leave Request ID</label>
                            <Field name="leaveRequestId" className="form-input mt-1 block w-full"/>
                            <ErrorMessage name="leaveRequestId" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Approver ID</label>
                            <Field name="approverId" className="form-input mt-1 block w-full"/>
                            <ErrorMessage name="approverId" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Short Name</label>
                            <Field name="shortName" className="form-input mt-1 block w-full"/>
                            <ErrorMessage name="shortName" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Comment</label>
                            <Field name="comment" className="form-input mt-1 block w-full"/>
                            <ErrorMessage name="comment" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded"
                                disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
