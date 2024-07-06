import * as Yup from 'yup';

const projectSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    start: Yup.date().required('Required'),
    end: Yup.date().required('Required'),
    comment: Yup.string(),
    status: Yup.boolean().required('Required'),
})

export default projectSchema;
