import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductListComponent } from './product-list/product-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ProductListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'ShopHub - Your Online Marketplace';
}
