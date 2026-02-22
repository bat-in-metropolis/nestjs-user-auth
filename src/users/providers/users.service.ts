import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
	public createUser() {
		/**
		 * To register an user
		 * -> will call this when an unknown entity try to register itself
		 * -> An already logged-in user cannot create an user.
		 * -> POST /auth/register
		 */
	}

	public getUserById() {
		/**
		 * To get details of an user
		 * -> Admin authority.
		 * -> GET /admin/users/:id
		 * -> GET /users/me
		 */
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

	public findUserByEmail() {
		/**
		 * not linked to any route, will use internally.
		 */
	} // internal use
}
