import {Outlet} from "react-router-dom";

export default function Layout() {
    return (
        <>
            <HeaderComponent/>
            <main>
                <Outlet/>
            </main>
            <FooterComponent/>
        </>
    )
}
