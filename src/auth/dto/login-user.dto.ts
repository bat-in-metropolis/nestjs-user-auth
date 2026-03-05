import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength,
	registerDecorator,
	ValidationOptions,
	ValidationArguments,
	ValidateIf,
} from "class-validator";

// Custom class-level decorator
function HasUsernameOrEmail(validationOptions?: ValidationOptions) {
	return function (constructor: Function) {
		registerDecorator({
			name: "hasUsernameOrEmail",
			target: constructor,
			propertyName: "",
			options: validationOptions,
			validator: {
				validate(_: any, args: ValidationArguments) {
					const obj = args.object as any;
					return Boolean(obj.username || obj.email); // at least one must exist
				},
				defaultMessage() {
					return "Username or email is required";
				},
			},
		});
	};
}

@HasUsernameOrEmail()
export class LoginUserDto {
	/**
	 * @ValidateIf(o => !o.email)
	 * @IsNotEmpty()
	 */
	@IsOptional()
	@IsString()
	@MinLength(3)
	@MaxLength(96)
	username?: string;

	/**
	 * @ValidateIf(o => !o.username)
	 * @IsNotEmpty()
	 */
	@IsOptional()
	@IsEmail()
	@MaxLength(96)
	email?: string;

	@IsNotEmpty()
	@IsString()
	@MinLength(8)
	@MaxLength(64)
	password: string;
}
