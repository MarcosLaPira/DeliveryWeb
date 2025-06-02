import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterOutlet,RouterLinkActive],
  templateUrl: './navbar.component.html',
  standalone:true,

})
export class NavbarComponent {

}
