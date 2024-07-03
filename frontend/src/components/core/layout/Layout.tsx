import {Outlet} from 'react-router-dom'
import HeaderComponent from './HeaderComponent.tsx'
import FooterComponent from './FooterComponent.tsx'

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderComponent/>
            <main className="flex-grow">
                <Outlet/>
            </main>
            <FooterComponent/>
        </div>
    )
}
