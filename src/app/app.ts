import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'ShopHub - Your Online Marketplace';

  constructor(public router: Router) {}

  shouldShowNavbar(): boolean {
    // Always show navbar except on login page
    return this.router.url !== '/login';
  }
}
