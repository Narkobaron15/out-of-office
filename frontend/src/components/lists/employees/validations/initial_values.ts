import EmployeeModel from "../../../../models/employee/employee_model.ts";
import Subdivision from "../../../../models/employee/subdivision.ts";
import Position from "../../../../models/employee/position.ts";

const initialValues = new EmployeeModel({
    id: '',
    fullName: '',
    email: '',
    password: '',
    subdivision: Subdivision.INDETERMINATE,
    position: Position.EMPLOYEE,
    status: true,
    partner: null,
    daysOff: 0,
    pictureUrl: '',
    createdAt: new Date(),
    updatedAt: null,
    projects: [],
})

const defaultPic = "https://img.icons8.com/?size=128&id=tZuAOUGm9AuS&format=png"

export {initialValues, defaultPic}
