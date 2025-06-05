import App from './app';
import IndexController from './controllers/index.controller';
import DataController from './controllers/data.controller';
import UserController from './controllers/user.controller';

import DataService from './modules/services/data.service';
import UserService from './modules/services/user.service';
import PasswordService from './modules/services/password.service';
import TokenService from './modules/services/token.service';

import Controller from './interfaces/controller.interface';

function createControllers(): Controller[] {
    const dataService = new DataService();
    const userService = new UserService();
    const passwordService = new PasswordService();
    const tokenService = new TokenService();

    return [
        new UserController(userService, passwordService, tokenService),
        new DataController(dataService),
        new IndexController()
    ];
}

const controllers = createControllers();
const app: App = new App(controllers);

app.listen();

const cleanupService = new TokenService();
setInterval(async () => {
    await cleanupService.removeExpiredTokens();
}, 60 * 60 * 1000);