import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	RequestTimeoutException,
} from "@nestjs/common";
import { CreateUserByAdminDto } from "../dto/create-user-by-admin.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Roles } from "../enums/userRoles.enums";
import { User } from "../user.entity";

@Injectable()
export class UsersService {
	constructor(
		/**
		 * User repository used for database operations
		 */
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}
	public async createUser(dto: CreateUserDto): Promise<User> {
		/**
		 * To register an user
		 * -> will call this when an unknown entity try to register itself
		 * -> An already logged-in user cannot create an user.
		 * -> POST /auth/register
		 */
		const user = this.userRepository.create({
			...dto,
			role: Roles.USER,
		});

		//   user.password = await bcrypt.hash(user.password, 10);

		try {
			return await this.userRepository.save(user);
		} catch (error: any) {
			if (error.code === "23505") {
				throw new BadRequestException(
					"User already exists with this email or username",
				);
			}

			throw new InternalServerErrorException("Unable to process request");
		}
	}

	public async createUserByAdmin(dto: CreateUserByAdminDto): Promise<User> {
		const user = this.userRepository.create(dto);

		try {
			return await this.userRepository.save(user);
		} catch (error: any) {
			if (error.code === "23505") {
				throw new BadRequestException("User already exists");
			}

			throw new RequestTimeoutException("Unable to process request");
		}
	}

	public async getUserById(id: number): Promise<User | null> {
		/**
		 * To get details of an user
		 * -> Admin authority.
		 * -> GET /admin/users/:id
		 * -> GET /users/me
		 */
		const user = await this.userRepository.findOneBy({ id: id });

		if (!user)
			throw new NotFoundException(`User with User Id: ${id} does not exists`);

		return user;
	}

	public getAllUsers() {
		/**
		 * To get details of multiple users.
		 * -> GET /admin/users
		 */
	}

	public updateUser() {
		/**
		 * To update details regarding an user.
		 * If admin wants to make some change in single user, can use it for blacklisting, password update, role update, etc...
		 * -> PATCH /users/me
		 * -> PATCH /admin/users/:id
		 */
	}

	public changeUserPassword() {
		/**
		 * Update password by an logged-in user.
		 * -> later scope -> if user is unknown entity and is able to prove that they have lost password but own the account, will allow change password that time too.
		 * -> PATCH /users/me/password
		 */
	}

	public softDeleteUser() {
		/**
		 * To soft delete an user.
		 * -> if user asks to delete their id. Will soft delete.
		 * -> later scope -> after a period of time will permanent delete that user's details.
		 * -> DELETE /users/me
		 * -> DELETE /admin/users/:id
		 */
	}

	public hardDeleteUser() {
		/**
		 * To delete an user
		 * -> Only allowed by Admin
		 * -> DELETE /admin/users/:id/permanent
		 */
	}

	public bulkCreateUsers() {
		/**
		 * Create multiple user in one go by admin.
		 * -> POST /admin/users/bulk-create
		 */
	}

	public bulkSoftDeleteUsers() {
		/**
		 * -> PATCH /admin/users/bulk-soft-delete
		 */
	}

	public bulkBlacklistUsers() {
		/**
		 * -> PATCH /admin/users/bulk-blacklist
		 */
	}

	public async findUserByEmail(email: string): Promise<User | null> {
		/**
		 * not linked to any route, will use internally.
		 */
		const user = await this.userRepository.findOneBy({
			email: email,
		});

		return user;
	} // internal use

	public async findUserByUserName(username: string): Promise<User | null> {
		/**
		 * not linked to any route, will use internally.
		 */
		const user = await this.userRepository.findOneBy({
			username: username,
		});

		return user;
	} // internal use
}
