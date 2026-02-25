import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  private getDefaultMessage(method: string): string {
    switch (method) {
      case 'POST':
        return 'Tạo mới thành công.';
      case 'PATCH':
        return 'Cập nhật thành công.';
      case 'DELETE':
        return 'Xóa thành công.';
      case 'GET':
        return 'Lấy dữ liệu thành công.';
      default:
        return 'Yêu cầu đã hoàn thành.';
    }
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        let message = this.getDefaultMessage(
          context.switchToHttp().getRequest().method,
        );

        if (data && typeof data === 'object' && 'message' in data) {
          message = data.message;
          delete data.message;
        }

        return {
          success: true,
          message,
          data,
        };
      }),
    );
  }
}
