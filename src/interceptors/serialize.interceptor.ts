import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// to make sure that the dto parameter that we pass is a valid dto
interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run something before the request is handled by request handler
    //console.log('I am running before handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        //run something before the resposne is sent out.
        //console.log('I am running before the response is sent', data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        }); // converting the data into format of UserDto.
      }),
    );
  }
}
