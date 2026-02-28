import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./providers/users.service";
import { GetUserByIdDto } from "./dto/get-user-by-id.dto";

@Controller("users")
export class UsersController {
	constructor(
		/**
		 * Injecting usersService instance
		 */
		private readonly usersService: UsersService,
	) {}

	@Post("create")
	public createUser(@Body() dto: CreateUserDto) {
		// This is a temp, after will create "/auth/register" will delete this route.
		return this.usersService.createUser(dto);
	}

	@Patch()
	public patchUser() {
		return this.usersService.updateUser();
	}

	@Delete("me")
	public softDeleteUser() {
		return this.usersService.softDeleteUser();
	}

	@Get(":id")
	public getUser(@Param() dto: GetUserByIdDto) {
		// Currently doing by id, later on will fetch by token.
		return this.usersService.getUserById(dto.id);
	}

	@Patch("me/password")
	public updatePassword() {
		return this.usersService.changeUserPassword();
	}
}
