import * as Yup from 'yup'

const validationSchema = Yup.object({
    employeeId: Yup.string().required('Employee is required'),
    absenceReason: Yup.string().required('Absence reason is required'),
    start: Yup.date().required('Start date is required'),
    end: Yup.date().required('End date is required'),
    shortName: Yup.string().required('Short name is required'),
    comment: Yup.string(),
    status: Yup.string().required('Status is required'),
})

export default validationSchema
