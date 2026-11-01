
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ImportantDate {
  dateID: number;
  universityID: number;
  title: string;
  description: string | null;
  date: string;
  dateType: string | null;
  url: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ImportantDatesService {

  private apiUrl = 'https://thutodata-api-bmghhyhabag6f7an.centralindia-01.azurewebsites.net/api';

  constructor(private http: HttpClient) {}

  getImportantDates(): Observable<ImportantDate[]> {
    return this.http.get<ImportantDate[]>(
      `${this.apiUrl}/ImportantDates`
    );
  }

}
