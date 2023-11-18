import { Middleware as AdapterMiddleware, RequestHandlerParams } from '@hero-js/express-adapter';
import * as httpStatus from 'http-status-codes';

import Config from 'Config';
import Context from 'Contexts';
import IResponse from 'Interfaces/ApiResponse';

abstract class Middleware extends AdapterMiddleware {
  config: typeof Config;

  context: typeof Context | null;

  request: RequestHandlerParams['request'];

  response: RequestHandlerParams['response'];

  constructor({
    context,
    request,
    response,
  }: {
    context: typeof Context | null;
    request: RequestHandlerParams['request'];
    response: RequestHandlerParams['response'];
  }) {
    super({ context, request, response });
    this.config = Config;
    this.context = context;
    this.response = response;
    this.request = request;
  }

  private isErrorResponse(statusCode: number) {
    return statusCode >= httpStatus.StatusCodes.BAD_REQUEST;
  }

  private isStatusCode(res: number) {
    return (
      typeof res === 'number' &&
      Number.isInteger(res) &&
      res >= 100 &&
      res < 600
    );
  }

  private buildSimpleResponse(
    responseValue: string | number,
  ): IResponse.ApiResponse<any> {
    let message = responseValue;

    if (typeof responseValue === 'number' && this.isStatusCode(responseValue)) {
      this.response.statusCode = responseValue;
      message = httpStatus.getReasonPhrase(this.response.statusCode);
    }

    let status: IResponse.ApiResponse<any>['status'] = this.isErrorResponse(
      this.response.statusCode,
    )
      ? 'error'
      : 'success';

    return {
      statusCode: this.response.statusCode,
      status,
      message,
      data: status === 'success' ? [] : undefined,
      errorType: status === 'error' ? 'simple' : undefined,
    } as IResponse.ApiResponse<any>;
  }

  private buildComplexResponse(
    responseValue: IResponse.ApiResponse<any>,
  ): IResponse.ApiResponse<any> {
    const {
      statusCode,
      status,
      message,
      data,
      errorType,
      pagination,
      metaData = {},
      errors,
      ...rest
    } = responseValue;

    let newResponse: IResponse.ApiResponse<any> = {
      statusCode:
        statusCode ?? this.response.statusCode ?? httpStatus.StatusCodes.OK,
      message,
      status,
      data,
      errorType,
      errors,
      pagination,
      metaData,
    } as any;

    this.response.statusCode = newResponse.statusCode;

    if (!status)
      newResponse.status = this.isErrorResponse(newResponse.statusCode)
        ? 'error'
        : 'success';

    if (!message)
      newResponse.message = httpStatus.getReasonPhrase(newResponse.statusCode);

    if (data && !Array.isArray(data)) newResponse.data = [data];

    if (newResponse.status === 'success') {
      newResponse.data = newResponse.data ?? [];

      newResponse.metaData = { ...metaData, ...rest };
    }

    if (newResponse.status === 'error' && !errorType)
      newResponse.errorType = 'simple';

    if (errors) newResponse.errorType = 'field';

    return newResponse;
  }

  responseBuilder(
    responseValue: string | number | IResponse.ApiResponse<any>,
  ): IResponse.ApiResponse<any> {
    if (
      typeof responseValue === 'string' ||
      typeof responseValue === 'number'
    ) {
      return this.buildSimpleResponse(responseValue);
    }

    return this.buildComplexResponse(responseValue);
  }
}

export default Middleware;
