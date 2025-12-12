import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.services";

export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const token = inject(AuthService).token();

  const newRequest = request.clone({
    headers: request.headers.append('Authorization', `Bearer ${token}`)
  });

  return next(newRequest);
}