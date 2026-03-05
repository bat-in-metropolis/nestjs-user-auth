import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/providers/users.service";

@Injectable()
export class AuthService {
	constructor(
		/**
		 * Injecting usersService instance
		 */
		private readonly usersService: UsersService,
	) {}

	public async register(dto: CreateUserDto) {
		return this.usersService.createUser(dto);
	}
}
