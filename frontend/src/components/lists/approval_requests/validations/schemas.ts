import * as Yup from 'yup';

const validationSchema = Yup.object({
    leaveRequestId: Yup.string().required('Leave Request ID is required'),
    approverId: Yup.string().required('Approver ID is required'),
    shortName: Yup.string().required('Short Name is required'),
    comment: Yup.string().required('Comment is required')
});

export default validationSchema;
