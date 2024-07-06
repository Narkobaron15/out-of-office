import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import {Link, useNavigate} from "react-router-dom"
import ProjectModel from "../../../models/project/project_model.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Button} from "flowbite-react"
import {toast} from "react-toastify";
import {toastOptions} from "../../common/toast_options.ts";

export default function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectModel[] | null>()
    const auth = localStorage.getItem('auth')
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth) {
            toast.error('Some error happened', toastOptions)
            navigate(-1)
        }

        http_common.get('projects')
            .then(({data}) => setProjects(data.data))
            .catch(() => {
                toast.error('Some error happened', toastOptions)
                navigate('/')
            })
    }, [])

    return projects ? (
        projects.length > 0 ? (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl mb-4">Project List</h1>
                <table className="table-auto w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Manager</th>
                        <th>Status</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.type}</td>
                            <td>{project.start.toDateString()}</td>
                            <td>{project.end.toDateString()}</td>
                            <td>{project.manager.fullName}</td>
                            <td>{project.status ? 'Active' : 'Inactive'}</td>
                            <td>{project.comment}</td>
                            <td>
                                <Link to={`/projects/${project.id}`}
                                      className="btn btn-primary">
                                    View
                                </Link>
                                <Link to={`/projects/${project.id}/edit`}
                                      className="btn btn-secondary ml-2">
                                    Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Link to="/projects/create" className="btn btn-success mt-4">Create New Project</Link>
            </div>
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
