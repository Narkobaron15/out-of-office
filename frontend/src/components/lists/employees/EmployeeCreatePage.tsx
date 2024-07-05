import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import EmployeeModel from "../../../models/employee_model.ts";
import http_common from "../../../common/http_common.ts";

export default function EmployeeCreatePage() {
    const {id} = useParams()
    const [employee, setEmployee] = useState<EmployeeModel | null>()
    const navigate = useNavigate()

    useEffect(() => {
        // TODO: Add an error toast

        http_common.get(`employees/${id}`)
            .then(({data}) => setEmployee(new EmployeeModel(data)))
            .catch(() => {
                navigate(-1)
            })
    }, []);

    return employee ? (
        <div>
            <h1>Employee {id}</h1>
            <p>Employee details</p>
        </div>
    ) : (
        // TODO: Add a spinner
        <></>
    )
}
