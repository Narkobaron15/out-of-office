import {Footer} from 'flowbite-react'
import './layout.css'

export default function FooterComponent() {
    const currentYear = new Date().getFullYear()
    return (
        <Footer container>
            <div className='w-full text-center'>
                <div className='link-group'>
                    <Footer.Brand
                        href='/'
                        src='/favicon.svg'
                        alt='Out of office Logo'
                        name='Out of office'
                    />
                    <Footer.LinkGroup>
                        <Footer.Link href='#'>About</Footer.Link>
                        <Footer.Link href='#'>Privacy Policy</Footer.Link>
                        <Footer.Link href='#'>Licensing</Footer.Link>
                        <Footer.Link href='#'>Contact</Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <Footer.Divider />
                <Footer.Copyright href='/' by='Out of office™' year={currentYear} />
            </div>
        </Footer>
    )
}
