import {toast} from "react-toastify";
import {toastOptions} from "./toast_options.ts";

export default function AuthHandler(response: any, navigate: any) {
    if (response.status === 401) {
        toast.error('You are not authorized to view this page', toastOptions)
        localStorage.removeItem('auth')
        navigate('/login')
        return
    }

    if (response.status === 403) {
        toast.error('You are not authorized to view this page', toastOptions)
    } else {
        toast.error('Some error happened', toastOptions)
    }
    navigate('/')
}
