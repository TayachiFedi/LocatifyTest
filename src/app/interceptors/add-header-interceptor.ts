import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
  import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
   
  export class AddHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.method!="GET"){
            const clonedRequest = req.clone({ params: req.params.append('access-token', environment.auth) });
            return next.handle(clonedRequest);
        }
        return next.handle(req);
    }
  }