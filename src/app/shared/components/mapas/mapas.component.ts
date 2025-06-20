import { AfterViewInit, Component, signal, Signal,} from '@angular/core';
import { Pieza } from '../../../core/interfaces/modelos/Pieza';
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';
import { DeliveryApiService } from '../../../core/services/delivery-api.service.service';
import { Sucursal } from '../../../core/interfaces/modelos/Sucursal';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css'],
})
export class MapasComponent implements AfterViewInit {
  // 50 sucursales simuladas a lo largo y ancho de Argentina
  
  sucursales = signal<Sucursal[]>([]);

  sucursalesAndreani = [
    { nombre: 'Andreani CABA', lat: -27.7891, lng: -65.4117 },
    { nombre: 'Andreani Lomas de Zamora', lat: -34.7600, lng: -58.4000 },
    { nombre: 'Andreani Quilmes', lat: -34.7200, lng: -58.2700 },
    { nombre: 'Andreani Avellaneda', lat: -34.6600, lng: -58.3700 },
    { nombre: 'Andreani Lanús', lat: -34.7000, lng: -58.4000 },
    { nombre: 'Andreani Berazategui', lat: -34.7700, lng: -58.2100 },
    { nombre: 'Andreani San Justo', lat: -34.6900, lng: -58.5600 },
    { nombre: 'Andreani La Matanza', lat: -34.7500, lng: -58.5900 },
    { nombre: 'Andreani Morón', lat: -34.6500, lng: -58.6200 },
    { nombre: 'Andreani Merlo', lat: -34.6700, lng: -58.7300 },
    { nombre: 'Andreani Moreno', lat: -34.6300, lng: -58.7900 },
    { nombre: 'Andreani Ituzaingó', lat: -34.6500, lng: -58.6700 },
    { nombre: 'Andreani Tres de Febrero', lat: -34.6000, lng: -58.5600 },
    { nombre: 'Andreani Vicente López', lat: -34.5200, lng: -58.4900 },
    { nombre: 'Andreani San Fernando', lat: -34.4500, lng: -58.5600 },
    { nombre: 'Andreani Tigre', lat: -34.4200, lng: -58.5800 },
    { nombre: 'Andreani Pilar', lat: -34.4600, lng: -58.9000 },
    { nombre: 'Andreani San Isidro', lat: -34.4700, lng: -58.5100 },
    { nombre: 'Andreani Escobar', lat: -34.3500, lng: -58.7900 },
    { nombre: 'Andreani Florencio Varela', lat: -34.8000, lng: -58.2700 },
    { nombre: 'Andreani Ezeiza', lat: -34.8300, lng: -58.5200 },
    { nombre: 'Andreani San Martín', lat: -34.5500, lng: -58.5000 },
    { nombre: 'Andreani La Plata', lat: -25.2667, lng: -57.6483 },
    { nombre: 'Andreani Mar del Plata', lat: -31.9717, lng: -60.0281 },
    { nombre: 'Andreani Bahía Blanca', lat: -26.6004, lng: -60.2044 },
    { nombre: 'Andreani Rosario', lat: -28.7442, lng: -65.1183 },
    { nombre: 'Andreani Santa Fe', lat: -34.1234, lng: -61.5678 },
    { nombre: 'Andreani Córdoba', lat: -36.8478, lng: -60.9021 },
    { nombre: 'Andreani Villa María', lat: -30.4444, lng: -66.8888 },
    { nombre: 'Andreani Río Cuarto', lat: -26.1111, lng: -62.2222 },
    { nombre: 'Andreani Mendoza', lat: -32.3344, lng: -59.2233 },
    { nombre: 'Andreani San Rafael', lat: -35.9090, lng: -63.4567 },
    { nombre: 'Andreani San Juan', lat: -33.4567, lng: -67.9876 },
    { nombre: 'Andreani La Rioja', lat: -29.2222, lng: -63.3333 },
    { nombre: 'Andreani Catamarca', lat: -26.5555, lng: -64.1111 },
    { nombre: 'Andreani Salta', lat: -23.8888, lng: -64.9999 },
    { nombre: 'Andreani Jujuy', lat: -24.1234, lng: -66.4321 },
    { nombre: 'Andreani Tucumán', lat: -25.7654, lng: -65.8765 },
    { nombre: 'Andreani Santiago del Estero', lat: -27.3333, lng: -62.5555 },
    { nombre: 'Andreani Formosa', lat: -25.0000, lng: -58.0000 },
    { nombre: 'Andreani Resistencia', lat: -26.9876, lng: -59.4321 },
    { nombre: 'Andreani Corrientes', lat: -28.2222, lng: -57.1111 },
    { nombre: 'Andreani Posadas', lat: -27.0000, lng: -55.0000 },
    { nombre: 'Andreani Paraná', lat: -30.7777, lng: -61.1111 },
    { nombre: 'Andreani Concordia', lat: -31.0000, lng: -59.0000 },
    { nombre: 'Andreani San Luis', lat: -32.4321, lng: -66.1111 },
    { nombre: 'Andreani Neuquén', lat: -37.0000, lng: -68.0000 },
    { nombre: 'Andreani Bariloche', lat: -42.1234, lng: -70.5678 },
    { nombre: 'Andreani Ushuaia', lat: -54.3333, lng: -67.0000 },
    { nombre: 'Andreani Río Grande', lat: -53.1234, lng: -68.1111 },
    { nombre: 'Andreani Viedma', lat: -40.0000, lng: -63.9999 }
  ];

  
  

