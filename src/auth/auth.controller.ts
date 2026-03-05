import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { AuthService } from "./providers/auth.service";
import { LoginUserDto } from "./dto/login-user.dto";

@Controller("auth")
export class AuthController {
	constructor(
		/**
		 * Injecting authService instance
		 */
		private readonly authService: AuthService,
	) {}

	/**
	 * Register a new user
	 * @param dto - CreateUserDto
	 * @returns UserResponseDto
	 */
	@Post("register")
	public registerUser(@Body() dto: CreateUserDto) {
		return this.authService.register(dto);
	}

	/**
	 * Login an existing user
	 * @param dto - LoginUserDto
	 * @returns UserResponseDto
	 */
	@Post("login")
	public loginUser(@Body() dto: LoginUserDto) {
		return this.authService.login(dto);
	}
}
