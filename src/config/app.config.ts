import { registerAs } from "@nestjs/config";

export default registerAs("appConfig", () => ({
	environment: process.env.NODE_ENV || "prod",
	port: parseInt(process.env.PORT ?? "3001", 10),
	jwt_secret: process.env.SECRET,
	jwt_expiry: process.env.JWT_EXPIRY,
}));
