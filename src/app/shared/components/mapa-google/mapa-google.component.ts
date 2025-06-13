import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa-google',
  templateUrl: './mapa-google.component.html',
  styleUrl: './mapa-google.component.css',
  standalone: true
})
export class MapaGoogleComponent implements OnInit {
  @Input() lat: number = -34.6037; // valor por defecto: Buenos Aires
  @Input() lng: number = -58.3816;
  @Input() zoom: number = 14;
  mapId = 'google-map-' + Math.random().toString(36).substring(2, 10);

  ngOnInit() {
    // Carga el script de Google Maps solo si no está presente
    if (!(window as any).google) {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=TU_API_KEY'; // Reemplaza TU_API_KEY
      script.async = true;
      script.defer = true;
      script.onload = () => this.initMap();
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  }

  initMap() {
    const map = new (window as any).google.maps.Map(document.getElementById(this.mapId), {
      center: { lat: this.lat, lng: this.lng },
      zoom: this.zoom,
    });
    new (window as any).google.maps.Marker({
      position: { lat: this.lat, lng: this.lng },
      map,
    });
  }
}
