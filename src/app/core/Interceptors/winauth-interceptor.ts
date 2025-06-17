import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

const HEADERS = new HttpHeaders()
 //.set("appdelivery", "true")
   //.set("Content-Type", "application/json")
  // .set("Access-Control-Allow-Origin", "http://localhost:4200")
  //.set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  //.set("Access-Control-Allow-Headers", "user,password,Origin,Content-Type,undefinedaccept,accept-language,handle,requestsource")
  //.set("undefinedaccept", "application/json")
  //.set("accept-language", "en-US,en;q=0.8")
   .set("user", "SIDCOMPCOBDESA")
   .set("password", "MFoGCSsGAQQBgjdYA6BNMEsGCisGAQQBgjdYAwGgPTA7AgMCAAACAmYCAgIAgAQIraCvcaIGJNEEENHyMbRDc7V8bx3EN7ZxXyYEENjM1Zk8/taiU2ppwfzYCAQ=")
   .set("handle", "clientes")
  // .set("requestsource", "LANDING")


@Injectable()
export class WinAuthInterceptor implements HttpInterceptor {


  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ 
        //headers:HEADERS,      
        // withCredentials:true
    });

    console.log("por el interceptor" + req);
    return next.handle(req);
  }
}