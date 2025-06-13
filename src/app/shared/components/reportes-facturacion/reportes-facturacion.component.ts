import { Component, output, signal } from '@angular/core';
import { Sign } from 'crypto';
import { Facturacion } from '../../../core/interfaces/facturacion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportes-facturacion',
  imports: [],
  templateUrl: './reportes-facturacion.component.html',
  styleUrl: './reportes-facturacion.component.css'
})
export class ReportesFacturacionComponent {

  reportes = output<Facturacion>();
  reportesSeleccionados = signal<Facturacion[]>([]);

  reportesFacturacion = signal<Facturacion[]>([
    { contrato: 1, empresa: 'Andreani', cantidad: 71, montoFacturado: 1200000 },
    { contrato: 2, empresa: 'Rapi pago', cantidad: 50, montoFacturado: 850000 },
    { contrato: 3, empresa: 'Andreani', cantidad: 25, montoFacturado: 2430000 },
    { contrato: 4, empresa: 'Andreani', cantidad: 1001, montoFacturado: 10200000 },
    { contrato: 5, empresa: 'Rapi pago', cantidad: 507, montoFacturado: 233000 },
    { contrato: 6, empresa: 'Andreani', cantidad: 777, montoFacturado: 21430000 },
  ]);

  filtrosBusqueda = signal<{ desde: Date; hasta: Date; contrato: number | null }>({
    desde: new Date(),
    hasta: new Date(),
    contrato: null
  });

  constructor(private router: Router) {}

  emitirFiltros(desde: Date, hasta: Date, contrato: number | null) {
    this.filtrosBusqueda.set({ desde, hasta, contrato });
  }

  reporteSeleccionado(reporte: Facturacion) {
   this.reportes.emit(reporte);
     this.router.navigate(['/consultar-pieza']);
  }
}
