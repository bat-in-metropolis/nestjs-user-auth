import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	/**
	 * Global validation pipe
	 * - whitelist: strips unknown properties
	 * - forbidNonWhitelisted: throws error if extra fields are sent
	 * - transform: auto-transform payloads to DTO types
	 */
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

	const configService = app.get(ConfigService);
	const PORT = configService.get<number>("appConfig.port") ?? 3000;

	const appUrl =
		configService.get<string>("APP_URL") ?? `http://localhost:${PORT}`;

	if (!process.env.PORT) {
		console.warn("⚠️ PORT not set, defaulting to 3000");
	}

	await app.listen(PORT);
	console.log(`🚀 Server running at ${appUrl}`);
}
bootstrap();
