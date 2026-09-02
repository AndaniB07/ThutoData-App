import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedService {

  private readonly universitiesUrl =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/PinnedUniversities';

  private readonly coursesUrl =
    'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api/PinnedCourses';


  constructor(
    private http: HttpClient
  ) {}


  // =========================================
  // AUTHORIZATION HEADER
  // =========================================

  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('thutodata-token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

  }


  // =========================================
  // SAVED UNIVERSITIES
  // =========================================

  getSavedUniversities(): Observable<any[]> {

    return this.http.get<any[]>(
      this.universitiesUrl,
      {
        headers: this.getHeaders()
      }
    );

  }


  // =========================================
  // SAVE UNIVERSITY
  // =========================================

  saveUniversity(
    universityId: number
  ): Observable<any> {

    return this.http.post(
      `${this.universitiesUrl}/${universityId}`,
      {},
      {
        headers: this.getHeaders()
      }
    );

  }


  // =========================================
  // REMOVE UNIVERSITY
  // =========================================

  removeUniversity(
    universityId: number
  ): Observable<any> {

    return this.http.delete(
      `${this.universitiesUrl}/${universityId}`,
      {
        headers: this.getHeaders()
      }
    );

  }


  // =========================================
  // SAVED COURSES
  // =========================================

  getSavedCourses(): Observable<any[]> {

    return this.http.get<any[]>(
      this.coursesUrl,
      {
        headers: this.getHeaders()
      }
    );

  }


  // =========================================
  // SAVE COURSE
  // =========================================

  saveCourse(
    courseId: number
  ): Observable<any> {

    return this.http.post(
      `${this.coursesUrl}/${courseId}`,
      {},
      {
        headers: this.getHeaders()
      }
    );

  }


  // =========================================
  // REMOVE COURSE
  // =========================================

  removeCourse(
    courseId: number
  ): Observable<any> {

    return this.http.delete(
      `${this.coursesUrl}/${courseId}`,
      {
        headers: this.getHeaders()
      }
    );

  }

}