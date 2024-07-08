import ProjectCreateModel from "../../../../models/project/project_create_model.ts"
import ProjectType from "../../../../models/project/project_type.ts"

const createInitialValues: ProjectCreateModel = {
    name: '',
    type: ProjectType.Other,
    start: new Date(),
    end: new Date(),
    comment: '',
    status: false,
}

export default createInitialValues
