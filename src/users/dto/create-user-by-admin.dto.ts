import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { Roles } from "../enums/userRoles.enums";

export class CreateUserByAdminDto extends CreateUserDto {
	@IsNotEmpty()
	@IsEnum(Roles)
	role: Roles; // I don't want roles every time from dev, i want this only in case of Admin.

	@IsOptional()
	@IsBoolean()
	isBlacklisted: boolean; // Same, want this only in case of user is blacklisted
}
