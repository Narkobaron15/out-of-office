import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import {Link, useNavigate} from "react-router-dom"
import ApprovalRequestModel from "../../../models/approval_request/approval_request_model.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Button} from "flowbite-react"
import {toast} from "react-toastify"
import {toastOptions} from "../../common/toast_options.ts"

const handleApprove = (id: string) => {
    http_common.post(`approval-requests/approve?id=${id}`)
        .then(() => {
            window.location.reload()
        })
        .catch((err) => {
            console.error(err)
            toast.error('Some error happened', toastOptions)
        })
}

const handleReject = (id: string) => {
    http_common.post(`approval-requests/reject?id=${id}`)
        .then(() => {
            window.location.reload()
        })
        .catch((err) => {
                console.error(err)
                toast.error('Some error happened', toastOptions)
            },
        )
}

export default function ApprovalRequestsPage() {
    const [requests, setRequests] = useState<ApprovalRequestModel[] | null>()
    const auth = localStorage.getItem('auth')
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth) {
            toast.error('Some error happened', toastOptions)
            navigate(-1)
        }

        http_common.get('approval-requests')
            .then(({data}) => setRequests(data.data))
            .catch(({response}) => {
                if (response.status === 401) {
                    toast.error('You are not authorized to view this page', toastOptions)
                    localStorage.removeItem('auth')
                    navigate('/login')
                }
                toast.error('Some error happened', toastOptions)
                navigate('/')
            })
    }, [])

    return requests ? (
        requests.length > 0 ? (
            <div className="approvals-container">
                <h1>Approval Requests</h1>
                <div className="overflow-x-auto">
                    <table>
                        <thead>
                        <tr className="bg-gray-200 text-left">
                            <th>ID</th>
                            <th>Approver</th>
                            <th>Leave Request</th>
                            <th>Status</th>
                            <th>Short Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {requests.map((request) => (
                            <tr key={request.id} className="border-t">
                                <td>{request.id}</td>
                                <td>{request.approver.fullName}</td>
                                <td>{request.leaveRequest.id}</td>
                                <td>{request.status}</td>
                                <td>{request.shortName}</td>
                                <td className='flex'>
                                    <Button pill gradientDuoTone="purpleToBlue" className="mr-2"
                                            onClick={() => handleApprove(request.id)}>
                                        Approve
                                    </Button>
                                    <Button pill gradientDuoTone="purpleToBlue"
                                            onClick={() => handleReject(request.id)}>
                                        Reject
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Link to="/approval-requests/create"
                      className="bg-blue-500 text-white py-2 px-4 rounded mt-4 inline-block">
                    Create Approval Request
                </Link>
            </div>
        ) : (
            <div className="m-8">
                <h2 className="font-bold text-4xl mb-5" role="alert">
                    No approval requests found
                </h2>
                <Button href="/approval-requests/create" className="btn btn-primary inline-flex">
                    Add a new approval request
                </Button>
            </div>
        )
    ) : <DefaultSpinner/>
}
