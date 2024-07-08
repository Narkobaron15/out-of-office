import {Link, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import EmployeeModel from "../../../models/employee/employee_model.ts"
import http_common from "../../../common/http_common.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Badge, Button, Card} from "flowbite-react"
import {toast} from "react-toastify"
import {toastOptions} from "../../common/toast_options.ts"

const placeholderImage = "https://img.icons8.com/?size=128&id=tZuAOUGm9AuS&format=png"

export default function EmployeePage() {
    const {id} = useParams()
    const [employee, setEmployee] = useState<EmployeeModel | null>()
    const navigate = useNavigate()

    useEffect(() => {
        http_common.get(`employees/${id}`)
            .then(({data}) => setEmployee(new EmployeeModel(data)))
            .catch(() => {
                toast.error('Some error happened', toastOptions)
                navigate(-1)
            })
    }, [])

    const handleDelete = () => {
        http_common.delete(`employees/${id}`)
            .then(() => {
                navigate('/employees')
            })
            .catch(() => {
                toast.error('Some error happened', toastOptions)
                navigate(-1)
            })
    }

    return employee ? (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
            <div className="bg-white p-6 flex justify-center">
                <Card className="card">
                    <div className="flex justify-center mb-4">
                        <img
                            src={employee.pictureUrl ?? placeholderImage}
                            alt={`${employee.fullName}'s profile`}
                            className="w-24 h-24 rounded-full mr-4"
                        />
                        <div>
                            <h3 className="text-xl font-semibold">{employee.fullName}</h3>
                            <p>{employee.position}</p>
                            <p>{employee.subdivision}</p>
                        </div>
                    </div>

                    <section>
                        <h4>Contact Information</h4>
                        <p>
                            Email:&nbsp;
                            <Link to={`mailto:${employee.email}`} className="text-blue-600">
                                {employee.email}
                            </Link>
                        </p>
                    </section>

                    <section>
                        <h4>Account Details</h4>
                        <p>ID: {employee.id}</p>
                        <div className="flex justify-center">
                            Status:
                            <Badge className="ml-3 mt-1" color={employee.status ? "green" : "red"}>
                                {employee.status ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                        <p>Days Off Remaining: {employee.daysOff}</p>
                    </section>

                    <section>
                        <h4>Account Activity</h4>
                        <p>Created At: {new Date(employee.createdAt).toLocaleDateString()}</p>
                        <p>
                            Updated At:&nbsp;
                            {
                                employee.updatedAt
                                    ? new Date(employee.updatedAt).toLocaleDateString()
                                    : "Never"
                            }
                        </p>
                    </section>
                </Card>
            </div>
                {/*    Actions: */}
                <div className="flex justify-center mt-2 mb-7">
                    <Button href={`/employees/${employee.id}/edit`} className="btn btn-primary">Edit</Button>
                    <Button onClick={handleDelete} className="btn btn-danger ml-2">Delete</Button>
                </div>
        </div>
    ) : <DefaultSpinner/>
}
