import { Component, computed, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalOpcionesComponent } from "../../../features/share-components/modal-opciones/modal-opciones.component";
import { Pieza } from '../../../core/interfaces/Pieza';
import { AdvancedFiltersComponent } from "../../../features/share-components/advanced-filters/advanced-filters.component";
import { TablaPiezasComponent } from '../../../features/share-components/tabla-piezas/tabla-piezas.component';
import { Filtro } from '../../../core/interfaces/Filtro';

@Component({
  selector: 'app-consultar-pieza',
  imports: [ModalOpcionesComponent, AdvancedFiltersComponent,AdvancedFiltersComponent, TablaPiezasComponent],
  templateUrl: './consultar-pieza.component.html',
  styleUrl: './consultar-pieza.component.css'
})
export class ConsultarPiezaComponent {



  // Definimos la señal con los datos iniciales
  piezasSignal = signal<Pieza[]>([
    {
      idPieza: '00001',
      administradora: 'Admin 1',
      permisionaria: 'Permi 1',
      estado: 'En Tránsito',
      dni: '12345678',
      idcobis: 'CB001',
      numeroTarjeta: '4111111111111111',
      fechaProceso: '2025-04-10',
      fechaCambioEstado: '2025-04-11',
      coordenadas: '-34.6037,-58.3816',
    },
    {
      idPieza: '00002',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'Entregado',
      dni: '87654321',
      idcobis: 'CB002',
      numeroTarjeta: '4222222222222222',
      fechaProceso: '2025-04-09',
      fechaCambioEstado: '2025-04-10',
      coordenadas: '-34.6158,-58.4333',
    },
    {
      idPieza: '00003',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Pendiente de Retiro',
      dni: '11223344',
      idcobis: 'CB003',
      numeroTarjeta: '4333333333333333',
      fechaProceso: '2025-04-08',
      fechaCambioEstado: '2025-04-09',
      coordenadas: '-34.6025,-58.4483',
    },
    {
      idPieza: '00004',
      administradora: 'Admin 1',
      permisionaria: 'Permi 1',
      estado: 'En Distribución',
      dni: '22334455',
      idcobis: 'CB004',
      numeroTarjeta: '4444444444444444',
      fechaProceso: '2025-04-07',
      fechaCambioEstado: '2025-04-08',
      coordenadas: '-34.6171,-58.3682',
    },
    {
      idPieza: '00005',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'Devuelto',
      dni: '33445566',
      idcobis: 'CB005',
      numeroTarjeta: '4555555555555555',
      fechaProceso: '2025-04-06',
      fechaCambioEstado: '2025-04-07',
      coordenadas: '-34.6033,-58.3815',
    },
    {
      idPieza: '00006',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'En Tránsito',
      dni: '44556677',
      idcobis: 'CB006',
      numeroTarjeta: '4666666666666666',
      fechaProceso: '2025-04-05',
      fechaCambioEstado: '2025-04-06',
      coordenadas: '-34.6200,-58.4100',
    },
    {
      idPieza: '00007',
      administradora: 'Admin 1',
      permisionaria: 'Permi 1',
      estado: 'Entregado',
      dni: '55667788',
      idcobis: 'CB007',
      numeroTarjeta: '4777777777777777',
      fechaProceso: '2025-04-04',
      fechaCambioEstado: '2025-04-05',
      coordenadas: '-34.6012,-58.3700',
    },
    {
      idPieza: '00008',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'En Distribución',
      dni: '66778899',
      idcobis: 'CB008',
      numeroTarjeta: '4888888888888888',
      fechaProceso: '2025-04-03',
      fechaCambioEstado: '2025-04-04',
      coordenadas: '-34.6099,-58.3950',
    },
    {
      idPieza: '00009',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Pendiente de Retiro',
      dni: '77889900',
      idcobis: 'CB009',
      numeroTarjeta: '4999999999999999',
      fechaProceso: '2025-04-02',
      fechaCambioEstado: '2025-04-03',
      coordenadas: '-34.6000,-58.3900',
    },
    {
      idPieza: '00010',
      administradora: 'Admin 1',
      permisionaria: 'Permi 1',
      estado: 'Devuelto',
      dni: '88990011',
      idcobis: 'CB010',
      numeroTarjeta: '4000000000000000',
      fechaProceso: '2025-04-01',
      fechaCambioEstado: '2025-04-02',
      coordenadas: '-34.5950,-58.4000',
    },
    {
      idPieza: '00011',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'En Tránsito',
      dni: '99001122',
      idcobis: 'CB011',
      numeroTarjeta: '4011111111111111',
      fechaProceso: '2025-03-31',
      fechaCambioEstado: '2025-04-01',
      coordenadas: '-34.6120,-58.4200',
    },
    {
      idPieza: '00012',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Entregado',
      dni: '10011223',
      idcobis: 'CB012',
      numeroTarjeta: '4022222222222222',
      fechaProceso: '2025-03-30',
      fechaCambioEstado: '2025-03-31',
      coordenadas: '-34.6050,-58.4250',
    },
    {
      idPieza: '00013',
      administradora: 'Admin 1',
      permisionaria: 'Permi 1',
      estado: 'En Distribución',
      dni: '11122334',
      idcobis: 'CB013',
      numeroTarjeta: '4033333333333333',
      fechaProceso: '2025-03-29',
      fechaCambioEstado: '2025-03-30',
      coordenadas: '-34.6100,-58.4300',
    },
    {
      idPieza: '00014',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'Pendiente de Retiro',
      dni: '12233445',
      idcobis: 'CB014',
      numeroTarjeta: '4044444444444444',
      fechaProceso: '2025-03-28',
      fechaCambioEstado: '2025-03-29',
      coordenadas: '-34.6150,-58.4350',
    },
    {
      idPieza: '00015',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Devuelto',
      dni: '13344556',
      idcobis: 'CB015',
      numeroTarjeta: '4055555555555555',
      fechaProceso: '2025-03-27',
      fechaCambioEstado: '2025-03-28',
      coordenadas: '-34.6200,-58.4400',
    },
    {
      idPieza: '00016',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'En Distribución',
      dni: '66778899',
      idcobis: 'CB008',
      numeroTarjeta: '4888888888888888',
      fechaProceso: '2025-04-03',
      fechaCambioEstado: '2025-04-04',
      coordenadas: '-34.6099,-58.3950',
    },
    {
      idPieza: '00017',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Pendiente de Retiro',
      dni: '77889900',
      idcobis: 'CB009',
      numeroTarjeta: '4999999999999999',
      fechaProceso: '2025-04-02',
      fechaCambioEstado: '2025-04-03',
      coordenadas: '-34.6000,-58.3900',
    },
    {
      idPieza: '00018',
      administradora: 'Admin 1',
      permisionaria: 'Permi 1',
      estado: 'Devuelto',
      dni: '88990011',
      idcobis: 'CB010',
      numeroTarjeta: '4000000000000000',
      fechaProceso: '2025-04-01',
      fechaCambioEstado: '2025-04-02',
      coordenadas: '-34.5950,-58.4000',
    },
    {
      idPieza: '00019',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'En Tránsito',
      dni: '99001122',
      idcobis: 'CB011',
      numeroTarjeta: '4011111111111111',
      fechaProceso: '2025-03-31',
      fechaCambioEstado: '2025-04-01',
      coordenadas: '-34.6120,-58.4200',
    },
    {
      idPieza: '00020',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Entregado',
      dni: '10011223',
      idcobis: 'CB012',
      numeroTarjeta: '4022222222222222',
      fechaProceso: '2025-03-30',
      fechaCambioEstado: '2025-03-31',
      coordenadas: '-34.6050,-58.4250',
    },
    {
      idPieza: '00021',
      administradora: 'Admin 1',
      permisionaria: 'Permi 1',
      estado: 'En Distribución',
      dni: '11122334',
      idcobis: 'CB013',
      numeroTarjeta: '4033333333333333',
      fechaProceso: '2025-03-29',
      fechaCambioEstado: '2025-03-30',
      coordenadas: '-34.6100,-58.4300',
    },
    {
      idPieza: '00022',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'Pendiente de Retiro',
      dni: '12233445',
      idcobis: 'CB014',
      numeroTarjeta: '4044444444444444',
      fechaProceso: '2025-03-28',
      fechaCambioEstado: '2025-03-29',
      coordenadas: '-34.6150,-58.4350',
    },
    {
      idPieza: '00023',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Devuelto',
      dni: '13344556',
      idcobis: 'CB015',
      numeroTarjeta: '4055555555555555',
      fechaProceso: '2025-03-27',
      fechaCambioEstado: '2025-03-28',
      coordenadas: '-34.6200,-58.4400',
    },
     {
      idPieza: '00024',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Entregado',
      dni: '10011223',
      idcobis: 'CB012',
      numeroTarjeta: '4022222222222222',
      fechaProceso: '2025-03-30',
      fechaCambioEstado: '2025-03-31',
      coordenadas: '-34.6050,-58.4250',
    },
    {
      idPieza: '00025',
      administradora: 'Admin 1',
      permisionaria: 'Permi 1',
      estado: 'En Distribución',
      dni: '11122334',
      idcobis: 'CB013',
      numeroTarjeta: '4033333333333333',
      fechaProceso: '2025-03-29',
      fechaCambioEstado: '2025-03-30',
      coordenadas: '-34.6100,-58.4300',
    },
    {
      idPieza: '00026',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'Pendiente de Retiro',
      dni: '12233445',
      idcobis: 'CB014',
      numeroTarjeta: '4044444444444444',
      fechaProceso: '2025-03-28',
      fechaCambioEstado: '2025-03-29',
      coordenadas: '-34.6150,-58.4350',
    },
    {
      idPieza: '00027',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Devuelto',
      dni: '13344556',
      idcobis: 'CB015',
      numeroTarjeta: '4055555555555555',
      fechaProceso: '2025-03-27',
      fechaCambioEstado: '2025-03-28',
      coordenadas: '-34.6200,-58.4400',
    },
  ]);

