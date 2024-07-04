export default class LoginModel {
    email: string
    password: string

    constructor({
        email,
        password,
    }: {
        email: string
        password: string
    }) {
        this.email = email
        this.password = password
    }
}
