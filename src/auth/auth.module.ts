import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./providers/auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import type { StringValue } from "ms";

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		UsersModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get<string>("appConfig.jwt_secret"),
				signOptions: {
					expiresIn: (configService.get<string>("appConfig.jwt_expiry") ??
						"60m") as StringValue,
				},
			}),
		}),
	],
})
export class AuthModule {}
