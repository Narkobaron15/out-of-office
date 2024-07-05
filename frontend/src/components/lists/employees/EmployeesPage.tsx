import {useEffect, useState} from "react"
import EmployeeModel from "../../../models/employee_model.ts"
import http_common from "../../../common/http_common.ts"
import {useNavigate} from "react-router-dom"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Button} from "flowbite-react"
import {FaEye} from "react-icons/fa6"
import {FaEdit} from "react-icons/fa"

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<EmployeeModel[] | null>()
    const auth = localStorage.getItem('auth')
    const navigate = useNavigate()

    useEffect(() => {
        // TODO: Add an error toast
        if (!auth) {
            navigate(-1)
        }

        http_common.get('employees')
            .then(({data}) => setEmployees(data.data))
            .catch(() => {
                navigate('/')
            })
    }, [])

    return employees ? (
            employees.length > 0 ? (
                <div className="employees-list">
                    <h1>Employees</h1>
                    <div className="overflow-x-auto">
                        <table>
                            <thead>
                            <tr className="bg-gray-200 text-left">
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Subdivision</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Days Off</th>
                                <th>Projects</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id} className="border-t">
                                    <td>{employee.id}</td>
                                    <td>{employee.fullName}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.subdivision}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.status ? 'Active' : 'Inactive'}</td>
                                    <td>{employee.daysOff}</td>
                                    <td>
                                        {employee.projects.map((project) => (
                                            <span key={project.id} className="block">
                                              {project.name}
                                            </span>
                                        ))}
                                    </td>
                                    <td>
                                        <Button href={`/employees/${employee.id}`} className="btn btn-primary">
                                            <FaEye/>
                                        </Button>
                                        <Button href={`/employees/${employee.id}/edit`} className="btn btn-primary">
                                            <FaEdit/>
                                        </Button>
                                        <Button href={`/employees/${employee.id}/delete`} className="btn btn-primary">
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="m-8">
                    <h2 className="font-bold text-4xl mb-5" role="alert">
                        No employees found
                    </h2>
                    <Button href="/employees/create" className="btn btn-primary inline-flex">
                        Add a new employee
                    </Button>
                </div>
            )
        ) : <DefaultSpinner/>
}
