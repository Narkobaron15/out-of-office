import ProjectType from "./project_type.ts"

export default class ProjectCreateModel {
    id: string
    name: string
    type: ProjectType
    start: Date
    end: Date
    managerId: string
    comment: string
    status: boolean

    constructor(project: ProjectCreateModel) {
        this.id = project.id
        this.name = project.name
        this.type = project.type
        this.start = project.start
        this.end = project.end
        this.managerId = project.managerId
        this.comment = project.comment
        this.status = project.status
    }
}
