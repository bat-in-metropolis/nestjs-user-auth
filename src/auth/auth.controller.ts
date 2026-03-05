import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./providers/auth.service";

@Controller("auth")
export class AuthController {
	constructor(
		/**
		 * Injecting authService instance
		 */
		private readonly authService: AuthService,
	) {}
	@Post("register")
	public registerUser(@Body() dto: CreateUserDto) {
		return this.authService.register(dto);
	}
}
