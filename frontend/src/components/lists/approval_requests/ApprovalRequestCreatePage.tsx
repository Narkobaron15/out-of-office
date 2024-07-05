import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import http_common from "../../../common/http_common.ts";
import ApprovalRequestModel from "../../../models/approval_request.ts";

export default function ApprovalRequestCreatePage() {
    const {id} = useParams()
    const [request, setRequest] = useState<ApprovalRequestModel | null>()
    const navigate = useNavigate()

    useEffect(() => {
        // TODO: Add an error toast

        http_common.get(`approval-requests/${id}`)
            .then(({data}) => setRequest(new ApprovalRequestModel(data)))
            .catch(() => {
                navigate(-1)
            })
    }, []);

    return request ? (
        <div>
            <h1>Request {id}</h1>
            <p>Request details</p>
        </div>
    ) : (
        // TODO: Add a spinner
        <></>
    )
}
