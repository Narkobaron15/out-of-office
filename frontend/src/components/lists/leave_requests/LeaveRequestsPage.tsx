import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import {useNavigate} from "react-router-dom"
import LeaveRequestModel from "../../../models/leave_request.ts";

export default function LeaveRequestsPage() {
    const [request, setRequest] = useState<LeaveRequestModel[] | null>()
    const auth = localStorage.getItem('auth')
    const navigate = useNavigate()

    useEffect(() => {
        // TODO: Add an error toast
        if (!auth) {
            navigate(-1)
        }

        http_common.get('leave-requests')
            .then(({data}) => setRequest(data.data))
            .catch(() => {
                navigate('/')
            })
    }, [])

    return request ? (
        <div>
            <h1>Leave requests</h1>
            <p>Leave requests list</p>
        </div>
    ) : (
        // TODO: Spinner
        <></>
    )
}
