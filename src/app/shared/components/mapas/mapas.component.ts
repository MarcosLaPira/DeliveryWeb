import { AfterViewInit, Component, Signal,} from '@angular/core';
import { Pieza } from '../../../core/interfaces/modelos/Pieza';
import { PiezasSeleccionadasService } from '../../../core/services/piezas-seleccionadas.service';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css'],
})
export class MapasComponent implements AfterViewInit {
  // 50 sucursales simuladas a lo largo y ancho de Argentina
  sucursales = [
    { nombre: 'Casa Central', lat: -34.6037, lng: -58.3816 }, // CABA
    { nombre: 'Sucursal La Plata', lat: -34.9214, lng: -57.9544 },
    { nombre: 'Sucursal Mar del Plata', lat: -38.0055, lng: -57.5426 },
    { nombre: 'Sucursal Bahía Blanca', lat: -38.7196, lng: -62.2724 },
    { nombre: 'Sucursal Rosario', lat: -32.9442, lng: -60.6505 },
    { nombre: 'Sucursal Santa Fe', lat: -31.6333, lng: -60.7000 },
    { nombre: 'Sucursal Córdoba', lat: -31.4167, lng: -64.1833 },
    { nombre: 'Sucursal Villa María', lat: -32.4075, lng: -63.2406 },
    { nombre: 'Sucursal Río Cuarto', lat: -33.1307, lng: -64.3499 },
    { nombre: 'Sucursal Mendoza', lat: -32.8908, lng: -68.8272 },
    { nombre: 'Sucursal San Rafael', lat: -34.6177, lng: -68.3301 },
    { nombre: 'Sucursal San Juan', lat: -31.5375, lng: -68.5364 },
    { nombre: 'Sucursal La Rioja', lat: -29.4131, lng: -66.8558 },
    { nombre: 'Sucursal Catamarca', lat: -28.4696, lng: -65.7852 },
    { nombre: 'Sucursal Salta', lat: -24.7829, lng: -65.4232 },
    { nombre: 'Sucursal Jujuy', lat: -24.1858, lng: -65.2995 },
    { nombre: 'Sucursal Tucumán', lat: -26.8083, lng: -65.2176 },
    { nombre: 'Sucursal Santiago del Estero', lat: -27.7951, lng: -64.2615 },
    { nombre: 'Sucursal Formosa', lat: -26.1775, lng: -58.1781 },
    { nombre: 'Sucursal Resistencia', lat: -27.4514, lng: -58.9867 },
    { nombre: 'Sucursal Corrientes', lat: -27.4691, lng: -58.8306 },
    { nombre: 'Sucursal Posadas', lat: -27.3621, lng: -55.9009 },
    { nombre: 'Sucursal Oberá', lat: -27.4871, lng: -55.1199 },
    { nombre: 'Sucursal Iguazú', lat: -25.5991, lng: -54.5736 },
    { nombre: 'Sucursal Paraná', lat: -31.7319, lng: -60.5238 },
    { nombre: 'Sucursal Concordia', lat: -31.3929, lng: -58.0170 },
    { nombre: 'Sucursal Gualeguaychú', lat: -33.0096, lng: -58.5172 },
    { nombre: 'Sucursal San Luis', lat: -33.2950, lng: -66.3356 },
    { nombre: 'Sucursal Villa Mercedes', lat: -33.6757, lng: -65.4671 },
    { nombre: 'Sucursal Neuquén', lat: -38.9516, lng: -68.0591 },
    { nombre: 'Sucursal Cipolletti', lat: -38.9382, lng: -67.9907 },
    { nombre: 'Sucursal General Roca', lat: -39.0294, lng: -67.5831 },
    { nombre: 'Sucursal Bariloche', lat: -41.1335, lng: -71.3103 },
    { nombre: 'Sucursal Viedma', lat: -40.8135, lng: -63.0036 },
    { nombre: 'Sucursal Rawson', lat: -43.3002, lng: -65.1023 },
    { nombre: 'Sucursal Trelew', lat: -43.2532, lng: -65.3090 },
    { nombre: 'Sucursal Comodoro Rivadavia', lat: -45.8647, lng: -67.4822 },
    { nombre: 'Sucursal Puerto Madryn', lat: -42.7692, lng: -65.0385 },
    { nombre: 'Sucursal Río Gallegos', lat: -51.6230, lng: -69.2168 },
    { nombre: 'Sucursal Ushuaia', lat: -54.8019, lng: -68.3029 },
    { nombre: 'Sucursal Río Grande', lat: -53.7877, lng: -67.7095 },
    { nombre: 'Sucursal San Nicolás', lat: -33.3342, lng: -60.2141 },
    { nombre: 'Sucursal Pergamino', lat: -33.8941, lng: -60.5736 },
    { nombre: 'Sucursal Tandil', lat: -37.3217, lng: -59.1332 },
    { nombre: 'Sucursal Azul', lat: -36.7770, lng: -59.8582 },
    { nombre: 'Sucursal Junín', lat: -34.5833, lng: -60.9500 },
    { nombre: 'Sucursal San Martín', lat: -34.5782, lng: -58.5347 },
    { nombre: 'Sucursal Lomas de Zamora', lat: -34.7609, lng: -58.3986 },
    { nombre: 'Sucursal Quilmes', lat: -34.7201, lng: -58.2546 }
  ];
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

  constructor(private piezasSeleccionadasService2: PiezasSeleccionadasService) {
    this.piezas = this.piezasSeleccionadasService2.getPiezasMapas() || [];
    console.log('Piezas cantidad:', this.piezas.length);
    console.log('Piezas en el mapa:', this.piezas);
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
      // Definir un icono rojo personalizado para Andreani
      const iconoRojo = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      this.marcadores = this.sucursales.map(sucursal =>
        L.marker([sucursal.lat, sucursal.lng], { icon: iconoRojo })
          .bindPopup(sucursal.nombre)
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