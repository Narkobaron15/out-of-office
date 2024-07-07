import {useEffect, useState} from "react"
import EmployeeModel from "../../../models/employee/employee_model.ts"
import http_common from "../../../common/http_common.ts"
import {Link, useNavigate} from "react-router-dom"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Button} from "flowbite-react"
import {FaEdit, FaTrash} from "react-icons/fa"
import './css/employees.css'
import {toast} from "react-toastify"
import {toastOptions} from "../../common/toast_options.ts"
import {defaultPic} from "./validations/initial_values.ts";
import AuthHandler from "../../common/auth_handler.ts";

export default function EmployeesPage() {
    const [employees, setEmployees] = useState<EmployeeModel[] | null>()
    const auth = localStorage.getItem('auth')
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth) {
            toast.error('Some error happened', toastOptions)
            navigate(-1)
        }

        http_common.get('employees')
            .then(({data}) => setEmployees(data.data))
            .catch(({response}) => AuthHandler(response, navigate))
    }, [])

    const handleDelete = (id: string) => {
        http_common.delete(`employees/${id}`)
            .then(() => {
                toast.success('Employee deleted successfully', toastOptions)
                setEmployees(employees?.filter((employee) => employee.id !== id))
            })
            .catch(() => {
                toast.error('Some error happened', toastOptions)
                window.location.reload()
            })
    }

    return employees ? (
        employees.length > 0 ? (
            <div className="employees-list">
                <h1>Employees</h1>
                <div className="overflow-x-auto">
                    <table>
                        <colgroup>
                            <col className='w-1/12'/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col/>
                            <col className='w-max'/>
                            <col/>
                        </colgroup>
                        <thead>
                        <tr className="bg-gray-200 text-left">
                            <th>Avatar</th>
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
                                <td>
                                    <img src={employee.pictureUrl || defaultPic}
                                         alt="avatar" className="avatar rounded-full"/>
                                </td>
                                <td>
                                    <Link to={`/employees/${employee.id}`}>
                                        {employee.fullName}
                                    </Link>
                                </td>
                                <td>{employee.email}</td>
                                <td>{employee.subdivision}</td>
                                <td>{employee.position}</td>
                                <td>{employee.status ? 'Active' : 'Inactive'}</td>
                                <td>{employee.daysOff}</td>
                                <td>
                                    {employee.projects.map((project) => (
                                        <a href={`/projects/${project.id}`}
                                           key={project.id}
                                           className="block text-blue-500">
                                              {project.name}
                                        </a>
                                    ))}
                                </td>
                                <td className="flex justify-center">
                                    <Button href={`/employees/${employee.id}/edit`} className="btn btn-primary mr-2">
                                        <FaEdit/>
                                    </Button>
                                    <Button onClick={()=>handleDelete(employee.id)} className="btn btn-primary">
                                        <FaTrash/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center">
                    <Button href="/employees/create" className="btn btn-primary inline-flex">
                        Add a new employee
                    </Button>
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
