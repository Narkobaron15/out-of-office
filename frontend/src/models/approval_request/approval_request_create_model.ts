export default class ApprovalRequestCreateModel {
    leaveRequestId: string
    approverId: string
    shortName: string
    comment: string

    constructor(approvalRequest: ApprovalRequestCreateModel) {
        this.leaveRequestId = approvalRequest.leaveRequestId
        this.approverId = approvalRequest.approverId
        this.shortName = approvalRequest.shortName
        this.comment = approvalRequest.comment
    }
}
