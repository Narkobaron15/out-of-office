import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import EmployeeModel from "../../../models/employee/employee_model.ts"
import http_common from "../../../common/http_common.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Button} from "flowbite-react"
import {toast} from "react-toastify";
import {errorToastOptions} from "../../common/toast_options.ts";

export default function EmployeePage() {
    const {id} = useParams()
    const [employee, setEmployee] = useState<EmployeeModel | null>()
    const navigate = useNavigate()

    useEffect(() => {
        http_common.get(`employees/${id}`)
            .then(({data}) => setEmployee(new EmployeeModel(data)))
            .catch(() => {
                toast.error('Some error happened', errorToastOptions)
                navigate(-1)
            })
    }, [])

    const handleDelete = () => {
        http_common.delete(`employees/${id}`)
            .then(() => {
                navigate('/employees')
            })
            .catch(() => {
                toast.error('Some error happened', errorToastOptions)
                navigate(-1)
            })
    }

    return employee ? (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p><strong>ID:</strong> {employee.id}</p>
                <p><strong>Full Name:</strong> {employee.fullName}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <p><strong>Subdivision:</strong> {employee.subdivision}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                <p><strong>Status:</strong> {employee.status ? 'Active' : 'Inactive'}</p>
                <p><strong>Days Off:</strong> {employee.daysOff}</p>
                <p><strong>Projects:</strong> {employee.projects.map(project => project.name).join(', ')}</p>
            {/*    Actions: */}
                <Button href={`/employees/${employee.id}/edit`} className="btn btn-primary">Edit</Button>
                <Button onClick={handleDelete} className="btn btn-danger">Delete</Button>
            </div>
        </div>
    ) : <DefaultSpinner/>
}
