import LeaveRequestCreateModel from "../../../../models/leave_request/leave_request_create_model.ts";
import AbsenceReason from "../../../../models/absence_reason.ts";
import Status from "../../../../models/status.ts";

const createInitialValues: LeaveRequestCreateModel = {
    employeeId: '',
    absenceReason: AbsenceReason.OTHER,
    start: new Date(),
    end: new Date(),
    shortName: '',
    comment: '',
    status: Status.INDETERMINATE,
}

export { createInitialValues }
