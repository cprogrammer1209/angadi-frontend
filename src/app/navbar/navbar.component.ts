import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  cartCount = 0;
  userName = 'Yuvaraj Angadi'; // Default fallback name

  constructor(private http: HttpClient,private cdRef: ChangeDetectorRef,) { }

  ngOnInit() {
    this.fetchUserName();
  }

 

  private fetchUserName() {
    this.http.get<any>('https://api.cprogrammer1209.shop/user/test')
      .subscribe({
        next: (response) => {
          // Assuming the API returns an object with a name property
          // Adjust this based on the actual API response structure
          console.log('API response:', response);
          if (response && response.name) {
            this.userName = response.name;
          }
          console.log('Fetched user name from API:', this.userName);

          this.cdRef.detectChanges();
        },
        error: (error) => {
          console.log('API not available, using fallback name:', this.userName);
          // userName already set to fallback value
        }
      });

    // this.userName = "Vendadi"
  }
}