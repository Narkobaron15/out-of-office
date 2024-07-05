import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import ProjectModel from "../../../models/project/project_model.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {toast} from "react-toastify";
import {errorToastOptions} from "../../common/toast_options.ts";

export default function ProjectPage() {
    const {id} = useParams()
    const [project, setProject] = useState<ProjectModel | null>()
    const navigate = useNavigate()

    useEffect(() => {
        http_common.get(`projects/${id}`)
            .then(({data}) => setProject(new ProjectModel(data)))
            .catch(() => {
                toast.error('Some error happened', errorToastOptions)
                navigate(-1)
            })
    }, [])

    return project ? (
        <div>
            <h1>Project {id}</h1>
            <p>Project details</p>
        </div>
    ) : <DefaultSpinner/>
}
