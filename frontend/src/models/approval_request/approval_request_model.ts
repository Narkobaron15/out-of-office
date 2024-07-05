import EmployeeModel from "../employee/employee_model.ts"
import LeaveRequestModel from "../leave_request/leave_request_model.ts"
import Status from "../status.ts"

export default class ApprovalRequestModel {
    id: string
    approver: EmployeeModel
    leaveRequest: LeaveRequestModel
    status: Status
    shortName: string
    comment: string

    constructor(approvalRequest: ApprovalRequestModel) {
        this.id = approvalRequest.id
        this.approver = approvalRequest.approver
        this.leaveRequest = approvalRequest.leaveRequest
        this.status = approvalRequest.status
        this.shortName = approvalRequest.shortName
        this.comment = approvalRequest.comment
    }
}
