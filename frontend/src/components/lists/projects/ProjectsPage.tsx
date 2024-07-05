import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import {useNavigate} from "react-router-dom"
import ProjectModel from "../../../models/project/project_model.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Button} from "flowbite-react"

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
        projects.length > 0 ? (
            <></>
        ) : (
            <div className="m-8">
                <h2 className="font-bold text-4xl mb-5" role="alert">
                    No projects found
                </h2>
                <Button href="/projects/create" className="btn btn-primary inline-flex">
                    Add a new project
                </Button>
            </div>
        )
    ) : <DefaultSpinner/>
}
