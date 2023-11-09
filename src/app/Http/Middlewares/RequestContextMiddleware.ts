import { Middleware, RequestHandlerParams } from '@hero-js/express-adapter';
import Context from '@hero-js/context';

export default class RequestContextMiddleware extends Middleware {
  handle({ request, next }: RequestHandlerParams) {
    const context = Context.createVolatileContext();

    request.context = context;
    next();
  }
}
