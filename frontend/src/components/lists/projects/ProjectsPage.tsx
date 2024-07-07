import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import {Link, useNavigate} from "react-router-dom"
import ProjectModel from "../../../models/project/project_model.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Button, Table} from "flowbite-react"
import {toast} from "react-toastify"
import {toastOptions} from "../../common/toast_options.ts"
import {FaEdit, FaTrash} from "react-icons/fa";

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
            .catch(({response}) => {
                if (response.status === 401) {
                    toast.error('You are not authorized to view this page', toastOptions)
                    localStorage.removeItem('auth')
                    navigate('/login')
                }

                toast.error('Some error happened', toastOptions)
                navigate('/')
            })
    }, [])

    const handleDelete = (id: string) => {
        http_common.delete(`projects/${id}`)
            .then(() => {
                toast.success('Project deleted successfully', toastOptions)
                setProjects(projects?.filter((project) => project.id !== id))
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    toast.error('You are not authorized to view this page', toastOptions)
                    localStorage.removeItem('auth')
                    navigate('/login')
                }

                toast.error('Some error happened', toastOptions)
                window.location.reload()
            })
    }

    return projects ? (
        projects.length > 0 ? (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl mb-4">Project List</h1>
                <Table className="table-auto w-full">
                    <Table.Head>
                    <Table.Row>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Start Date</Table.HeadCell>
                        <Table.HeadCell>End Date</Table.HeadCell>
                        <Table.HeadCell>Manager</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Comments</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Row>
                    </Table.Head>
                    <Table.Body>
                    {projects.map((project) => (
                        <Table.Row key={project.id}>
                            <Table.Cell>
                                <Link className="text-blue-500" to={`/projects/${project.id}`}>
                                    {project.name}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>{project.type}</Table.Cell>
                            <Table.Cell>{project.start.toDateString()}</Table.Cell>
                            <Table.Cell>{project.end.toDateString()}</Table.Cell>
                            <Table.Cell>{project.manager.fullName}</Table.Cell>
                            <Table.Cell>{project.status ? 'Active' : 'Inactive'}</Table.Cell>
                            <Table.Cell>{project.comment}</Table.Cell>
                            <Table.Cell>
                                <Link to={`/projects/${project.id}/edit`}
                                      className="btn btn-secondary ml-2">
                                    <FaEdit/>
                                </Link>
                                <Button pill gradientDuoTone="redToOrange"
                                        onClick={() => handleDelete(project.id)}>
                                    <FaTrash/>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table>
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
