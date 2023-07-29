import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  @Injectable()
  export class TransformErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        catchError(error => {
          const response = context.switchToHttp().getResponse();
          const status = error.getStatus();
          const message = error.getResponse();
        
          
          response.status(status).json({ status:'error', data: null, message: message.message });
          return throwError(error);
        }),
      );
    }
  }
  