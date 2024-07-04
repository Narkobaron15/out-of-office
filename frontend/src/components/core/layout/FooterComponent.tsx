import {Footer} from 'flowbite-react'
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
                        <Footer.Link href='/about'>
                            About
                        </Footer.Link>
                        <Footer.Link href='/contact'>
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
