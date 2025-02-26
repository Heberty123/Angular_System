import { inject, Injectable, NgModule } from '@angular/core';
import {  HttpEvent,  HttpInterceptor,  HttpHandler,  HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

   private baseUrl = "http://localhost:8080/";
   router = inject(Router)

   intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
      
      var token = localStorage.getItem('token') ?? ''
      console.log('interceptor:', token)
      const dupReq = req.clone({
         headers: req.headers.set('authorization', token ? 'Bearer ' + token : ''),
         url: `${this.baseUrl}${req.url}`
      });
      return next.handle(dupReq).pipe(
         catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
               this.router.navigate(['login'])
            }
            return throwError(() => error)
         })
      )
   }
}


@NgModule({
   providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
   }]
})
export class Interceptor { }