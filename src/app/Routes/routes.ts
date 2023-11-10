import RequestContextMiddleware from 'App/Http/Middlewares/RequestContextMiddleware';
import { Router } from '@hero-js/express-adapter';

import Context from 'Contexts';
import HelloHeroJsController from 'App/Http/Controllers/HelloHeroJsController';
import adapter from 'App/app';

const Route = new Router({ context: Context });

Route.use(RequestContextMiddleware.name);

Route.get('/', ({ response }) => response.send('Hello World!'));

Route.get('/hello', HelloHeroJsController.handler('index')).middleware([
  HelloHeroJsController.name,
]);

adapter.setRouter(Route);

// export default Route;
