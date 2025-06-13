import { Component, computed, signal, ViewChild } from '@angular/core';
import { ModalOpcionesComponent } from "../../../features/share-components/modal-opciones/modal-opciones.component";
import { Pieza } from '../../../core/interfaces/Pieza';
import { AdvancedFiltersComponent } from "../../../features/share-components/advanced-filters/advanced-filters.component";
import { TablaPiezasComponent } from '../../../features/share-components/tabla-piezas/tabla-piezas.component';
import { Filtro } from '../../../core/interfaces/Filtro';
import { Router } from '@angular/router';
import { PermisionariaComponent } from '../permisionaria/permisionaria.component';
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';

@Component({
  selector: 'app-consultar-pieza',
  imports: [ModalOpcionesComponent, AdvancedFiltersComponent,AdvancedFiltersComponent, TablaPiezasComponent],
  templateUrl: './consultar-pieza.component.html',
  styleUrl: './consultar-pieza.component.css'
})
export class ConsultarPiezaComponent {


  //constructor para inyectar servicios y dependencias
  //ngOnInit para inicializar datos o servicios
  //ngafterViewInit para trabajar con componentes hijos y señales

  // senal que contiene las piezas
  //  reemplazar esto con una llamada al servicio real
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
   
    {
      idPieza: '00029',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'Entregado',
      dni: '87654321',
      idcobis: 'CB002',
      numeroTarjeta: '4222222222222222',
      fechaProceso: '2025-04-09',
      fechaCambioEstado: '2025-04-10',
      coordenadas: '-34.6037,-58.3816', // Obelisco
    },
    {
      idPieza: '00030',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Pendiente de Retiro',
      dni: '11223344',
      idcobis: 'CB003',
      numeroTarjeta: '4333333333333333',
      fechaProceso: '2025-04-08',
      fechaCambioEstado: '2025-04-09',
      coordenadas: '-34.6532,-58.6426', // Lomas de Zamora
    },
    {
      idPieza: '00031',
      administradora: 'Admin 1',
      permisionaria: 'Permi 1',
      estado: 'En Distribución',
      dni: '22334455',
      idcobis: 'CB004',
      numeroTarjeta: '4444444444444444',
      fechaProceso: '2025-04-07',
      fechaCambioEstado: '2025-04-08',
      coordenadas: '-34.5401,-58.7116', // San Isidro
    },
    {
      idPieza: '00032',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'Devuelto',
      dni: '33445566',
      idcobis: 'CB005',
      numeroTarjeta: '4555555555555555',
      fechaProceso: '2025-04-06',
      fechaCambioEstado: '2025-04-07',
      coordenadas: '-34.9025,-57.9375', // La Plata
    },
    {
      idPieza: '00033',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'En Tránsito',
      dni: '44556677',
      idcobis: 'CB006',
      numeroTarjeta: '4666666666666666',
      fechaProceso: '2025-04-05',
      fechaCambioEstado: '2025-04-06',
      coordenadas: '-34.6083,-58.3732', // Congreso
    },
    {
      idPieza: '00034',
      administradora: 'Admin 1',
      permisionaria: 'Permi 1',
      estado: 'Entregado',
      dni: '55667788',
      idcobis: 'CB007',
      numeroTarjeta: '4777777777777777',
      fechaProceso: '2025-04-04',
      fechaCambioEstado: '2025-04-05',
      coordenadas: '-34.6031,-58.4962', // Morón
    },
    {
      idPieza: '00035',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'En Distribución',
      dni: '66778899',
      idcobis: 'CB008',
      numeroTarjeta: '4888888888888888',
      fechaProceso: '2025-04-03',
      fechaCambioEstado: '2025-04-04',
      coordenadas: '-34.7217,-58.2533', // Quilmes
    },
    {
      idPieza: '00036',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Pendiente de Retiro',
      dni: '77889900',
      idcobis: 'CB009',
      numeroTarjeta: '4999999999999999',
      fechaProceso: '2025-04-02',
      fechaCambioEstado: '2025-04-03',
      coordenadas: '-34.5746,-58.5306', // San Martín
    },
    {
      idPieza: '00037',
      administradora: 'Admin 1',
      permisionaria: 'Permi 1',
      estado: 'Devuelto',
      dni: '88990011',
      idcobis: 'CB010',
      numeroTarjeta: '4000000000000000',
      fechaProceso: '2025-04-01',
      fechaCambioEstado: '2025-04-02',
      coordenadas: '-34.6081,-58.3702', // Retiro
    },
    {
      idPieza: '00038',
      administradora: 'Admin 2',
      permisionaria: 'Permi 2',
      estado: 'En Tránsito',
      dni: '99001122',
      idcobis: 'CB011',
      numeroTarjeta: '4011111111111111',
      fechaProceso: '2025-03-31',
      fechaCambioEstado: '2025-04-01',
      coordenadas: '-34.5611,-58.4583', // Vicente López
    },
    {
      idPieza: '00039',
      administradora: 'Admin 3',
      permisionaria: 'Permi 3',
      estado: 'Entregado',
      dni: '10011223',
      idcobis: 'CB012',
      numeroTarjeta: '4022222222222222',
      fechaProceso: '2025-03-30',
      fechaCambioEstado: '2025-03-31',
      coordenadas: '-34.6405,-58.5628', // Ituzaingó
    },
    {
      idPieza: '00040',
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
      idPieza: '00041',
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
      idPieza: '00042',
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
      idPieza: '00043',
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
      idPieza: '00044',
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
      idPieza: '00045',
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
      idPieza: '00046',
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
      idPieza: '00047',
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
      idPieza: '00048',
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
      idPieza: '00049',
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
      idPieza: '00050',
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
      idPieza: '00051',
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
      idPieza: '00052',
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
      idPieza: '00053',
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
      idPieza: '00054',
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
  // Signals para paginación
  currentPageSignal = signal(1);
  filasPorPaginaSignal = signal(10); // o lo que el usuario elija
  // Signal que controla si el modal está abierto o cerrado
  modalAbierto = signal(false);

 
  @ViewChild('filtrosComponent') filtrosComponent!: AdvancedFiltersComponent;
  @ViewChild('tablaPiezas') tablaPiezas!: TablaPiezasComponent;
  
  
  constructor(private router: Router, private piezasSeleccionadasService: PiezasSeleccionadasService) {}


  //se ejecuta después de que la vista del componente se ha inicializado

  ngAfterViewInit() {

    // Suscribirse a eventos de la tabla de piezas
    this.tablaPiezas.seleccionMasivaSig.subscribe(ids => {
      this.onSeleccionMasiva(ids);
    });

    if (this.filtrosComponent) {
      // Se subscribe a los eventos del componente de filtros y dice que se ejecuten los métodos correspondientes
      this.filtrosComponent.filtroAplicado.subscribe(filtro => {
        this.onFiltroAplicado(filtro);
      });
      this.filtrosComponent.filtroEliminado.subscribe(key => {
        this.onFiltroEliminado(key);
      });
      this.filtrosComponent.limpiarTodos.subscribe(() => {
        this.onLimpiarTodos();
      });
    }

  }

  // Métodos para manejar los filtros que son las subscripciones a los eventos del componente de filtros
  onFiltroAplicado(filtro: Filtro) {
    this.filtrosActivos.set(filtro);
  }
  onFiltroEliminado(key: string) {
    // Elimina la referencia directa al hijo y solo actualiza el estado local de filtros
    this.quitarFiltro(key as keyof Filtro);
  }
  onLimpiarTodos() {
    // Limpia todos los filtros activos en el padre
    this.filtrosActivos.set({});
  }

  
  


  onSeleccionMasiva(ids: string[]) {
    const seleccionadas = this.piezasSignal().filter(p => ids.includes(p.idPieza));
    this.piezasSeleccionadasService.setPiezasSeleccionadas(seleccionadas);
    this.router.navigate(['/permisionaria']);
  }



  toggleFiltro() {
    this.showFilters.update(value => !value);
  }

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

 
  
  
  //cierra y abre componente de filtros
  






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

  
  // Métodos para actualizar los signals
  cambiarPagina(nueva: number) {
    if (nueva >= 1 && nueva <= this.totalPagesSignal()) {
      this.currentPageSignal.set(nueva);
    }
  }

  cambiarPageSize(nuevoTam: number) {
    this.filasPorPaginaSignal.set(nuevoTam);
    this.currentPageSignal.set(1); // resetea la página
  }

  
   // Llama a emitirSeleccionMasiva cuando se hace clic en el botón de Andreani
  emitirSeleccionMasivaDesdePadreAlMapa() {
    // Suponiendo que las piezas seleccionadas tienen isSelected === true
    const seleccionadas = this.piezasSignal().filter(p => p.isSelected);
    if (seleccionadas.length === 0) {
      alert('Selecciona al menos una pieza');
      return;
    }

    this.piezasSeleccionadasService.setPiezasMapas(seleccionadas);
    this.router.navigate(['./mapa'],);

  }
  

  // Llama a emitirSeleccionMasiva cuando se hace clic en el botón de Andreani
  emitirSeleccionMasivaDesdePadre() {
    // Suponiendo que las piezas seleccionadas tienen isSelected === true
    const seleccionadas = this.piezasSignal().filter(p => p.isSelected);
    if (seleccionadas.length === 0) {
      alert('Selecciona al menos una pieza');
      return;
    }

    this.piezasSeleccionadasService.setPiezasSeleccionadas(seleccionadas);
    this.router.navigate(['/permisionaria']);

  }
  // Computed: etiquetas de filtros activos visibles
  // Filtra los filtros activos para mostrar solo aquellos que tienen valor
  getFiltrosActivosVisibles = computed(() => {

    return Object.entries(this.filtrosActivos()).filter(([_, valor]) => {
      if (Array.isArray(valor)) return valor.length > 0;
      return valor !== null && valor !== undefined && valor !== '';
    });

  });

  emitirCambioDeEstado() {
    // Lógica para emitir el cambio de estado
    const piezasSeleccionadas = this.piezasSignal().filter(p => p.isSelected);
    if (piezasSeleccionadas.length === 0) {
      alert('Selecciona al menos una pieza para cambiar el estado');
      return;
    }

    // Emitir el cambio de estado
    this.piezasSeleccionadasService.setPiezasSeleccionadas(piezasSeleccionadas);
    this.router.navigate(['/cambiar-estado'], );
  }

  // Computed: piezas visibles
  piezasPaginadas = computed(() => {

    const todas = this.piezasSignal();

    const pageSize = this.filasPorPaginaSignal();
    const page = this.currentPageSignal();
    const start = (page - 1) * pageSize;

    return todas.slice(start, start + pageSize);
  });


  // Computed: total de páginas
  totalPagesSignal = computed(() =>
    Math.ceil(this.piezasSignal().length / this.filasPorPaginaSignal())
  );



}
