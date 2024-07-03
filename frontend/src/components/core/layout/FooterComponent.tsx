import {Footer} from 'flowbite-react'
import {Link} from "react-router-dom";
import './layout.css'

export default function FooterComponent() {
    const currentYear = new Date().getFullYear()

    // @ts-ignore
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
                        <Footer.Link as={Link} href='' to='/about'>
                            About
                        </Footer.Link>
                        <Footer.Link as={Link} href='' to='/privacy-policy'>
                            Privacy Policy
                        </Footer.Link>
                        <Footer.Link as={Link} href='' to='/licensing'>
                            Licensing
                        </Footer.Link>
                        <Footer.Link as={Link} href='' to='/contact'>
                            Contact us
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <Footer.Divider/>
                <Footer.Copyright href='/' by='Out of office™' year={currentYear}/>
            </div>
        </Footer>
    )
}
