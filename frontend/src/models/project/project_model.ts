import EmployeeModel from "../employee/employee_model.ts"
import ProjectType from "./project_type.ts"

export default class ProjectModel {
    id: string
    name: string
    type: ProjectType
    start: Date
    end: Date
    manager: EmployeeModel
    comment: string
    status: boolean
    createdAt: Date
    updatedAt: Date
    employees: EmployeeModel[]

    constructor(project: ProjectModel) {
        this.id = project.id
        this.name = project.name
        this.type = project.type
        this.start = project.start
        this.end = project.end
        this.manager = project.manager
        this.comment = project.comment
        this.status = project.status
        this.createdAt = new Date(project.createdAt)
        this.updatedAt = new Date(project.updatedAt)
        this.employees = project.employees ?? []
    }
}
