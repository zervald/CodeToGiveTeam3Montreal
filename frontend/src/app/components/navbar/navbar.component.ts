// File: frontend/src/app/components/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  isMenuOpen = false;
  isLoginModalOpen = false;
  isSignupModalOpen = false;

  // Login form data
  loginEmail = '';
  loginPassword = '';

  // Signup form data
  signupName = '';
  signupEmail = '';
  signupPassword = '';
  signupConfirmPassword = '';

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  navigateToDonate(): void {
    this.closeMenu();
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
    // Logique de connexion ici (pour l'instant juste un console.log)
    console.log('Login attempt:', { email: this.loginEmail, password: this.loginPassword });
    // Fermer le modal après la connexion
    this.closeLoginModal();
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
  }

  handleSignup(): void {
    // Logique de création de compte ici (pour l'instant juste un console.log)
    console.log('Signup attempt:', { 
      name: this.signupName, 
      email: this.signupEmail, 
      password: this.signupPassword 
    });
    // Fermer le modal après l'inscription
    this.closeSignupModal();
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
}
