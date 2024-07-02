import './css/App.css'
import {Route, Routes} from "react-router-dom";
import Layout from "./Layout.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="employees" element={<EmployeesPage/>}>
                    <Route path=":id" element={<EmployeePage/>}/>
                </Route>
                <Route path="leave-requests" element={<LeaveRequestsPage/>}>
                    <Route path=":id" element={<LeaveRequestPage/>}/>
                </Route>
                <Route path="approval-requests" element={<ApprovalRequestsPage/>}>
                    <Route path=":id" element={<ApprovalRequestPage/>}/>
                </Route>
                <Route path="projects" element={<ProjectsPage/>}>
                    <Route path=":id" element={<ProjectPage/>}/>
                </Route>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}
