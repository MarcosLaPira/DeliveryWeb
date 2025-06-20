import { Component, computed, Input, output, signal } from '@angular/core';
import { Sign } from 'crypto';
import { Facturacion } from '../../../core/interfaces/facturacion';
import { Router } from '@angular/router';
import { Pieza } from '../../../core/interfaces/modelos/Pieza';
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DeliveryApiService } from '../../../core/services/delivery-api.service.service';

@Component({
  selector: 'app-reportes-facturacion',
  imports: [ReactiveFormsModule],
  templateUrl: './reportes-facturacion.component.html',
  styleUrl: './reportes-facturacion.component.css'
})
export class ReportesFacturacionComponent {

  filtroForm: FormGroup;
  reportes = output<Facturacion>();
  reportesSeleccionados = signal<Facturacion[]>([]);


  piezasSeleccionadasSignal = signal<Pieza[]>([]); // Inicializa la señal de piezas como un array vacío
  
  constructor
  (
    private fb: FormBuilder,
    private piezasSeleccionadasService: PiezasSeleccionadasService,
    private router: Router,
    private deliveryApiService: DeliveryApiService,
    
  ){
    //deberia de solo setearse cuando el servicio de pieza seleccionada tiene algo
  //  this.piezasSeleccionadasSignal.set(this.piezasSeleccionadasService.getPiezasSeleccionadas()());
     this.piezasSeleccionadasSignal.set(this.piezasSeleccionadasService.getPiezasSeleccionadas()());  
      this.filtroForm = this.fb.group({
      desde: [null],
      hasta: [null],
      contrato: ['']
    });
  }

   // ...existing code...


  ngOnInit() {
    this.refrescarPiezasSeleccionadas();
  }

  refrescarPiezasSeleccionadas() {
    this.piezasSeleccionadasSignal.set(this.piezasSeleccionadasService.getPiezasSeleccionadas()());
  }
 
  onSubmit() {
    const { desde, hasta, contrato } = this.filtroForm.value;
    let filtro = '';
    if (desde) filtro += `fechaDesde=${desde}&`;
    if (hasta) filtro += `fechaHasta=${hasta}&`;
    if (contrato) filtro += `nroDeServicio=${contrato}`;

    this.deliveryApiService.GetPieza(filtro).subscribe({
      next: (piezas: Pieza[]) => this.piezasSeleccionadasSignal.set(piezas),
      error: () => this.piezasSeleccionadasSignal.set([])
    });
  }
    
  preciosPorCodigo: { [codigo: string]: number } = {
  '400028424': 2000,
  '300000233': 3000,
  '300000206': 6000,
  //'300000233': 500,
  '300000230': 1500,
  
  // ...otros códigos
  };

 resumenPorCodigo = computed(() => {
    const piezas = this.piezasSeleccionadasSignal();
    if (!piezas || piezas.length === 0) return [];
    const agrupado: { [codigo: string]: { CodigoDistribucion: string, contrato: string, permisionaria: string, cantidad: number, monto: number } } = {};
    for (const pieza of piezas) {
      const codigo = pieza.NroDeServicio;
      if (!agrupado[codigo]) {
        agrupado[codigo] = {
          CodigoDistribucion: pieza.CodigoDistribucion ?? '-',
          contrato: pieza.NroDeServicio,
          permisionaria: pieza.permisionaria ?? '-',
          cantidad: 0,
          monto: 0
        };
      }
      agrupado[codigo].cantidad++;
      agrupado[codigo].monto += this.preciosPorCodigo[codigo] ?? 0;
    }
    return Object.entries(agrupado).map(([codigo, data]) => ({ codigo, ...data }));
  });

  
  filtrosBusqueda = signal<{ desde: Date; hasta: Date; contrato: number | null }>({
    desde: new Date(),
    hasta: new Date(),
    contrato: null
  });

  

  emitirFiltros(desde: Date, hasta: Date, contrato: number | null) {
    this.filtrosBusqueda.set({ desde, hasta, contrato });
  }

  reporteSeleccionado(reporte: Facturacion) {
   this.reportes.emit(reporte);
     this.router.navigate(['/consultar-pieza']);
  }
}
