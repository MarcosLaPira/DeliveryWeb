import { inject, Injectable } from '@angular/core';
import { Pieza } from '../interfaces/modelos/Pieza';
import { historia } from '../interfaces/modelos/Historia';
import { usuarioLogueado } from '../interfaces/modelos/UsuarioLogueado';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { consultaPiezasInitFormData } from '../interfaces/modelos/ConsultaPiezasInitFormData';
import { DetallePieza } from '../interfaces/modelos/detallePieza';
import { Producto } from '../interfaces/modelos/Productos';
import { Estado } from '../interfaces/modelos/Estado';
import { Sucursal } from '../interfaces/modelos/Sucursal';
import { CodigoDistribucion } from '../interfaces/modelos/CodigoDistribucion';
import { Permisionaria } from '../interfaces/modelos/Permisionaria';




const HEADERS = new HttpHeaders()

  .set("Access-Control-Allow-Origin", "http://localhost:4200/")
  .set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS")
  .set("Access-Control-Allow-Headers", "user,password,Origin,Content-Type,undefinedaccept,accept-language,handle,requestsource")
  .set("undefinedaccept", "application/json")
  .set("accept-language", "en-US,en;q=0.8")




@Injectable({ providedIn: 'root'})
export class DeliveryApiService {
  urlBase: string = 'http://localhost:52441/api/v1/';
  // urlBase: string = 'https://desadeliveryapi:8443/DeliveryAPI/api/v1/';
  urlDeliveryApiPiezas: string = this.urlBase + "delivery/piezas/buscar?";
  urlDeliveryApiRescate: string = this.urlBase + "delivery/app/rescates";
  urlDeliveryApiDetalle: string = this.urlBase + "delivery/app/piezas/piezasdetalle";
  urlDeliveryApiCatalogos: string = this.urlBase + "delivery/app/catalogos";
  urlDeliveryApihistoria: string = this.urlBase + "delivery/app/piezas/historia/";
  urlDeliveryApiUser: string = this.urlBase + "seguridad/user";

  // Si consultaPiezasInitFormData es una interface, inicializa como objeto vacío
  consultaPiezasInitFormData: consultaPiezasInitFormData = {
    Estados: [],
    TiposProducto: [],
    Sucursales: []
  };

 constructor(private _httpClient: HttpClient) {}
  //constructor(private _httpClient: HttpClient) {}

  
  GetPieza(filtro: string): Observable<Pieza[]> {
    console.log('Llamando a la API de piezas sin filtro');
   
   
    console.log('Filtro:', filtro);
  
     return this._httpClient.get<Pieza[]>('http://localhost:52441/api/v1/delivery/app/piezas/buscar?' + filtro, { withCredentials: true} )
  
  }

  /*
  GetPieza(idTipoProducto: number, fechaDesde: string, fechaHasta: string): Observable<Pieza[]> {

    return this._httpClient.get<Pieza[]>('http://localhost:52441/api/v1/delivery/app/piezas/buscar?idTipoProducto=17&fechaDesde=2024-06-13&fechaHasta=2024-08-13');
  }

  */
  Rescatar(idpieza: number, idSucursal: number) {
    console.log(this.urlDeliveryApiRescate + '?idPieza=' + idpieza + '&idSuc=' + idSucursal);

    // Si el backend espera JSON, envía un objeto, no URLSearchParams
    const body = { idPieza: idpieza, idSuc: idSucursal };
    this._httpClient.post(this.urlDeliveryApiRescate, body).subscribe(
      data => {
        // Manejar respuesta si es necesario
      },
      error => {
        console.log(error);
      }
    );
  }

  Gethistoria(idpieza: number): Observable<historia[]> {
    console.log(this.urlDeliveryApihistoria + idpieza);
    return this._httpClient.get<historia[]>(this.urlDeliveryApihistoria + idpieza, { withCredentials: true});
  }



  GetusuarioLogueado(): Observable<usuarioLogueado> {
    return this._httpClient.get<usuarioLogueado>(this.urlDeliveryApiUser, {
     
      withCredentials: true
    });
  }

  GetInitDataconsultaPiezas(): Observable<consultaPiezasInitFormData> {
    return this._httpClient.get<consultaPiezasInitFormData>(this.urlDeliveryApiCatalogos);
  }

  GetDetallePieza(idpieza: number): Observable<DetallePieza[]> {
    console.log(this.urlDeliveryApiDetalle + "/" + idpieza);
    return this._httpClient.get<DetallePieza[]>(this.urlDeliveryApiDetalle + "/" + idpieza);
  }

  
  usuario: string = 'SIDCOMPCOBDESA';
  contrasena: string = 'MFoGCSsGAQQBgjdYA6BNMEsGCisGAQQBgjdYAwGgPTA7AgMCAAACAmYCAgIAgAQIraCvcaIGJNEEENHyMbRDc7V8bx3EN7ZxXyYEENjM1Zk8/taiU2ppwfzYCAQ=';
  handle: string = 'dts';

