import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import {useNavigate} from "react-router-dom"
import ProjectModel from "../../../models/project_model.ts"

export default function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectModel[] | null>()
    const auth = localStorage.getItem('auth')
    const navigate = useNavigate()

    useEffect(() => {
        // TODO: Add an error toast
        if (!auth) {
            navigate(-1)
        }

        http_common.get('projects')
            .then(({data}) => setProjects(data.data))
            .catch(() => {
                navigate('/')
            })
    }, [])

    return projects ? (
        <div>
            <h1>Projects</h1>
            <p>Projects list</p>
        </div>
    ) : (
        // TODO: Spinner
        <></>
    )
}