  showFilters = signal(false);

 filtrosActivos = signal<Filtro>({});

  onFiltroAplicado(filtro: Filtro) {
    this.filtrosActivos.set(filtro);
  }

   @ViewChild('filtrosComponent') filtrosComponent!: AdvancedFiltersComponent;

 quitarFiltro(clave: keyof Filtro) {
    const copia = structuredClone(this.filtrosActivos());

    const valor = copia[clave];

    if (Array.isArray(valor)) {
      (copia[clave] as any) = [];
    } else {
      (copia[clave] as any) = '';
    }

    this.filtrosActivos.set(copia);

    this.filtrosComponent.resetearFiltro(clave);

    this.onFiltroAplicado(this.filtrosActivos());
  }

  getFiltrosActivosVisibles = computed(() => {

    return Object.entries(this.filtrosActivos()).filter(([_, valor]) => {
      if (Array.isArray(valor)) return valor.length > 0;
      return valor !== null && valor !== undefined && valor !== '';
    });

  });
    // Signal que controla si el modal está abierto o cerrado
  modalAbierto = signal(false);
  //cierra y abre componente de filtros
  toggleFiltro() {
    this.showFilters.update(value => !value);
  }






  abrirModal(pieza: Pieza) {
     // Usás la pieza seleccionada para mostrar el modal

    this.modalAbierto.set(true); // Abre el modal
  }

  cerrarModal() {
    this.modalAbierto.set(false); // Cierra el modal
  }



  toggleFilters() {
    this.showFilters.update(v => !v);
  }





  // Signals para paginación
  pageSizeSignal = signal(25);
  currentPageSignal = signal(1);

  // Computed: total de páginas
  totalPagesSignal = computed(() =>
    Math.ceil(this.piezasSignal().length / this.pageSizeSignal())
  );

  // Computed: piezas visibles
  piezasPaginadas = computed(() => {
    const todas = this.piezasSignal();
    const pageSize = this.pageSizeSignal();
    const page = this.currentPageSignal();
    const start = (page - 1) * pageSize;
    return todas.slice(start, start + pageSize);
  });

  // Métodos para actualizar los signals
  cambiarPagina(nueva: number) {
    if (nueva >= 1 && nueva <= this.totalPagesSignal()) {
      this.currentPageSignal.set(nueva);
    }
  }

  cambiarPageSize(nuevoTam: number) {
    this.pageSizeSignal.set(nuevoTam);
    this.currentPageSignal.set(1); // resetea la página
  }

  filasPorPaginaSignal = signal(10); // o lo que el usuario elija



}
