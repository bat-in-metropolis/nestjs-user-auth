import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
	host: process.env.DB_HOST || "localhost",
	port: parseInt(process.env.DB_PORT ?? "5432", 10),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,
	synchronize: process.env.DB_SYNC === "true",
	autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === "true",
}));
