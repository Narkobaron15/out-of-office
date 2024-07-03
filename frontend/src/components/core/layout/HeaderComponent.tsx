import {Navbar} from 'flowbite-react'
import {Link} from 'react-router-dom'
import './layout.css'

export default function HeaderComponent() {
    return (
        <Navbar fluid rounded>
            <Navbar.Brand as={Link} href='/'>
                <img src='/favicon.svg' alt='Out of office Logo' />
                <h1>Out of office</h1>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link href='#' active>
                    Home
                </Navbar.Link>
                <Navbar.Link as={Link} href='#'>
                    About
                </Navbar.Link>
                <Navbar.Link href='#'>Services</Navbar.Link>
                <Navbar.Link href='#'>Pricing</Navbar.Link>
                <Navbar.Link href='#'>Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
