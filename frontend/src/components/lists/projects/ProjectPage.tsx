import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import ProjectModel from "../../../models/project_model.ts"

export default function ProjectPage() {
    const {id} = useParams()
    const [project, setProject] = useState<ProjectModel | null>()
    const navigate = useNavigate()

    useEffect(() => {
        // TODO: Add an error toast

        http_common.get(`projects/${id}`)
            .then(({data}) => setProject(new ProjectModel(data)))
            .catch(() => {
                navigate(-1)
            })
    }, [])

    return project ? (
        <div>
            <h1>Project {id}</h1>
            <p>Project details</p>
        </div>
    ) : (
        // TODO: Add a spinner
        <></>
    )
}
