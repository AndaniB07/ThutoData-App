import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  grade?: number | null;
}

interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  userID: number;
  name: string;
  email: string;
  grade: number | null;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private readonly apiUrl =
    'https://localhost:7105/api/Auth';

  private readonly tokenKey =
    'thutodata-token';

  private readonly userKey =
    'thutodata-user';


  constructor(
    private http: HttpClient
  ) {}


  // =========================================
  // REGISTER
  // =========================================

  register(
    name: string,
    email: string,
    password: string,
    grade?: number | null
  ): Observable<any> {

    const request: RegisterRequest = {

      name: name.trim(),

      email:
        email.trim().toLowerCase(),

      password: password,

      grade: grade ?? null

    };


    return this.http.post(
      `${this.apiUrl}/register`,
      request
    );

  }


  // =========================================
  // LOGIN
  // =========================================

  login(
    email: string,
    password: string
  ): Observable<AuthResponse> {

    const request: LoginRequest = {

      email:
        email.trim().toLowerCase(),

      password: password

    };


    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}/login`,
        request
      )
      .pipe(

        tap(response => {

          console.log(
            'Login successful:',
            response.user
          );


          // Save JWT token first

          localStorage.setItem(
            this.tokenKey,
            response.token
          );


          // Save user information

          localStorage.setItem(
            this.userKey,
            JSON.stringify(response.user)
          );


          console.log(
            'User saved to localStorage'
          );

        })

      );

  }


  // =========================================
  // LOGOUT
  // =========================================

  logout(): void {

    localStorage.removeItem(
      this.tokenKey
    );

    localStorage.removeItem(
      this.userKey
    );

  }


  // =========================================
  // CHECK LOGIN
  // =========================================

  isLoggedIn(): boolean {

    const token =
      localStorage.getItem(
        this.tokenKey
      );

    const user =
      localStorage.getItem(
        this.userKey
      );


    return !!token && !!user;

  }


  // =========================================
  // GET TOKEN
  // =========================================

  getToken(): string | null {

    return localStorage.getItem(
      this.tokenKey
    );

  }


  // =========================================
  // GET USER
  // =========================================

  getUser(): User | null {

    const user =
      localStorage.getItem(
        this.userKey
      );


    if (!user) {

      return null;

    }


    try {

      return JSON.parse(user) as User;

    } catch {

      console.error(
        'Could not read saved user.'
      );

      return null;

    }

  }

}