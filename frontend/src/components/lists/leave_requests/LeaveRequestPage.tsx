import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import LeaveRequestModel from "../../../models/leave_request/leave_request_model.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {toast} from "react-toastify";
import {errorToastOptions} from "../../common/toast_options.ts";

export default function LeaveRequestPage() {
    const {id} = useParams()
    const [request, setRequest] = useState<LeaveRequestModel | null>()
    const navigate = useNavigate()

    useEffect(() => {
        http_common.get(`leave-requests/${id}`)
            .then(({data}) => setRequest(new LeaveRequestModel(data)))
            .catch(() => {
                toast.error('Some error happened', errorToastOptions)
                navigate(-1)
            })
    }, [])

    return request ? (
        <div>
            <h1>Leave request {id}</h1>
            <p>Leave request details</p>
        </div>
    ) : <DefaultSpinner/>
}
