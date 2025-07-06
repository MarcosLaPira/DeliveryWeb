import { Component, signal, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DeliveryApiService } from '../../../core/services/delivery-api.service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pieza } from '../../../core/interfaces/modelos/Pieza';
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterOutlet,RouterLinkActive,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  standalone: true,
})
export class NavbarComponent {
  
  dni = signal<string>(''); //
  piezas = signal<Pieza[] | null>(null); //
  dropdownAbierto = signal<boolean>(false); // Controla la visibilidad del dropdown
  
  constructor(
    private router: Router, 
    private deliveryApiService: DeliveryApiService,
    private piezasSeleccionadasService: PiezasSeleccionadasService
  ) 
  {}

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