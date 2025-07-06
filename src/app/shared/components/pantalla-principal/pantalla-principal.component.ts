import { Component, inject, OnInit, Renderer2, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryApiService } from '../../../core/services/delivery-api.service.service';
import { FiltroconsultaPieza } from '../../../core/interfaces/modelos/FiltroConsultaPieza';
import { Pieza } from '../../../core/interfaces/modelos/Pieza';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
})
export class PantallaPrincipalComponent  implements OnInit {

  
  private router = inject(Router);
  piezas = signal<Pieza[]>([]); // Inicializa la señal de piezas como un array vacío
  cargando =signal<boolean>(false); // Signal para controlar el estado de carga
//  private deliveryApiService = inject(DeliveryApiService);
  piezasEnTransito = signal<number>(0);
  piezasPedidoDeRescate = signal<number>(0);
  piezasEntregasDelDia = signal<number>(0);
  piezasEnGuarda = signal<number>(0);
  
  cursor = signal<string>('default'); 

  constructor(
   
    private renderer: Renderer2,
    private deliveryApiService: DeliveryApiService,
    
  ) {}

  ngOnInit() {
    console.log("ngOnInit ejecutado en pantalla principal");
  
    this.cargando.set(true); // Activa el estado de carga
   // this.cursor.set('progress'); // Cambia el cursor a "progress"
    document.body.style.cursor = 'progress';
    const filtro = 'fechaDesde=2024-09-01&fechaHasta=2024-12-31&estados=160, 170, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 99, 100, 101, 69, 27, 106, 203, 31, 23, 4, 5, 6, 21'
  
    const filtro2 = 'fechaDesde=2025-05-01&fechaHasta=2025-07-7'
    this.deliveryApiService.GetPieza(filtro2).subscribe({
      next: (piezas) => {
       
        this.piezas.set(piezas);
        this.cargando.set(false);
        this.calcularMetricas(piezas);
       // this.cursor.set('default'); // Restaura el cursor
        document.body.style.cursor = 'default';
      },
      error: (error) => {
        this.cargando.set(false);
        document.body.style.cursor = 'default';
        console.log("error", error);
      },
    });
  }

  enTransito = signal<number>(0);
  enGuarda = signal<number>(0);
  entregasDelDia = signal<number>(0);
  pedidoDeRescate = signal<number>(0);

  calcularMetricas(piezas: Pieza[]) {
   

    // Filtra y cuenta las piezas en tránsito = 1
    const estadosEnTransito = ['160', '170', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189', '190', '191', '192', '193', '194', '195', '99', '100', '101', '69', '27', '106', '203', '31', '23', '4', '5', '6', '21','9','16','20','46']; // Conjunto de estados que representan "En Transito"
   this.enTransito.set(piezas.filter(pieza => estadosEnTransito.includes(pieza.IDEstado)).length);  
    //this.piezasEnTransito.set(enTransito);

    // Filtra y cuenta las piezas en guarda 2
    const estadosEnGuarda = ['55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '10', '68', '98', '97', '102', '103', '8', '12', '18']
    this.enGuarda.set(piezas.filter(pieza => estadosEnGuarda.includes(pieza.IDEstado)).length);
   // this.piezasEnGuarda.set(enGuarda);

    // Filtra y cuenta las piezas entregadas en el día 3
    const estadosEntregasDelDia = ['19', '7', '11', '44', '210', '105', '70', '95', '17', '200', '201', '202']; // Conjunto de estados que representan "Entregas del Día"
    this.entregasDelDia.set(piezas.filter(pieza => estadosEntregasDelDia.includes(pieza.IDEstado)).length);
  //  this.piezasEntregasDelDia.set(entregasDelDia);
  
    // Filtra y cuenta las piezas con pedido de rescate 4
    const estadosRescate = ['1','2','3','4','5','6'];
    this.pedidoDeRescate.set(piezas.filter(pieza => estadosRescate.includes(pieza.IDEstadoRescate)).length);
    //this.piezasPedidoDeRescate.set(pedidoDeRescate);
  
   
  
 
  }

  
  irAPiezasEnTransito() {
    // Llama a consultar-pieza con id=1 para indicar consulta de piezas en tránsito
    this.router.navigate(['/consultar-pieza'], {
      queryParams: { id: 1 },
    });
  }

  
  irAPiezasEnGuarda() {
     this.router.navigate(['/consultar-pieza'], {
      queryParams: { id: 2 },
    });
  }

  irAPiezasEntregasDelDia() {
    this.router.navigate(['/consultar-pieza'], {
      queryParams: { id: 3 },
    });
  }

  irAPiezasPedidosDeRescate() {
    this.router.navigate(['/consultar-pieza'], {
      queryParams: { id: 4 },
    });
  }
}
