import {useEffect, useState} from "react";
import EmployeeModel from "../../../models/employee_model.ts";
import http_common from "../../../common/http_common.ts";
import {useNavigate} from "react-router-dom";

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
    }, []);

    return employees ? (
        <div>
            <h1>Employees</h1>
            <p>Employees list</p>
        </div>
    ) : (
        // TODO: Spinner
        <></>
    )
}
