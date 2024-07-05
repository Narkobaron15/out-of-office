import {Button} from "flowbite-react"
import './css/homepage.css'

export default function HomePage() {
    const auth = localStorage.getItem('auth')
    return (
        <div className="homepage-container">
            <h2>Welcome to Out of office!</h2>
            <p>
                This is a simple application to manage your projects and requests in a team.
            </p>
            <p>
                You can assign projects to your team members, create requests
                for your team members, and track the progress of the projects and requests.
            </p>
            <p>
                You can also view the progress of the projects and requests in a visual way
                by clicking the buttons below.
            </p>
            <div className="dashboard-pills">{
                /* TODO: Show dashboards by role */
                auth ? <>
                    <Button pill gradientDuoTone="purpleToBlue" href="/approval-requests">
                        Approval requests
                    </Button>
                    <Button pill gradientDuoTone="purpleToBlue" href="/leave-requests">
                        Leave requests
                    </Button>
                    <Button pill gradientDuoTone="purpleToBlue" href="/employees">
                        Employees
                    </Button>
                    <Button pill gradientDuoTone="purpleToBlue" href="/projects">
                        Projects
                    </Button>
                </> : <>
                    <Button pill gradientDuoTone="purpleToBlue" href="/login">
                        Login
                    </Button>
                </>
            }</div>
        </div>
    )
}
