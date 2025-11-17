// File: frontend/src/app/components/navbar/navbar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isLoggedIn = false;
  userName = '';
  userEmail = '';
  isLoginModalOpen = false;
  isSignupModalOpen = false;

  private authSubscription?: Subscription;
  private userSubscription?: Subscription;

  // Login form data
  loginEmail = '';
  loginPassword = '';

  // Signup form data
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  signupConfirmPassword = '';
  signupPhone = '';
  signupAddress = '';
  signupCity = '';
  signupPostalCode = '';
  signupCountry = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to auth state changes
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      }
    );

    // Subscribe to current user changes
    this.userSubscription = this.authService.currentUser$.subscribe(
      user => {
        if (user) {
          this.userName = user.name;
          this.userEmail = user.email;
        } else {
          this.userName = '';
          this.userEmail = '';
        }
      }
    );

    // Listen for custom events from donation form
    window.addEventListener('openLoginModal', this.handleOpenLoginEvent);
    window.addEventListener('openSignupModal', this.handleOpenSignupEvent);
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    this.authSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();

    // Clean up event listeners
    window.removeEventListener('openLoginModal', this.handleOpenLoginEvent);
    window.removeEventListener('openSignupModal', this.handleOpenSignupEvent);
  }

  // Event handlers for custom events
  private handleOpenLoginEvent = (): void => {
    this.openLoginModal();
  }

  private handleOpenSignupEvent = (): void => {
    this.openSignupModal();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // Donate modal state
  isDonateModalOpen = false;

  navigateToDonate(): void {
    this.closeMenu();

    if (!this.isLoggedIn) {
      // Show donate modal asking for account
      this.isDonateModalOpen = true;
    } else {
      // Go directly to donate page
      this.router.navigate(['/donate']);
    }
  }

  closeDonateModal(): void {
    this.isDonateModalOpen = false;
  }

  // From donate modal -> open login modal
  signInFromDonate(): void {
    this.closeDonateModal();
    this.openLoginModal();
  }

  // From donate modal -> open signup modal
  signUpFromDonate(): void {
    this.closeDonateModal();
    this.openSignupModal();
  }

  // Continue as guest
  continueAsGuest(): void {
    this.closeDonateModal();
    this.router.navigate(['/donate']);
  }

  // Login modal methods
  openLoginModal(): void {
    this.isLoginModalOpen = true;
    this.closeMenu();
  }

  closeLoginModal(): void {
    this.isLoginModalOpen = false;
    this.resetLoginForm();
  }

  resetLoginForm(): void {
    this.loginEmail = '';
    this.loginPassword = '';
  }

  handleLogin(): void {
    console.log('Login attempt:', { email: this.loginEmail, password: this.loginPassword });

    // Use AuthService to handle login
    this.authService.login(this.loginEmail, this.loginPassword);

    this.closeLoginModal();

    // Check if there's a return URL in sessionStorage
    const returnUrl = sessionStorage.getItem('returnUrl');
    if (returnUrl) {
      sessionStorage.removeItem('returnUrl');
      this.router.navigate([returnUrl]);
    }
  }

  // Signup modal methods
  openSignupModal(): void {
    this.isSignupModalOpen = true;
    this.closeMenu();
  }

  closeSignupModal(): void {
    this.isSignupModalOpen = false;
    this.resetSignupForm();
  }

  resetSignupForm(): void {
    this.signupName = '';
    this.signupEmail = '';
    this.signupPassword = '';
    this.signupConfirmPassword = '';
    this.signupPhone = '';
    this.signupAddress = '';
    this.signupCity = '';
    this.signupPostalCode = '';
    this.signupCountry = '';
  }

  handleSignup(): void {
    console.log('Signup attempt:', {
      name: this.signupName,
      email: this.signupEmail,
      password: this.signupPassword,
      phone: this.signupPhone,
      address: this.signupAddress,
      city: this.signupCity,
      postalCode: this.signupPostalCode,
      country: this.signupCountry
    });

    // Use AuthService to handle signup
    this.authService.signup(
      this.signupName,
      this.signupEmail,
      this.signupPassword,
      {
        phone: this.signupPhone,
        address: this.signupAddress,
        city: this.signupCity,
        postalCode: this.signupPostalCode,
        country: this.signupCountry
      }
    );

    this.closeSignupModal();

    // Check if there's a return URL in sessionStorage
    const returnUrl = sessionStorage.getItem('returnUrl');
    if (returnUrl) {
      sessionStorage.removeItem('returnUrl');
      this.router.navigate([returnUrl]);
    }
  }

  // Switch between modals
  switchToSignup(): void {
    this.closeLoginModal();
    this.openSignupModal();
  }

  switchToLogin(): void {
    this.closeSignupModal();
    this.openLoginModal();
  }

  // Logout method
  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
