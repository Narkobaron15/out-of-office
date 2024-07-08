import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import {Link, useNavigate} from "react-router-dom"
import ApprovalRequestModel from "../../../models/approval_request/approval_request_model.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Button, Table} from "flowbite-react"
import {toast} from "react-toastify"
import {toastOptions} from "../../common/toast_options.ts"
import AuthHandler from "../../common/auth_handler.ts";
import './css/approval_requests.css'

const handleApprove = (id: string) => {
    http_common.post(`approval-requests/approve/${id}`)
        .then(() => {
            window.location.reload()
        })
        .catch((err) => {
            console.error(err)
            toast.error('Some error happened', toastOptions)
        })
}

const handleReject = (id: string) => {
    http_common.post(`approval-requests/reject/${id}`)
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
            .catch(({response}) => AuthHandler(response, navigate))
    }, [])

    return requests ? (
        requests.length > 0 ? (
            <div className="approvals-container">
                <h1>Approval Requests</h1>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Approver</Table.HeadCell>
                            <Table.HeadCell>Leave Request</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Short Name</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {requests.map((request) => (
                                <Table.Row key={request.id} className="border-t">
                                    <Table.Cell>{request.id}</Table.Cell>
                                    <Table.Cell>{request.approver.fullName}</Table.Cell>
                                    <Table.Cell>{request.leaveRequest.id}</Table.Cell>
                                    <Table.Cell>{request.status}</Table.Cell>
                                    <Table.Cell>{request.shortName}</Table.Cell>
                                    <Table.Cell className="flex justify-center">{
                                        request.status !== 'APPROVED' && request.status !== 'REJECTED'
                                            ? <>
                                                <Button pill gradientDuoTone="purpleToBlue" className="mr-2"
                                                        onClick={() => handleApprove(request.id)}>
                                                    Approve
                                                </Button>
                                                <Button pill gradientDuoTone="purpleToBlue"
                                                        onClick={() => handleReject(request.id)}>
                                                    Reject
                                                </Button>
                                            </> : <></>
                                    }</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
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
