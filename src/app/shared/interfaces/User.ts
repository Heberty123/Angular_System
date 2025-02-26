import { Role } from "./role"

export interface User {
    id: number
    username: string
    token: string
    role: Role
}