  piezas: Pieza[] = [];
  constructor(
  private piezasSeleccionadasService2: PiezasSeleccionadasService,
  private deliveryApiService: DeliveryApiService
) {
  this.piezas = this.piezasSeleccionadasService2.getPiezasMapas() || [];
  this.deliveryApiService.getCatalogoSucursales().subscribe((sucs: Sucursal[]) => {
    // Filtra solo las sucursales con latitud y longitud válidas
    const sucursalesValidas = (sucs || []).filter(s => {
      const lat = parseFloat(s.Latitud);
      const lng = parseFloat(s.Longitud);
      return !isNaN(lat) && !isNaN(lng);
    });
    this.sucursales.set(sucursalesValidas);
    this.removerMarcadores();
    this.agregarMarcadores();
  });
}

  mostrarSucursales = true;
  private mapa: any;
  private marcadores: any[] = [];

  mostrarSucursalesAndreani = true;
   
  private marcadoresAndreani: any[] = [];

  marcadoresPiezas:any[] = [];

  cargandoMapa = true;

   ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        this.mapa = L.map('map').setView([-38.4161, -63.6167], 4.5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(this.mapa);

        this.agregarMarcadores();
        this.agregarMarcadoresAndreani();
        this.agregarMarcadoresPiezas();
        this.cargandoMapa = false; // Oculta el indicador de carga
      });
    }
  }

  toggleSucursales() {
    this.mostrarSucursales = !this.mostrarSucursales;
    if (this.mostrarSucursales) {
      this.agregarMarcadores();
    } else {
      this.removerMarcadores();
    }
  }
/*
  private agregarMarcadores() {
    import('leaflet').then(L => {
      this.marcadores = this.sucursales.map(sucursal =>
        L.marker([sucursal.lat, sucursal.lng])
          .bindPopup(sucursal.nombre)
          .addTo(this.mapa)
          
      );
    });
  }
    */

  private agregarMarcadores() {
    import('leaflet').then(L => {
      const iconoAzul = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      this.marcadores = this.sucursales().map((sucursal: Sucursal) =>
        L.marker([parseFloat(sucursal.Latitud), parseFloat(sucursal.Longitud)], { icon: iconoAzul })
          .bindPopup(sucursal.descSuc || sucursal.descSuc)
          .addTo(this.mapa)
      );
    });
  }

  private removerMarcadores() {
    this.marcadores.forEach(marcador => {
      this.mapa.removeLayer(marcador);
    });
    this.marcadores = [];
  }
  


  
  toggleSucursalesAndreani() {
    this.mostrarSucursalesAndreani = !this.mostrarSucursalesAndreani;
    if (this.mostrarSucursalesAndreani) {
      this.agregarMarcadoresAndreani();
    } else {
      this.removerMarcadoresAndreani();
    }
  }

  private agregarMarcadoresAndreani() {
    import('leaflet').then(L => {
      // Definir un icono rojo personalizado para Andreani
      const iconoRojo = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      this.marcadoresAndreani = this.sucursalesAndreani.map(sucursal =>
        L.marker([sucursal.lat, sucursal.lng], { icon: iconoRojo })
          .bindPopup(sucursal.nombre)
          .addTo(this.mapa)
          
      );
    });
  }
  
private removerMarcadoresAndreani() {
  this.marcadoresAndreani.forEach(marcador => {
    this.mapa.removeLayer(marcador);
  });
  this.marcadoresAndreani = [];
}


// Lógica para mostrar piezas en el mapa
private agregarMarcadoresPiezas() {

  console.log('Piezas a mostrar:', this.piezas);
  import('leaflet').then(L => {
    // Para cambiar el color del marcador, cambia la URL de iconUrl
    // Ejemplo: azul, rojo, verde, naranja, amarillo, violeta, gris
    // https://github.com/pointhi/leaflet-color-markers

    const iconoPieza = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', // Cambia aquí el color
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    this.marcadoresPiezas = (this.piezas || []).map((pieza: Pieza) => {
      
      /*
      if (pieza.coordenadas) {
        const [lat, lng] = pieza.coordenadas.split(',').map(Number);
        return L.marker([lat, lng], { icon: iconoPieza })
          .bindPopup(`Pieza: ${pieza.IDPieza || ''}`)
          .addTo(this.mapa);
      }
          */
      

      return null;
    }).filter(Boolean);
  });
}

  private removerMarcadoresPiezas() {
    this.marcadoresPiezas.forEach(marcador => {
      this.mapa.removeLayer(marcador);
    });
    this.marcadoresPiezas = [];
  }

  // Si quieres exponer un método para actualizar piezas desde el padre:
  public mostrarPiezasEnMapa(piezas: Pieza[]) {

    this.removerMarcadoresPiezas();
    this.piezas = piezas || [];
    this.agregarMarcadoresPiezas();

  }
  
  
}