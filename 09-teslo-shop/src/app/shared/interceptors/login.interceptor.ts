import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export function logginInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(request).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log(request.url, 'returned a response with status', event.status);
      }
    })
  );
}