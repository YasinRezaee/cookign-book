import { Injectable, model } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://my-webapp-c6d93-default-rtdb.firebaseio.com';
  

  private httpOptions = {
    headers: new HttpHeaders({ 'print': 'pretty' })
  };

  constructor(private http: HttpClient) {}

  // Read
  get(data:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${data}.json`)
      .pipe(catchError(this.handleError));
  }
  // Create
  post(data:any, model:any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${data}.json`, model, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Update
  put(endpoint: string, id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${endpoint}/${id}.json`, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // Delete
  delete(id: any, data: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${data}/${id}.json`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw new Error('Something went wrong; please try again later.');
  }
}
