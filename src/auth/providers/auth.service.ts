import bcrypt from "bcryptjs";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import {
	Injectable,
	InternalServerErrorException,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "../dto/login-user.dto";
import { plainToInstance } from "class-transformer";
import { User } from "src/users/user.entity";
import { UserResponseDto } from "src/users/dto/user-response.dto";
import { UsersService } from "src/users/providers/users.service";

@Injectable()
export class AuthService {
	constructor(
		/**
		 * Injecting usersService instance
		 */
		private readonly usersService: UsersService,

		/**
		 * Injecting jwtService instance
		 */
		private readonly jwtService: JwtService,
	) {}

	public async register(dto: CreateUserDto) {
		return this.usersService.createUser(dto);
	}

	public async login(
		dto: LoginUserDto,
	): Promise<{ access_token: string; user: UserResponseDto }> {
		let user: User | null;

		try {
			user = await this.usersService.findUser({
				email: dto.email,
				username: dto.username,
			});
		} catch (_) {
			// DB failed, network issue, TypeORM error etc.
			throw new InternalServerErrorException("Unable to process request");
		}

		// Business logic — no try/catch needed, these are intentional throws
		if (!user) {
			throw new UnauthorizedException("Invalid credentials");
		}

		// ✅ plaintext first, hash second
		const isPasswordValid: boolean = await bcrypt.compare(
			dto.password,
			user.password,
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException("Invalid credentials");
		}

		const payload = {
			sub: user.id,
			email: user.email,
		};

		return {
			access_token: this.jwtService.sign(payload),
			user: plainToInstance(UserResponseDto, user, {
				excludeExtraneousValues: true,
			}),
		};
	}
}
