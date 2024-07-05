import ProjectModel from "./project_model.ts";
import Subdivision from "./subdivision.ts";
import Position from "./position.ts";

export default class EmployeeModel {
    id: string
    fullName: string
    email: string
    password: string
    subdivision: Subdivision
    position: Position
    status: boolean
    partner: EmployeeModel | null
    daysOff: number
    pictureUrl?: string | null
    createdAt: Date
    updatedAt: Date | null
    projects: ProjectModel[]

    constructor(employee: EmployeeModel) {
        this.id = employee.id
        this.fullName = employee.fullName
        this.email = employee.email
        this.password = employee.password
        this.subdivision = employee.subdivision
        this.position = employee.position
        this.status = employee.status
        this.partner = employee.partner
        this.daysOff = employee.daysOff
        this.pictureUrl = employee.pictureUrl
        this.createdAt = new Date(employee.createdAt)
        this.updatedAt = employee.updatedAt ? new Date(employee.updatedAt) : null
        this.projects = employee.projects ?? []
    }
}
