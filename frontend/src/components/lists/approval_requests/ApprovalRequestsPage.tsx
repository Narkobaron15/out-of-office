import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import {useNavigate} from "react-router-dom"
import ApprovalRequestModel from "../../../models/approval_request.ts"

export default function ApprovalRequestsPage() {
    const [requests, setRequests] = useState<ApprovalRequestModel[] | null>()
    const auth = localStorage.getItem('auth')
    const navigate = useNavigate()

    useEffect(() => {
        // TODO: Add an error toast
        if (!auth) {
            navigate(-1)
        }

        http_common.get('approval-requests')
            .then(({data}) => setRequests(data.data))
            .catch(() => {
                navigate('/')
            })
    }, [])

    return requests ? (
        <div>
            <h1>Approval requests</h1>
            <p>Approval requests list</p>
        </div>
    ) : (
        // TODO: Spinner
        <></>
    )
}
