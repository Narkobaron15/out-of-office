import './css/app.css'
import {Route, Routes} from 'react-router-dom'
import Layout from './layout/Layout.tsx'
import HomePage from './HomePage.tsx'
import NotFoundPage from './NotFoundPage.tsx'
import LoginPage from "../auth/LoginPage.tsx"
import AboutPage from "../info/AboutPage.tsx"
import ContactPage from "../info/ContactPage.tsx"
import AccountPage from "../auth/AccountPage.tsx"
import EmployeesPage from "../lists/employees/EmployeesPage.tsx"
import EmployeePage from "../lists/employees/EmployeePage.tsx"
import EmployeeCreatePage from "../lists/employees/EmployeeCreatePage.tsx"
import EmployeeEditPage from "../lists/employees/EmployeeEditPage.tsx"
import ApprovalRequestsPage from "../lists/approval_requests/ApprovalRequestsPage.tsx"
import ApprovalRequestPage from "../lists/approval_requests/ApprovalRequestPage.tsx"
import ApprovalRequestCreatePage from "../lists/approval_requests/ApprovalRequestCreatePage.tsx"
import ApprovalRequestEditPage from "../lists/approval_requests/ApprovalRequestEditPage.tsx"
import LeaveRequestsPage from "../lists/leave_requests/LeaveRequestsPage.tsx";
import LeaveRequestPage from "../lists/leave_requests/LeaveRequestPage.tsx";
import LeaveRequestCreatePage from "../lists/leave_requests/LeaveRequestCreatePage.tsx";
import LeaveRequestEditPage from "../lists/leave_requests/LeaveRequestEditPage.tsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                // Informational
                <Route index element={<HomePage/>}/>
                <Route path="about" element={<AboutPage/>}/>
                <Route path="contact" element={<ContactPage/>}/>

                // Current user
                <Route path="login" element={<LoginPage/>}/>
                <Route path="account" element={<AccountPage/>}/>

                // Lists
                <Route path="approval-requests">
                    <Route index element={<ApprovalRequestsPage/>}/>
                    <Route path=":id">
                        <Route index element={<ApprovalRequestPage/>}/>
                        <Route path="create" element={<ApprovalRequestCreatePage/>}/>
                        <Route path="edit" element={<ApprovalRequestEditPage/>}/>
                    </Route>
                </Route>
                <Route path="employees">
                    <Route index element={<EmployeesPage/>}/>
                    <Route path=":id">
                        <Route index element={<EmployeePage/>}/>
                        <Route path="create" element={<EmployeeCreatePage/>}/>
                        <Route path="edit" element={<EmployeeEditPage/>}/>
                    </Route>
                </Route>
                <Route path="leave-requests">
                    <Route index element={<LeaveRequestsPage/>}/>
                    <Route path=":id">
                        <Route index element={<LeaveRequestPage/>}/>
                        <Route path="create" element={<LeaveRequestCreatePage/>}/>
                        <Route path="edit" element={<LeaveRequestEditPage/>}/>
                    </Route>
                </Route>
                <Route path="projects">
                    <Route index element={<ProjectsPage/>}/>
                    <Route path=":id">
                        <Route index element={<ProjectPage/>}/>
                        <Route path="create" element={<ProjectCreatePage/>}/>
                        <Route path="edit" element={<ProjectEditPage/>}/>
                    </Route>
                </Route>*
            </Route>

            // Generic not found page
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    )
}
