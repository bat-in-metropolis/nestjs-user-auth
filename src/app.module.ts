import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from './auth/auth.module';
import databaseConfig from "./config/database.config";
import environmentValidation from "./config/environment.validation";
import appConfig from "./config/app.config";

const ENV = process.env.NODE_ENV;
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: !ENV ? ".env" : `.env.${ENV}`,
			load: [databaseConfig, appConfig],
			validationSchema: environmentValidation,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				autoLoadEntities: configService.get("database.autoLoadEntities"),
				synchronize: configService.get("database.synchronize"),
				host: configService.get("database.host"),
				port: configService.get("database.port"),
				username: configService.get("database.username"),
				password: configService.get("database.password"),
				database: configService.get("database.dbName"),
			}),
		}),
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
