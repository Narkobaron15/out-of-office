import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik"
import validationSchema from "./validations/schemas.ts"
import ApprovalRequestCreateModel from "../../../models/approval_request/approval_request_create_model.ts"
import http_common from "../../../common/http_common.ts"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {toastOptions} from "../../common/toast_options.ts"
import {useEffect, useState} from "react";
import LeaveRequestModel from "../../../models/leave_request/leave_request_model.ts";
import EmployeeModel from "../../../models/employee/employee_model.ts";
import DefaultSpinner from "../../common/DefaultSpinner.tsx";

export default function ApprovalRequestCreatePage() {
    const initialValues = {
        leaveRequestId: '',
        approverId: '',
        shortName: '',
        comment: '',
    }
    const navigate = useNavigate()

    const [leaveRequests, setLeaveRequests] = useState<LeaveRequestModel[]>()
    const [approvers, setApprovers] = useState<EmployeeModel[]>()

    const handleSubmit = (
        values: ApprovalRequestCreateModel,
        {setSubmitting}: FormikHelpers<ApprovalRequestCreateModel>,
    ) => {
        http_common.post('/approval-requests', values)
            .then(() => {
                navigate('/approval-requests')
            })
            .catch(e => {
                console.error(e)
                toast.error('Some error happened', toastOptions)
            })
            .finally(() => setSubmitting(false))
    }

    useEffect(() => {
        http_common.get('auth/check')
            .then(response => {
                if (response.data.position === 'EMPLOYEE') {
                    toast.error('You are not authorized to view this page', toastOptions)
                    navigate(-1)
                }

                http_common.get('leave-requests')
                    .then(({data}) => {
                        setLeaveRequests(data.data)
                    })
                    .catch(() => {
                        toast.error('Some error happened', toastOptions)
                    })

                http_common.get('employees/approvers')
                    .then(({data}) => {
                        setApprovers(data.data)
                    })
                    .catch(() => {
                        toast.error('Some error happened', toastOptions)
                    })
            })
            .catch(() => {
                toast.error('You are not authorized to view this page', toastOptions)
                navigate(-1)
            })
    }, [])

    if (!leaveRequests || !approvers)
        return <DefaultSpinner/>
    else if (leaveRequests.length === 0 || approvers.length === 0) {
        toast.error('No leave requests or approvers found', toastOptions)
        navigate(-1)
        return
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Approval Request</h1>
            <Formik initialValues={{
                ...initialValues,
                leaveRequestId: leaveRequests[0].id,
                approverId: approvers[0].id,
            }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                {({isSubmitting}) => (
                    <Form className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label className="block text-gray-700">Leave Request ID</label>
                            <Field name="leaveRequestId" as="select" className="form-input mt-1 block w-full">
                                {leaveRequests.map(leaveRequest => (
                                    <option key={leaveRequest.id} value={leaveRequest.id}>
                                        {leaveRequest.shortName}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="leaveRequestId" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Approver ID</label>
                            <Field name="approverId" as="select" className="form-input mt-1 block w-full">
                                {approvers.map(approver => (
                                    <option key={approver.id} value={approver.id}>
                                        {approver.fullName}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="approverId" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Short Name</label>
                            <Field name="shortName" className="form-input mt-1 block w-full"/>
                            <ErrorMessage name="shortName" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Comment</label>
                            <Field as="textarea" name="comment" className="form-input mt-1 block w-full"/>
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
