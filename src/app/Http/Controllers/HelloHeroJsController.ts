import { Middleware, RequestHandlerParams } from '@hero-js/express-adapter';

export default class HelloHeroJsController extends Middleware {
  handle({ request, next }: RequestHandlerParams) {
    request.context?.set('name', 'Hero.JS');
    next();
  }

  index({ response, request }: RequestHandlerParams) {
    response.send(`Hello ${request.context?.get('name')}!`);
  }
}
