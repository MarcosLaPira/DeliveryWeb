import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css'],
})
export class MapasComponent implements AfterViewInit {
  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      import('leaflet').then(L => {
        const mapa = L.map('map').setView([-34.6037, -58.3816], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(mapa);

        L.marker([-34.606095127806206, -58.37197558406531])

        .bindPopup('Casa Central')
        .addTo(mapa)


        .openPopup();
      });
    }
  }

}
//-34.606095127806206, -58.37197558406531
