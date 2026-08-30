import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonIcon } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonIcon,
    RouterLink
  ],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {

  email = '';
  password = '';

  showPassword = false;

  login(): void {

    if (!this.email || !this.password) {
      alert('Please enter your email and password.');
      return;
    }

    /*
     * TEMPORARY LOGIN
     *
     * The real authentication will be connected
     * to our API once the backend is completed.
     */

    console.log('Login attempted:', {
      email: this.email
    });

    alert(
      'Login system is not connected yet. ' +
      'This will be connected to the ThutoData API.'
    );
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

}