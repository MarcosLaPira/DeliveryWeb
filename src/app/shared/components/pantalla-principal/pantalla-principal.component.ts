import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryApiService } from '../../../core/services/delivery-api.service.service';
import { FiltroconsultaPieza } from '../../../core/interfaces/modelos/FiltroConsultaPieza';

@Component({
  selector: 'app-pantalla-principal',
  templateUrl: './pantalla-principal.component.html',
})
export class PantallaPrincipalComponent {

  
  private router = inject(Router);
  private deliveryApiService = inject(DeliveryApiService);
  
  
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
}
