import {Button, Card} from "flowbite-react"
import './css/about_pages.css'

export default function AboutPage() {
    return (
        <div className="about-container">
            <Card className="max-w-4xl">
                <h2>About the Out of Office Solution</h2>
                <p className="mb-4">
                    The "Out of Office" solution is designed to streamline the management of employee absences,
                    projects, and approval processes within an organization. This application provides a comprehensive
                    system for HR managers, project managers, and employees to efficiently manage and track leave
                    requests and project assignments.
                </p>

                <h3>Key Features</h3>
                <ul>
                    <li>Employee Directory: Manage employee information, including sorting, filtering, and searching.
                    </li>
                    <li>Leave Requests: Submit, approve, reject, and track the status of leave requests.</li>
                    <li>Project Management: Assign employees to projects and manage project details.</li>
                    <li>Approval Workflow: Streamlined approval process for leave requests with comments for
                        rejections.
                    </li>
                </ul>

                <h3>User Roles</h3>
                <ul>
                    <li><strong>HR Manager:</strong> Manage employees, approve/reject leave requests.</li>
                    <li><strong>Project Manager:</strong> Manage projects, approve/reject leave requests.</li>
                    <li><strong>Employee:</strong> Submit and track their own leave requests.</li>
                </ul>

                <h3>Directory Structure</h3>
                <ul>
                    <li>Employees Directory: Comprehensive employee list with detailed information and filters.</li>
                    <li>Leave Requests Directory: Track and manage leave requests with statuses and filters.</li>
                    <li>Approval Requests Directory: Manage approval workflows for leave requests.</li>
                    <li>Projects Directory: Detailed project information and employee assignments.</li>
                </ul>

                <Button color="primary" href="/">
                    Go Back Home
                </Button>
            </Card>
        </div>
    )
}