  //devulve los productos de delivery(tipos de productos)
  getCatalogoProductos(): Observable<Producto[]> {
  
    console.log("entre al catalogo")
    return this._httpClient.get<Producto[]>('http://localhost:52441/api/v1/delivery/app/piezas/catalogos/productos',
      {   
        withCredentials: true
      }
    );
      
      /*
      return this._httpClient.get<any[]>('http://localhost:52441/api/v1/delivery/catalogos/productos', {
        headers: new HttpHeaders({
          'user': 'SIDCOMPCOBDESA',
          'password' : 'MFoGCSsGAQQBgjdYA6BNMEsGCisGAQQBgjdYAwGgPTA7AgMCAAACAmYCAgIAgAQIraCvcaIGJNEEENHyMbRDc7V8bx3EN7ZxXyYEENjM1Zk8/taiU2ppwfzYCAQ=',
          'handle': 'dts'
          // El interceptor igual agregará los suyos
        }), withCredentials: true // este va solo si realmente necesitás cookies/autenticación

      });
      */
  }

  getCatalogoEstados(): Observable<Estado[]> {
  
    console.log("entre al catalogo de estados")
    return this._httpClient.get<Estado[]>('http://localhost:52441/api/v1/delivery/app/piezas/catalogos/estados',
      {   
        withCredentials: true
      }
    );
    
  }


  getCatalogoSucursales(): Observable<Sucursal[]> {
  
    console.log("entre al catalogo de sucursales")
    return this._httpClient.get<Sucursal[]>('http://localhost:52441/api/v1/delivery/app/piezas/catalogos/sucursales',
      {   
        withCredentials: true
      }
    );
    
  }

  
  getCatalogoCodigosDistribucion(): Observable<CodigoDistribucion[]> {
  
    console.log("entre al catalogo de codigos de distribucion")
    return this._httpClient.get<CodigoDistribucion[]>('http://localhost:52441/api/v1/delivery/app/piezas/catalogos/codigosDistribucion',
      {   
        withCredentials: true
      }
    );
    
  }

  
  getCatalogoPermisionarias(): Observable<Permisionaria[]> {
  
    console.log("entre al catalogo de permisionarias")
    return this._httpClient.get<Permisionaria[]>('http://localhost:52441/api/v1/delivery/app/piezas/catalogos/permisionarias',
      {   
        withCredentials: true
      }
    );
    
  }

 
  PostAplicarCambioDeEstado(
    idPieza: number,
    idTipoProducto: number,
    idNuevoEstado: number,
    usuario: string,
    idRol: number
  ): Observable<any[]> {
  
    const params = new HttpParams()
      .set('idPieza', idPieza.toString())
      .set('idTipoProducto', idTipoProducto.toString())
      .set('idNuevoEstado', idNuevoEstado.toString())
      .set('u', usuario)
      .set('idRol', idRol.toString());
  
    return this._httpClient.post<any[]>(
      '/api/v1/delivery/app/pie/cambioEstado?' + params.toString(),
      {}, // cuerpo vacío, porque solo se usan los query params
      { withCredentials: true }
    );
  }
   
    
   /*
  PostAplicarCambioDeEstado(
    idPieza: number,
    idTipoProducto: number,
    idNuevoEstado: number,
    usuario: string,
    idRol: number
  ): Observable<any[]> {
  
    const params = new HttpParams()
      .set('idPieza', idPieza.toString())
      .set('idTipoProducto', idTipoProducto.toString())
      .set('idNuevoEstado', idNuevoEstado.toString())
      .set('idRol', idRol.toString())
      .set('u', usuario); // nota: el curl usa "u" en vez de "usuario"
  
    const headers = new HttpHeaders({
      'user': 'SIDCOMPCOBDESA',
      'password': 'MFoGCSsGAQQBgjdYA6BNMEsGCisGAQQBgjdYAwGgPTA7AgMCAAACAmYCAgIAgAQIraCvcaIGJNEEENHyMbRDc7V8bx3EN7ZxXyYEENjM1Zk8/taiU2ppwfzYCAQ=',
      'handle': 'dts',
      'Accept': 'application/json'
    });
  
    return this._httpClient.post<any[]>(
      'https://desadeliveryapi:8443/DeliveryAPI/api/v1/delivery/piezas/cambioEstado?' + params.toString(),
      {}, // cuerpo vacío
      {
        headers,
        withCredentials: true
      }
    );
  }
     */

  
 
  PostAplicarRescate(
    idPieza: number,
    idSuc: number,
    
  ): Observable<any[]> {
  
    const params = new HttpParams()
      .set('idPieza', idPieza.toString())
      .set('idSuc', idSuc.toString())
  
    return this._httpClient.post<any[]>(
      '/api/v1/delivery/app/rescates?' + params.toString(),
      {}, // cuerpo vacío, porque solo se usan los query params
      { withCredentials: true }
    );
  }
    


  

 

  

  

}
