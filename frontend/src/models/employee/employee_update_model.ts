import Subdivision from "./subdivision.ts";
import Position from "./position.ts";

export default class EmployeeUpdateModel {
    id: string
    fullName: string
    email: string
    password: string
    subdivision: Subdivision
    position: Position
    status: boolean
    daysOff: number
    avatar?: File
    delete_avatar?: boolean

    constructor(employee: EmployeeUpdateModel) {
        this.id = employee.id
        this.fullName = employee.fullName
        this.email = employee.email
        this.password = employee.password
        this.subdivision = employee.subdivision
        this.position = employee.position
        this.status = employee.status
        this.daysOff = employee.daysOff
    }
}
