import { Roles } from "./enums/userRoles.enums";

export class User {
	id: number;
	username: string;
	email: string;
	password: string;
	role: Roles;
	isBlacklisted: boolean;
	// previousPassword : string[]
	deletedAt?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}
