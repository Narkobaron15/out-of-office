import {Navbar} from 'flowbite-react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import './layout.css'
import http_common from "../../../common/http_common.ts"
import {toast} from "react-toastify";
import {toastOptions} from "../../common/toast_options.ts";

export default function HeaderComponent() {
    const path = useLocation().pathname
    const auth = localStorage.getItem('auth')
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await http_common.post('auth/logout')
            navigate('/login')
        } catch (error) {
            console.error(error)
            toast.error('Some error happened', toastOptions)
        }
        finally {
            localStorage.removeItem('auth')
            http_common.defaults.headers.common.Authorization = ''
        }
    }

    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} to="/">
                <img src="/favicon.svg" alt="Out of office Logo"/>
                <h1>Out of office</h1>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Navbar.Link as={Link} to="/" active={path === '/'}>
                    Home
                </Navbar.Link>
                <Navbar.Link as={Link} to="/about" active={path === '/about'}>
                    About
                </Navbar.Link>
                {auth ? <>
                    <Navbar.Link as={Link} to="/account" active={path === '/account'}>
                        Account
                    </Navbar.Link>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </> : <>
                    <Navbar.Link as={Link} to="/login" active={path === '/login'}>
                        Login
                    </Navbar.Link>
                </>}
            </Navbar.Collapse>
        </Navbar>
    )
}
