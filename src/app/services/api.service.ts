import { Injectable, model } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Read
  get(data:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${data}`)
      .pipe(catchError(this.handleError));
  }
  // Create
  post(data:any, model:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${data}`, model, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Update
  put(endpoint: string, id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${endpoint}/${id}`, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Delete
  delete(id: any, data: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${data}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw new Error('Something went wrong; please try again later.');
  }
}
