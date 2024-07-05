import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import http_common from "../../../common/http_common.ts"
import DefaultSpinner from "../../common/DefaultSpinner.tsx"
import {initialValues, defaultPic} from "./validations/initial_values.ts";
import {ErrorMessage, Field, Form, Formik} from "formik";
import validationSchema from "./validations/schemas.ts";
import EmployeeUpdateModel from "../../../models/employee_update_model.ts";

export default function EmployeeEditPage() {
    const {id} = useParams()
    const [employee, setEmployee] = useState<EmployeeUpdateModel | null>()
    const [initialImg, setInitialImg] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        // TODO: Add an error toast

        http_common.get(`employees/${id}`)
            .then(({data}) => {
                setEmployee(new EmployeeUpdateModel(data))
                setInitialImg(data.pictureUrl)
            })
            .catch(() => {
                navigate(-1)
            })
    }, [])

    const onSubmit = (values: EmployeeUpdateModel) => {
        const formData = new FormData()
        formData.append('fullName', values.fullName)
        formData.append('email', values.email)
        formData.append('subdivision', values.subdivision)
        formData.append('position', values.position)
        formData.append('status', values.status.toString())
        formData.append('daysOff', values.daysOff.toString())
        if (values.avatar) {
            formData.append('avatar', values.avatar)
        }
        if (values.delete_avatar) {
            formData.append('delete_avatar', 'true')
        }

        http_common.put(`employees/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                navigate('/employees')
            })
            .catch(() => {
            })
    }

    return employee ? (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Update the employee {employee.fullName}</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({isSubmitting, values, setFieldValue}) => (
                    <Form className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label className="block text-gray-700">Full Name</label>
                            <Field name="fullName" className="form-input mt-1 block w-full"/>
                            <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <Field name="email" type="email" className="form-input mt-1 block w-full"/>
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Subdivision</label>
                            <Field name="subdivision" className="form-input mt-1 block w-full"/>
                            <ErrorMessage name="subdivision" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Position</label>
                            <Field name="position" className="form-input mt-1 block w-full"/>
                            <ErrorMessage name="position" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Status</label>
                            <Field name="status" as="select" className="form-select mt-1 block w-full">
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Days Off</label>
                            <Field name="daysOff" type="number" className="form-input mt-1 block w-full"/>
                            <ErrorMessage name="daysOff" component="div" className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image">Photo</label>
                            <div className="flex justify-between mt-2 p-0">
                                <img className="h-10 w-10 mr-3 object-fit rounded-full inline-block"
                                     alt="Current category"
                                     src={
                                         values.avatar instanceof File
                                             ? URL.createObjectURL(values.avatar)
                                             : (initialImg ?? defaultPic)
                                     }/>
                                <span className="sr-only">Choose a category photo</span>
                                <input className="file w-5/6" aria-describedby="file_input_help" id="image" name="image"
                                       type="file" onChange={e => {
                                    const files = e.target.files;
                                    if (!files || !(files instanceof FileList)) return;
                                    const file = files[0];
                                    setFieldValue("avatar", file);
                                }}/>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG,
                                JPG or GIF</p>
                            <ErrorMessage name="image" component="div" className="error-message"/>
                        </div>
                        <div className="flex justify-end mb-4">
                            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
                            <button type="submit" className="create-btn" disabled={isSubmitting}>Update</button>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded"
                                disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    ) : <DefaultSpinner/>
}
