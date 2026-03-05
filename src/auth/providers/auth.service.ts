import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UsersService } from "src/users/providers/users.service";
import { LoginUserDto } from "../dto/login-user.dto";
import { User } from "src/users/user.entity";
import { UserResponseDto } from "src/users/dto/user-response.dto";
import { plainToInstance } from "class-transformer";

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

	public async login(dto: LoginUserDto): Promise<UserResponseDto> {
		let user: User | null = await this.usersService.findUser({
			email: dto.email,
			username: dto.username,
		});

		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const isPasswordValid = dto.password === user.password;
		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials");
		}

		// const payload: JwtPayload = {
		//     sub: user.id,
		//     email: user.email,
		// };

		return plainToInstance(UserResponseDto, user, {
			excludeExtraneousValues: true,
		});
	}
}
