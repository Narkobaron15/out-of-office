import {Link} from "react-router-dom"
import './css/not_found.css'

export default function NotFoundPage() {
    return (
        <div className="not-found-container">
            <div className="text-center">
                <h1>404</h1>
                <p className="text-xl text-gray-700 mt-4">Page not found</p>
                <p className="mt-2 text-gray-600">
                    Sorry, we couldn't find the page you’re looking for.
                </p>
                <div className="mt-6">
                    <Link to="/">
                        Go back home
                    </Link>
                </div>
            </div>
        </div>
    )
}
