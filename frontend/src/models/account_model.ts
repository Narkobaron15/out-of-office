export class AccountModel {
    id: string
    email: string
    fullName: string
    position: string
    subdivision: string
    status: boolean
    daysOff: number
    pictureUrl: string | null
    partnerId: string | null
    createdAt: string
    updatedAt: string | null

    constructor({
                    id,
                    email,
                    fullName,
                    position,
                    subdivision,
                    status,
                    daysOff,
                    pictureUrl,
                    partnerId,
                    createdAt,
                    updatedAt,
                }: AccountModel) {
        this.id = id
        this.email = email
        this.fullName = fullName
        this.position = position
        this.subdivision = subdivision
        this.status = status
        this.daysOff = daysOff
        this.pictureUrl = pictureUrl
        this.partnerId = partnerId
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}
