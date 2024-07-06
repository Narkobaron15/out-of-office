import {Link, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import LeaveRequestModel from "../../../models/leave_request/leave_request_model.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {toast} from "react-toastify";
import {toastOptions} from "../../common/toast_options.ts";
import './css/leave_requests.css'

export default function LeaveRequestPage() {
    const {id} = useParams()
    const [request, setRequest] = useState<LeaveRequestModel | null>()
    const navigate = useNavigate()

    useEffect(() => {
        http_common.get(`leave-requests/${id}`)
            .then(({data}) => setRequest(new LeaveRequestModel(data)))
            .catch(() => {
                toast.error('Some error happened', toastOptions)
                navigate(-1)
            })
    }, [])

    return request ? (
        <div className="leave-request">
            <h1>Leave Request Details</h1>
            <div className="bg-white p-4 rounded shadow">
                <p><strong>Short Name:</strong> {request.shortName}</p>
                <p><strong>Employee:</strong> {request.employee.fullName}</p>
                <p><strong>Absence Reason:</strong> {request.absenceReason}</p>
                <p><strong>Start:</strong> {request.start.toLocaleDateString()}</p>
                <p><strong>End:</strong> {request.end.toLocaleDateString()}</p>
                <p><strong>Status:</strong> {request.status}</p>
                <p><strong>Comment:</strong> {request.comment}</p>
            </div>
            <Link to={`/leave-requests/${request.id}/edit`} className="view-page-link">
                Edit
            </Link>
            <Link to="/leave-requests" className="view-page-link">
                Back to List
            </Link>
        </div>
    ) : <DefaultSpinner/>
}
