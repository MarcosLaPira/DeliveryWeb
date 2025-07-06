import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Producto } from '../interfaces/modelos/Productos';
import { Estado } from '../interfaces/modelos/Estado';
import { Sucursal } from '../interfaces/modelos/Sucursal';
import { CodigoDistribucion } from '../interfaces/modelos/CodigoDistribucion';
import { Permisionaria } from '../interfaces/modelos/Permisionaria';
import { DeliveryApiService } from './delivery-api.service.service';

@Injectable({ providedIn: 'root' })
export class CatalogosService {
  constructor(private deliveryApiService: DeliveryApiService) {}

  /** Signals cacheados */
  readonly productos = signal<Producto[] | null>(null);
  readonly estados = signal<Estado[] | null>(null);
  readonly sucursales = signal<Sucursal[] | null>(null);
  readonly codDistrib = signal<CodigoDistribucion[] | null>(null);
  readonly permisionarias = signal<Permisionaria[] | null>(null);

  /** Métodos perezosos: sólo llaman a la API si la señal está vacía */
  cargarProductos() {

    this.deliveryApiService.getCatalogoProductos().subscribe(resp => {
      this.productos.set(resp);
      console.log("productos cargados:", this.productos());
    });

    /*
    console.log('Cargando productos desde la API...');
    debugger;
    if (!this.productos()) {
      this.deliveryApiService
        .getCatalogoProductos()
        .pipe(shareReplay(1))
        .subscribe(this.productos.set);
    }
        */
  }

  cargarEstados() {
    if (!this.estados()) {
      this.deliveryApiService
        .getCatalogoEstados()
        .pipe(shareReplay(1))
        .subscribe(this.estados.set);
    }
  }

  cargarSucursales() {
    if (!this.sucursales()) {
      this.deliveryApiService
        .getCatalogoSucursales()
        .pipe(shareReplay(1))
        .subscribe(this.sucursales.set);
    }
  }

  cargarCodigosDistribucion() {
    if (!this.codDistrib()) {
      this.deliveryApiService
        .getCatalogoCodigosDistribucion()
        .pipe(shareReplay(1))
        .subscribe(this.codDistrib.set);
    }
  }

  cargarPermisionarias() {
    if (!this.permisionarias()) {
      this.deliveryApiService
        .getCatalogoPermisionarias()
        .pipe(shareReplay(1))
        .subscribe(this.permisionarias.set);
    }
  }

  /** Útil cuando querés disparar todo junto (ej: APP_INITIALIZER) */
  precargarTodo() {
    this.cargarProductos();
    this.cargarEstados();
    this.cargarSucursales();
    this.cargarCodigosDistribucion();
    this.cargarPermisionarias();
  }
}
