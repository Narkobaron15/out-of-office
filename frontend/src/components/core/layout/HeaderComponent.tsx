import {Navbar} from 'flowbite-react'
import {Link, useLocation} from 'react-router-dom'
import './layout.css'

export default function HeaderComponent() {
    const path = useLocation().pathname;
    console.log(path);

    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} to='/'>
                <img src='/favicon.svg' alt='Out of office Logo' />
                <h1>Out of office</h1>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link as={Link} to='/' active={path === '/'}>
                    Home
                </Navbar.Link>
                <Navbar.Link as={Link} to='/about' active={path === '/about'}>
                    About
                </Navbar.Link>
                {/* TODO: swap out to the account link if a user is logged in */}
                <Navbar.Link as={Link} to='/login' active={path === '/login'}>
                    Login
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
