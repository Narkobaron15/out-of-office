import {Link, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import ProjectModel from "../../../models/project/project_model.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {toast} from "react-toastify"
import {toastOptions} from "../../common/toast_options.ts"
import {Badge} from "flowbite-react";

export default function ProjectPage() {
    const {id} = useParams()
    const [project, setProject] = useState<ProjectModel | null>()
    const navigate = useNavigate()

    useEffect(() => {
        http_common.get(`projects/${id}`)
            .then(({data}) => setProject(new ProjectModel(data)))
            .catch(() => {
                toast.error('Some error happened', toastOptions)
                navigate(-1)
            })
    }, [])

    return project ? (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl mb-4">Project Details</h1>
            <p><strong>Name:</strong> {project.name}</p>
            <p><strong>Type:</strong> {project.type}</p>
            <p><strong>Start Date:</strong> {new Date(project.start).toDateString()}</p>
            <p><strong>End Date:</strong> {new Date(project.end).toDateString()}</p>
            <p><strong>Manager:</strong> {project.manager.fullName}</p>
            <p><strong>Comment:</strong> {project.comment}</p>
            <p className='flex justify-center'>
                <strong>Status:</strong>&nbsp;
                <Badge className="ml-1 mt-1" color={project.status ? "green" : "red"}>
                    {project.status ? "Active" : "Inactive"}
                </Badge>
            </p>
            <Link to={`/projects/${project.id}/edit`} className="btn btn-secondary mt-4">Edit</Link>
        </div>
    ) : <DefaultSpinner/>
}
