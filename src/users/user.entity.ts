import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Roles } from "./enums/userRoles.enums";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "varchar",
		length: 96,
		nullable: false,
		unique: true,
	})
	username: string;

	@Column({
		type: "varchar",
		length: 96,
		nullable: false,
		unique: true,
	})
	email: string;

	@Column({
		type: "text",
		nullable: false,
	})
	password: string;

	@Column({
		type: "enum",
		enum: Roles,
		default: Roles.USER,
		nullable: false,
		/*
		 * default:
		 *   Used when no value is provided during insert.
		 *   If role is not explicitly set, it will default to Roles.USER.
		 *
		 * nullable: false:
		 *   Prevents explicitly inserting NULL into the column.
		 *   Ensures every user always has a role.
		 *
		 * Important:
		 *   default does NOT prevent NULL unless nullable is false.
		 */
	})
	role: Roles;

	@Column({
		type: "boolean",
		default: false,
		nullable: false,
		/*
		 * default:
		 *   If value is not provided, it defaults to false.
		 *
		 * nullable: false:
		 *   Prevents storing NULL.
		 *   Avoids three-state logic (true, false, null).
		 */
	})
	isBlacklisted: boolean;

	// previousPassword : string[]

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn()
	deletedAt?: Date;
}
