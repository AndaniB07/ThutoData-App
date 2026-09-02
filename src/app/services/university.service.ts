import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface University {
  universityID: number;
  universityName: string;
  abbreviation: string | null;
  description: string;
  province: string;
  city: string;
  institutionType: string;
  universityType: string;
  websiteURL: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  private apiUrl = 'https://localhost:7105/api';

  constructor(private http: HttpClient) {}

  getUniversities(): Observable<University[]> {
    return this.http.get<University[]>(
      `${this.apiUrl}/Universities`
    );
  }

  getUniversity(id: number): Observable<University> {
    return this.http.get<University>(
      `${this.apiUrl}/Universities/${id}`
    );
  }
}