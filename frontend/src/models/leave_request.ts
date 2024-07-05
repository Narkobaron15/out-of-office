import EmployeeModel from "./employee_model.ts"
import Status from "./status.ts"
import AbsenceReason from "./absence_reason.ts"

export default class LeaveRequestModel {
    id: string
    employee: EmployeeModel
    absenceReason: AbsenceReason
    start: Date
    end: Date
    shortName: string
    comment: string | null
    status: Status
    createdAt: Date
    updatedAt: Date

    constructor(model: LeaveRequestModel) {
        this.id = model.id
        this.employee = model.employee
        this.absenceReason = model.absenceReason
        this.start = model.start
        this.end = model.end
        this.shortName = model.shortName
        this.comment = model.comment
        this.status = model.status
        this.createdAt = model.createdAt
        this.updatedAt = model.updatedAt
    }
}
