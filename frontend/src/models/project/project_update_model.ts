import ProjectType from "./project_type.ts"

export default class ProjectUpdateModel {
    id: string
    name: string
    type: ProjectType
    start: Date
    end: Date
    comment: string
    status: boolean

    constructor(project: ProjectUpdateModel) {
        this.id = project.id
        this.name = project.name
        this.type = project.type
        this.start = project.start
        this.end = project.end
        this.comment = project.comment
        this.status = project.status
    }
}
