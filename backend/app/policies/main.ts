/*
|--------------------------------------------------------------------------
| Bouncer policies
|--------------------------------------------------------------------------
|
| You may define a collection of policies inside this file and pre-register
| them when creating a new bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also, they are a must if you want to perform authorization inside Edge
| templates.
|
*/

export const policies = {
  LeaveRequestPolicy: () => import('#policies/leave_request_policy'),
  ProjectPolicy: () => import('#policies/project_policy'),
  ApprovalRequestPolicy: () => import('#policies/approval_request_policy'),
  EmployeePolicy: () => import('#policies/employee_policy'),
}
