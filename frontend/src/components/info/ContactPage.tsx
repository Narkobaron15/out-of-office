import {FaEnvelope, FaLinkedin, FaTwitter} from "react-icons/fa6"
import {Card} from "flowbite-react"
import {Link} from "react-router-dom"
import './css/about_pages.css'

export default function ContactPage() {
    return (
        <div className="contact-container">
            <Card className="max-w-4xl w-full p-6">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="mb-4">We'd love to hear from you! Reach out to our team through any of the following
                    contacts:</p>

                <section className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">HR Manager</h3>
                    <p className="mb-1">Name: Alice Johnson</p>
                    <div className="flex justify-center">
                        <p className="mb-1">
                            Email:&nbsp;
                            <Link to="mailto:alice.johnson@example.com" className="email">
                                alice.johnson@example.com
                            </Link>
                        </p>
                        <div className="flex space-x-3">
                            <Link to="#" target="_blank" rel="noopener noreferrer"
                                  className="text-blue-700">
                                <FaLinkedin size={24}/>
                            </Link>
                            <Link to="#" target="_blank" rel="noopener noreferrer"
                                  className="text-blue-500">
                                <FaTwitter size={24}/>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Project Manager</h3>
                    <p className="mb-1">Name: Bob Smith</p>
                    <div className="flex justify-center">
                        <p className="mb-1">
                            Email:
                            <Link to="mailto:bob.smith@example.com" className="email">
                                bob.smith@example.com
                            </Link>
                        </p>
                        <div className="flex space-x-3">
                            <Link to="#" target="_blank" rel="noopener noreferrer"
                                  className="text-blue-700">
                                <FaLinkedin size={24}/>
                            </Link>
                            <Link to="#" target="_blank" rel="noopener noreferrer"
                                  className="text-blue-500">
                                <FaTwitter size={24}/>
                            </Link>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold mb-2">General Inquiries</h3>
                    <div className="flex justify-center">
                        <p className="mb-1">
                            Email:
                            <Link to="mailto:info@example.com" className="email">
                                info@example.com
                            </Link>
                        </p>
                        <div className="flex space-x-3">
                            <Link to="#" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                <FaTwitter size={24}/>
                            </Link>
                            <Link to="mailto:info@example.com" className="text-red-600">
                                <FaEnvelope size={24}/>
                            </Link>
                        </div>
                    </div>
                </section>
            </Card>
        </div>
    )
}
