import { Expose } from "class-transformer";
import type { Roles } from "../enums/userRoles.enums";

export class UserResponseDto {
	@Expose()
	id: number;

	@Expose()
	firstName: string;

	@Expose()
	lastName?: string;

	@Expose()
	username: string;

	@Expose()
	email: string;

	@Expose()
	role: Roles;

	@Expose()
	createdAt: Date;

	@Expose()
	updatedAt: Date;

	// Everything not exposed will automatically be excluded
}
