import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import LeaveRequestModel from "../../../models/leave_request.ts";

export default function LeaveRequestCreatePage() {
    const {id} = useParams()
    const [request, setRequest] = useState<LeaveRequestModel | null>()
    const navigate = useNavigate()

    useEffect(() => {
        // TODO: Add an error toast

        http_common.get(`leave-requests/${id}`)
            .then(({data}) => setRequest(new LeaveRequestModel(data)))
            .catch(() => {
                navigate(-1)
            })
    }, [])

    return request ? (
        <div>
            <h1>Leave request {id}</h1>
            <p>Leave request details</p>
        </div>
    ) : (
        // TODO: Add a spinner
        <></>
    )
}
