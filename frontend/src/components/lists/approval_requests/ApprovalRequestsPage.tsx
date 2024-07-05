import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import {useNavigate} from "react-router-dom"
import ApprovalRequestModel from "../../../models/approval_request.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Button} from "flowbite-react"

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
        requests.length > 0 ? (
            <></>
        ) : (
            <div className="m-8">
                <h2 className="font-bold text-4xl mb-5" role="alert">
                    No approval requests found
                </h2>
                <Button href="/employees/create" className="btn btn-primary inline-flex">
                    Add a new approval request
                </Button>
            </div>
        )
    ) : <DefaultSpinner/>
}
