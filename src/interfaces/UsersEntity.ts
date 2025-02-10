import { TModel } from "@/types/TModel";

enum UserRole {
    Admin = "Admin",
    Manager = "Manager",
    Reservation = "Reservation",
}


export interface UsersEntity extends TModel {
    name: string;
    property: string[];
    action: string;
    role: UserRole;  // Cargo ou função como enum
    lastAccess: Date; // Último acesso
}
