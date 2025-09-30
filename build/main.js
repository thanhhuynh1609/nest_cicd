"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app_module_1 = require("./app.module");
const admin_seeder_service_1 = require("./shared/admin-seeder.service");
if (process.env.NODE_ENV === 'test') {
    process.env.MONGO_URI = process.env.MONGO_URI_TEST;
    console.log('----------TESTING IN PROCESS----------');
    console.log('using database', process.env.MONGO_URI);
}
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.get('/', (req, res) => res.send('ok'));
server.get('/_ah/health', (req, res) => res.send('ok'));
server.get('/_ah/start', (req, res) => res.send('ok'));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(server));
    app.setGlobalPrefix('api');
    const adminSeeder = app.get(admin_seeder_service_1.AdminSeederService);
    await adminSeeder.seedAdmin();
    await app.listen(process.env.PORT);
    console.log(`Application is running on: http://localhost:${process.env.PORT}`);
    console.log('Default admin user: admin / 123');
}
bootstrap();
//# sourceMappingURL=main.js.map