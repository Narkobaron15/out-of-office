import './css/app.css'
import {Route, Routes} from 'react-router-dom'
import Layout from './layout/Layout.tsx'
import HomePage from './HomePage.tsx'
import NotFoundPage from './NotFoundPage.tsx'
import LoginPage from "../auth/LoginPage.tsx"
import AboutPage from "../info/AboutPage.tsx"
import ContactPage from "../info/ContactPage.tsx";
import AccountPage from "../auth/AccountPage.tsx";

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='about' element={<AboutPage/>}/>
                <Route path='contact' element={<ContactPage/>}/>
                <Route path='account' element={<AccountPage/>}/>
                {/*<Route path='employees' element={<EmployeesPage/>}>
                        <Route path=':id'>
                            <Route index element={<EmployeePage/>}/>
                            <Route path='create' element={<EmployeeCreatePage/>}/>
                            <Route path='edit' element={<EmployeeEditPage/>}/>
                        </Route>
                    </Route>
                    <Route path='leave-requests' element={<LeaveRequestsPage/>}>
                        <Route path=':id'>
                            <Route index element={<LeaveRequestPage/>}/>
                            <Route path='create' element={<LeaveRequestCreatePage/>}/>
                            <Route path='edit' element={<LeaveRequestEditPage/>}/>
                        </Route>
                    </Route>
                    <Route path='approval-requests' element={<ApprovalRequestsPage/>}>
                        <Route path=':id'>
                            <Route index element={<ApprovalRequestPage/>}/>
                            <Route path='create' element={<ApprovalRequestCreatePage/>}/>
                            <Route path='edit' element={<ApprovalRequestEditPage/>}/>
                        </Route>
                    </Route>
                    <Route path='projects' element={<ProjectsPage/>}>
                        <Route path=':id'>
                            <Route index element={<ProjectPage/>}/>
                            <Route path='create' element={<ProjectCreatePage/>}/>
                            <Route path='edit' element={<ProjectEditPage/>}/>
                        </Route>
                </Route>*/}
            </Route>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    )
}
