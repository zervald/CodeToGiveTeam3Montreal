// File: frontend/src/app/services/auth.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  email: string;
  name: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;
  private isLoggedInSubject: BehaviorSubject<boolean>;
  private currentUserSubject: BehaviorSubject<User | null>;

  public isLoggedIn$: Observable<boolean>;
  public currentUser$: Observable<User | null>;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    // Check if we're in the browser
    this.isBrowser = isPlatformBrowser(platformId);

    // Initialize subjects with safe values
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());

    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
    this.currentUser$ = this.currentUserSubject.asObservable();

    // Check initial auth state from localStorage (only in browser)
    if (this.isBrowser) {
      this.checkAuthState();
    }
  }

  private hasToken(): boolean {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('authToken');
  }

  private getStoredUser(): User | null {
    if (!this.isBrowser) return null;

    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');

    if (token && email) {
      return { token, email, name: name || '' };
    }
    return null;
  }

  private checkAuthState(): void {
    if (!this.isBrowser) return;

    const hasToken = this.hasToken();
    const user = this.getStoredUser();

    this.isLoggedInSubject.next(hasToken);
    this.currentUserSubject.next(user);
  }

  // Get current values synchronously
  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Login method
  login(email: string, password: string, name?: string): void {
    if (!this.isBrowser) return;

    // Simulate successful login
    const token = 'demo-token-' + Date.now();
    const userName = name || email.split('@')[0];

    // Store in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', userName);

    // Update subjects
    const user: User = { token, email, name: userName };
    this.isLoggedInSubject.next(true);
    this.currentUserSubject.next(user);

    console.log('User logged in:', user);
  }

  // Signup method
  signup(name: string, email: string, password: string, additionalData?: any): void {
    if (!this.isBrowser) return;

    // Simulate successful signup
    const token = 'demo-token-' + Date.now();

    // Store in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);

    // Update subjects
    const user: User = { token, email, name };
    this.isLoggedInSubject.next(true);
    this.currentUserSubject.next(user);

    console.log('User signed up:', user);
  }

  // Logout method
  logout(): void {
    if (!this.isBrowser) return;

    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');

    // Update subjects
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);

    console.log('User logged out');
  }

  // Refresh auth state (useful after page reload)
  refreshAuthState(): void {
    if (!this.isBrowser) return;
    this.checkAuthState();
  }
}
