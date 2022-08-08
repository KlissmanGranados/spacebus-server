import { Role } from "./enums/role.enum";

export interface IJwtPayload {
    id: number;
    username: string;
    email: string;
    role: Role;
    iat?: Date;
    hasRole?: (role: Role) => boolean;
}