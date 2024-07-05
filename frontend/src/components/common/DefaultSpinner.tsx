import {Spinner} from "flowbite-react"

export default function DefaultSpinner() {
    return (
        <div className="flex min-h-svh flex-col justify-center align-middle">
            <Spinner color="info" size="lg"/>
        </div>
    )
}
