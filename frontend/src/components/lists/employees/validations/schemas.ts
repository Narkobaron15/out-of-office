import * as Yup from 'yup'

const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    subdivision: Yup.string().required('Subdivision is required'),
    position: Yup.string().required('Position is required'),
    status: Yup.boolean().required('Status is required'),
    daysOff: Yup.number().min(0, 'Days Off cannot be negative').required('Days Off is required'),
})

export default validationSchema
