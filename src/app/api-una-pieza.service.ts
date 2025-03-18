import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiUnaPiezaService {

  apiUrl = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient) { }

  getCsrfToken(): Observable<any> {
    return this.http.get(this.apiUrl + 'csrf-token', { withCredentials: true });
  }

  saveCharacter(characterData: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap((response: any) => {
        console.log(response.csrf_token);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': response.csrf_token 
        });

        return this.http.post(this.apiUrl + "save", characterData, { headers, withCredentials: true });  
      })
    );
  }

}
