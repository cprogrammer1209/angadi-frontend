import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'];
  selectedCategory = 'All';
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    
    // Subscribe to authentication status
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });
  }

  loadProducts() {
    this.products = [
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        originalPrice: 99.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        rating: 4.5,
        reviews: 1250,
        category: 'Electronics',
        inStock: true
      },
      {
        id: 2,
        name: 'Premium Cotton T-Shirt',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        rating: 4.2,
        reviews: 890,
        category: 'Clothing',
        inStock: true
      },
      {
        id: 3,
        name: 'JavaScript: The Complete Guide',
        price: 39.99,
        originalPrice: 49.99,
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop',
        rating: 4.8,
        reviews: 2100,
        category: 'Books',
        inStock: true
      },
      {
        id: 4,
        name: 'Smart Fitness Watch',
        price: 199.99,
        originalPrice: 249.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
        rating: 4.3,
        reviews: 756,
        category: 'Electronics',
        inStock: false
      },
      {
        id: 5,
        name: 'Ceramic Plant Pot Set',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop',
        rating: 4.6,
        reviews: 432,
        category: 'Home & Garden',
        inStock: true
      },
      {
        id: 6,
        name: 'Professional Tennis Racket',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop',
        rating: 4.4,
        reviews: 298,
        category: 'Sports',
        inStock: true
      }
    ];
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  getFilteredProducts() {
    if (this.selectedCategory === 'All') {
      return this.products;
    }
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }

  addToCart(product: Product) {
    if (!this.isAuthenticated) {
      // Prompt user to login
      if (confirm(`Please sign in to add "${product.name}" to your cart. Would you like to sign in now?`)) {
        this.router.navigate(['/login']);
      }
      return;
    }
    
    console.log('Added to cart:', product.name);
    // TODO: Implement actual cart functionality for authenticated users
    alert(`"${product.name}" has been added to your cart!`);
  }

  buyNow(product: Product) {
    if (!this.isAuthenticated) {
      if (confirm(`Please sign in to purchase "${product.name}". Would you like to sign in now?`)) {
        this.router.navigate(['/login']);
      }
      return;
    }
    
    console.log('Buy now:', product.name);
    // TODO: Implement checkout functionality
    alert(`Proceeding to checkout for "${product.name}"`);
  }

  addToWishlist(product: Product) {
    if (!this.isAuthenticated) {
      if (confirm(`Please sign in to add "${product.name}" to your wishlist. Would you like to sign in now?`)) {
        this.router.navigate(['/login']);
      }
      return;
    }
    
    console.log('Added to wishlist:', product.name);
    // TODO: Implement wishlist functionality
    alert(`"${product.name}" has been added to your wishlist!`);
  }
}