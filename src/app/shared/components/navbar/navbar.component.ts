import { Component, signal, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DeliveryApiService } from '../../../core/services/delivery-api.service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pieza } from '../../../core/interfaces/modelos/Pieza';
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';
import { EstadoRescatePipe } from '../../../core/pipes/estadoRescate.pipe';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterOutlet,RouterLinkActive,CommonModule,FormsModule,EstadoRescatePipe],
  templateUrl: './navbar.component.html',
  standalone: true,
})
export class NavbarComponent {

  
  dni = signal<string>(''); //
  piezas = signal<Pieza[] | null>(null); //
  dropdownAbierto = signal<boolean>(false); // Controla la visibilidad del dropdown

    
  readonly mensajeUsuario = signal<boolean>(false);
  readonly rescateOreenvioSucces = signal<boolean>(false);
  readonly tipoMensaje = signal<string>('');

  
  constructor(
    private router: Router, 
    private deliveryApiService: DeliveryApiService,
    private piezasSeleccionadasService: PiezasSeleccionadasService
  ) 
  {}


  
  mostrarMensaje(idEsReenvioORescate: boolean,mensajeEsSucess: boolean , mensaje: string) {
    this.mensajeUsuario.set(true);
    
    if(mensajeEsSucess) {
      this.rescateOreenvioSucces.set(true); // Indica que se ha realizado un rescate exitoso
    }
    else {
      this.rescateOreenvioSucces.set(false); // Indica que se ha realizado un rescate exitoso
    }

    //mostrar mensaje para el rescate
    if(idEsReenvioORescate){
      this.tipoMensaje.set(mensaje);
    }

     //mostrar mensaje para el reenvio
     if(!idEsReenvioORescate){
      this.tipoMensaje.set(mensaje);
    }

    setTimeout(() => {
      this.mensajeUsuario.set(false);
    }, 4000);
  }

  hacerRescate(idPieza: number) {
    console.log('Haciendo reenvío para la pieza con ID:', idPieza);

   

    this.deliveryApiService.PostAplicarRescate(idPieza,99).subscribe({//mando por defecto casa central
      next: (resp) => {
        console.log("🚀 ~ NavbarComponent ~ this.deliveryApiService.PostAplicarRescate ~ resp:", resp);
        this.mostrarMensaje(true,true, 'Rescate realizado correctamente.'); // Mensaje de éxito
        
      },
      error: (error) => {
        console.log("🚀 ~ NavbarComponent ~ this.deliveryApiService.PostAplicarRescate ~ error:", error)
        this.mostrarMensaje(true,false, 'Error al realizar el rescate' + error); // Mensaje de error
       
      },
      complete: () => {
       this.cerrarDropdown(); // Cierra el dropdown después de realizar el rescate
       this.dni.set(''); // Limpia el campo de búsqueda
      }
    }); // Llama al servicio para realizar el rescate
    //para rescate mando true
    
  }

  hacerReenvio(idPieza: number) {
    console.log('Haciendo reenvío para la pieza con ID:', idPieza);

    this.rescateOreenvioSucces.set(true); // Indica que se ha realizado un rescate exitoso

    //para reenvio mando false
    this.mostrarMensaje(false,true, 'Reenvío realizado correctamente.'); // Mensaje de éxito

  }

  
  esPantallaPrincipal(): boolean {
    return this.router.url === '/pantalla-principal';
  }

  

  buscarPorDni() {
    if (!this.dni()) {
      alert('Por favor, ingrese un DNI válido.');
      return;
    }

    console.log('Buscando piezas para el DNI:', this.dni());

    const filtro = `numeroDocumento=${this.dni()}`;
    this.deliveryApiService.GetPieza(filtro).subscribe({
      next: (piezas) => {

        
      const piezasOrdenadas = piezas.sort((a, b) =>
        new Date(a.FechaAltaTarjeta).getTime() - new Date(b.FechaAltaTarjeta).getTime()
      );
     
        console.log("🚀 ~ NavbarComponent ~ this.deliveryApiService.GetPieza ~ piezas:", piezasOrdenadas)
        this.piezas.set(piezasOrdenadas);
        this.abrirDropdown(); // Abre el dropdown al recibir los resultados
        
        
      },
      error: (error) => {
        console.error('Error al buscar piezas por DNI:', error);
        alert('No se encontraron piezas para el DNI ingresado.');
      },
    });
  }

  abrirDropdown() {
    this.dropdownAbierto.set(true); // Abre el dropdown
  }

  cerrarDropdown() {
    console.log('Cerrando dropdown');
    this.dropdownAbierto.set(false); // Cierra el dropdown
  }

  toggleDropdown() {
    this.dropdownAbierto.set(!this.dropdownAbierto()); // Alterna el estado del dropdown
  }

  seleccionarPieza(pieza: Pieza) {
    console.log("🚀 ~ NavbarComponent ~ seleccionarPieza ~ arg0:", pieza)
    
    console.log('Pieza seleccionada:', pieza);
    this.cerrarDropdown(); // Cierra el dropdown después de seleccionar una pieza
    this.piezasSeleccionadasService.setUltimaPieza(pieza);

    this.router.navigate(['/consultar-pieza', pieza.IDPieza]);
  }
    
}