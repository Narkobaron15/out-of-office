import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import {Link, useNavigate} from "react-router-dom"
import ProjectModel from "../../../models/project/project_model.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {Badge, Button, Table} from "flowbite-react"
import {toast} from "react-toastify"
import {toastOptions} from "../../common/toast_options.ts"
import {FaEdit, FaTrash} from "react-icons/fa";
import AuthHandler from "../../common/auth_handler.ts";

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
            .then(({data}) => {
                setProjects(data.data)
            })
            .catch(({response}) => AuthHandler(response, navigate))
    }, [])

    const handleDelete = (id: string) => {
        http_common.delete(`projects/${id}`)
            .then(() => {
                toast.success('Project deleted successfully', toastOptions)
                setProjects(projects?.filter((project) => project.id !== id))
            })
            .catch(({response}) => AuthHandler(response, navigate))
    }

    return projects ? (
        projects.length > 0 ? (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl mb-4">Project List</h1>
                <Table className="table-auto w-full text-center">
                    <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Type</Table.HeadCell>
                        <Table.HeadCell>Start Date</Table.HeadCell>
                        <Table.HeadCell>End Date</Table.HeadCell>
                        <Table.HeadCell>Manager</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Comments</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {projects.map((project) => (
                            <Table.Row key={project.id}>
                                <Table.Cell>
                                    <Link className="text-blue-500" to={`/projects/${project.id}`}>
                                        {project.name}
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>{project.type[0] + project.type.substring(1).toLowerCase()}</Table.Cell>
                                <Table.Cell>{new Date(project.start).toDateString()}</Table.Cell>
                                <Table.Cell>{new Date(project.end).toDateString()}</Table.Cell>
                                <Table.Cell>{project.manager?.fullName}</Table.Cell>
                                <Table.Cell>
                                    <Badge className="ml-3 mt-1" color={project.status ? "green" : "red"}>
                                        {project.status ? "Active" : "Inactive"}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>{project.comment}</Table.Cell>
                                <Table.Cell className="flex justify-center">
                                    <Button pill href={`/projects/${project.id}/edit`}
                                            gradientDuoTone="tealToLime"
                                            className="btn btn-secondary ml-2">
                                        <FaEdit/>
                                    </Button>
                                    <Button pill className="ml-2"
                                            gradientDuoTone="pinkToOrange"
                                            onClick={() => handleDelete(project.id)}>
                                        <FaTrash/>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <div className="flex justify-center">
                    <Button href="/projects/create" pill className="mt-5">
                        Create New Project
                    </Button>
                </div>
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
