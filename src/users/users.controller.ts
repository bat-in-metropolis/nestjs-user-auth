import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { UsersService } from "./providers/users.service";

@Controller("users")
export class UsersController {
	constructor(
		/**
		 * Injecting usersService instance
		 */
		private readonly usersService: UsersService,
	) {}

	@Post("create")
	public createUser() {
		// This is a temp, after will create "/auth/register" will delete this route.
		return this.usersService.createUser();
	}

	@Patch()
	public patchUser() {
		return this.usersService.updateUser();
	}

	@Delete("me")
	public softDeleteUser() {
		return this.usersService.softDeleteUser();
	}

	@Get("/:id")
	public getUser() {
		// Currently doing by id, later on will fetch by token.
		return this.usersService.getUserById();
	}

	@Patch("me/password")
	public updatePassword() {
		return this.usersService.changeUserPassword();
	}
}
