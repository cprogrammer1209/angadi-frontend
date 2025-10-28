import { Injectable } from '@angular/core';
import { AuthConfig } from '../config/auth.config';

declare global {
  interface Window {
    google: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSigninService {
  private isGoogleLoaded = false;
  private readonly CLIENT_ID = AuthConfig.googleClientId;

  constructor() {
    this.loadGoogleScript();
  }

  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isGoogleLoaded) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        this.isGoogleLoaded = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Google Sign-In script'));
      };

      document.head.appendChild(script);
    });
  }

  async initializeGoogleSignIn(): Promise<void> {
    await this.loadGoogleScript();
    
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: this.CLIENT_ID,
        callback: () => {}, // Will be set by individual components
        auto_select: false,
        cancel_on_tap_outside: true
      });
    }
  }

  renderSignInButton(element: HTMLElement, callback: (response: any) => void): void {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: this.CLIENT_ID,
        callback: callback
      });

      window.google.accounts.id.renderButton(element, {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: 'signin_with',
        shape: 'rectangular'
      });
    }
  }

  signOut(): Promise<void> {
    return new Promise((resolve) => {
      if (window.google) {
        window.google.accounts.id.disableAutoSelect();
      }
      resolve();
    });
  }
}