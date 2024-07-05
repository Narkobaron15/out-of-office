import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import {useNavigate} from "react-router-dom"
import LeaveRequestModel from "../../../models/leave_request/leave_request_model.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Button} from "flowbite-react"
import {toast} from "react-toastify";
import {errorToastOptions} from "../../common/toast_options.ts";

export default function LeaveRequestsPage() {
    const [requests, setRequests] = useState<LeaveRequestModel[] | null>()
    const auth = localStorage.getItem('auth')
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth) {
            toast.error('Some error happened', errorToastOptions)
            navigate(-1)
        }

        http_common.get('leave-requests')
            .then(({data}) => setRequests(data.data))
            .catch(() => {
                toast.error('Some error happened', errorToastOptions)
                navigate('/')
            })
    }, [])

    return requests ? (
        requests.length > 0 ? (
            <></>
        ) : (
            <div className="m-8">
                <h2 className="font-bold text-4xl mb-5" role="alert">
                    No leave requests found
                </h2>
                <Button href="/employees/create" className="btn btn-primary inline-flex">
                    Add a new leave request
                </Button>
            </div>
        )
    ) : <DefaultSpinner/>
}
