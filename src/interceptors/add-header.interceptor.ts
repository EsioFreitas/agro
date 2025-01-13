import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    this.addSecurityHeaders(response);
    this.addPerformanceHeaders(response);
    this.addMonitoringHeaders(response);
    this.addCustomHeaders(response);

    return next.handle();
  }

  private addSecurityHeaders(response: any): void {
    response.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self'",
    );
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    );
    response.setHeader('X-Frame-Options', 'DENY');
    response.setHeader('X-XSS-Protection', '1; mode=block');
    response.setHeader('Referrer-Policy', 'no-referrer');
  }

  private addPerformanceHeaders(response: any): void {
    response.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.setHeader('ETag', '"abc123"');
  }

  private addMonitoringHeaders(response: any): void {
    response.setHeader('Server-Timing', 'cache;desc="Cache Read";dur=23.2');
  }

  private addCustomHeaders(response: any): void {
    response.setHeader('X-App-Version', '1.0.0');
    response.setHeader('X-Environment', 'production');
  }
}
